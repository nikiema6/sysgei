import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store, select } from '@ngrx/store';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {State, Status} from 'src/app/config//store/reducers';
import { Acquisition, DetailMouvement, Equipement, Mouvement } from 'src/app/config/app.models';
import { DeleteAcquisition, FetchAcquisitionList, FetchDetailMouvementList, FetchMouvementList } from 'src/app/config/store/action';
import { selecteAcquisitionList, selecteDetailMouvementList, selecteMouvementList } from 'src/app/config/store/selector';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-detail-mouvement',
  templateUrl: './detail-mouvement.component.html',
  styleUrls: ['./detail-mouvement.component.scss']
})
export class DetailMouvementComponent implements OnInit, OnDestroy{
destroy$: Subject<boolean> = new Subject<boolean>();
statusObj$: Observable<Status>;
  acquisitionList: Acquisition[] = [];
  mouvementList: Mouvement[] = [];
  detailMouvementList: DetailMouvement[] = [];
  selectedAcquisition: Acquisition;
  selectedMouvement: Mouvement;
  equipements: Equipement[] = [];
  searchType: string = 'acquisition';
  ddMouvement: SelectItem[] = [];
  ddAcquisition: SelectItem[] = [];

  constructor(protected store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(FetchAcquisitionList());
    this.store.dispatch(FetchMouvementList());
    this.store.dispatch(FetchDetailMouvementList());

    this.store.select(selecteAcquisitionList).pipe(takeUntil(this.destroy$))
      .subscribe((acquisitionList: Acquisition[]) => {
        this.ddAcquisition = [];
        if (acquisitionList) {
          acquisitionList.forEach(a => {
            this.ddAcquisition.push({ value: a.id, label: a.libelle });
            this.acquisitionList.push({ ...a });
          });
        }
      });

    this.store.select(selecteMouvementList).pipe(takeUntil(this.destroy$))
      .subscribe((mouvementList: Mouvement[]) => {
        this.ddMouvement = [];
        if (mouvementList) {
          mouvementList.forEach(m => {
            this.ddMouvement.push({ value: m.id, label: m.libelle });
            this.mouvementList.push({ ...m });
          });
        }
      });

    this.store.select(selecteDetailMouvementList).subscribe((detailMouvementList: DetailMouvement[]) => {
      this.detailMouvementList = detailMouvementList;
    });
  }

  onSelectAcquisition(acquisition: Acquisition) {
    this.selectedAcquisition = acquisition;
  }

  onSelectMouvement(mouvement: Mouvement) {
    this.selectedMouvement = mouvement;
  }

  searchEquipments() {
    if (this.selectedAcquisition && this.selectedMouvement) {
      // Logique pour récupérer les équipements associés à l'acquisition et au mouvement
      // Remplacez par votre logique de recherche réelle
      this.equipements = this.selectedAcquisition.equipements;
    }
  }

  onSend() {
    if (this.selectedAcquisition) {
      // Logique pour envoyer l'ID d'acquisition à la base de données
      console.log('Envoi de l\'ID d\'acquisition :', this.selectedAcquisition.id);

      // Supprimer l'acquisition de la liste des acquisitions disponibles
      this.acquisitionList = this.acquisitionList.filter(acquisition => acquisition.id !== this.selectedAcquisition.id);

      // Réinitialiser les variables
      this.selectedAcquisition = null;
      this.equipements = [];
    } else if (this.selectedMouvement) {
      // Logique pour envoyer l'ID de mouvement à la base de données
      console.log('Envoi de l\'ID de mouvement :', this.selectedMouvement.id);

      // Supprimer le mouvement de la liste des mouvements disponibles
      this.mouvementList = this.mouvementList.filter(mouvement => mouvement.id !== this.selectedMouvement.id);

      // Réinitialiser les variables
      this.selectedMouvement = null;
    } else {
      alert('Veuillez sélectionner une acquisition ou un mouvement avant d\'envoyer.');
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
}
}