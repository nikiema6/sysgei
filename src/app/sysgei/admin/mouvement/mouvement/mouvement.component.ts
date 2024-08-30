import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DropdownSelector, Mouvement, FormGroupColumn, TableColumn } from 'src/app/config/app.models';
import { StatusEnum, messageShow } from 'src/app/config/gloabal-message.config';
import { CreateMouvement, DeleteMouvement, FetchMouvement, FetchStructure, UpdateMouvement } from 'src/app/config/store/action';
import { State, Status } from 'src/app/config/store/reducers';
import * as appSelector  from 'src/app/config/store/selector';
import { selecteMouvementList, selecteStatut } from 'src/app/config/store/selector';



@Component({
  selector: 'app-mouvement',
  templateUrl: './mouvement.component.html',
  styleUrls: ['./mouvement.component.scss']
})
export class MouvementComponent implements OnInit, OnDestroy {

  loading: boolean;
  listeMouvement: Mouvement[];
  isUpdating: boolean;
  isDeleting: boolean;

  destroy$: Subject<boolean> = new Subject<boolean>();
  statusObj$: Observable<Status>;

  closeDialog = false;
  formGroup: UntypedFormGroup;
  tableCols: TableColumn[];
  formCols: FormGroupColumn[];
  pageLabel = 'Liste des mouvements';
  formHeader = 'Création et mise à jour d\'un mouvement';
  dropDownList: DropdownSelector[] = [];
  typeMouvementOptions: SelectItem[] = [];

  constructor(private store: Store<State>,
    protected fb: UntypedFormBuilder,
    private messageService: MessageService) {
    this.formCols = [
      { field: 'structureId', header: 'Structure', type: 'dropdown', visible: true, required: false },
      { field: 'id', header: 'Id', type: 'number', visible: false, required: false },
      { field: 'typeMouvement', header: 'Type de mouvement', type: 'dropdown', visible: true, required: true },
      { field: 'motif', header: 'Motif', type: 'string', visible: true, required: true },

    ];

    this.tableCols = [
      { field: 'typeMouvement', header: 'Type de mouvement', type: 'string', filter: true, width: '20%' },
      { field: 'motif', header: 'Motif', type: 'string', filter: true, width: '50%' },
    ];

    this.formGroup = this.fb.group({
      id: [''],
      structureId: ['',],
      typeMouvement: ['', Validators.compose([Validators.required])],
      motif: ['', Validators.compose([Validators.required])],
    });

    // construction des dropdown
    this.dropDownList = [
      {
        action: FetchStructure(),
        selector: appSelector.selecteStructureList,
        key: 'id',
        field: 'structureId',
        optionLabel: 'libelle',
      }
    ];
  }

  ngOnInit(): void {
    this.typeMouvementOptions = [
      { label: 'Affectation', value: 'AFFECTATION' },
      { label: 'Déclassement', value: 'DECLASSEMENT' }
    ];
    this.store.dispatch(FetchStructure());
    this.store.dispatch(FetchMouvement()); // Dispatch de l'action pour récupérer les mouvements
    this.statusObj$ = this.store.pipe(select(appSelector.selecteStatut));
    this.store.pipe(select(appSelector.selecteMouvementList)).pipe(takeUntil(this.destroy$))
      .subscribe((mouvementList: Mouvement[]) => {
        this.listeMouvement = [];
        if (mouvementList) {
          mouvementList.forEach(m => this.listeMouvement.push({ ...m }));
          this.loading = true;
        }
        this.loading = true;
      });
    this.checkStatus();
  }

  loadAll(): void {
    this.loading = false;
    this.store.dispatch(FetchMouvement());
  }

  checkStatus() {
    this.statusObj$.pipe(takeUntil(this.destroy$))
      .subscribe(statusObj => {
        if (statusObj) {
          messageShow(statusObj.status, null, statusObj.message, this.messageService);
          if (statusObj.status === StatusEnum.success) {
            if (this.isUpdating) {
              this.closeDialog = true;
              this.isUpdating = false;
            }
            if (this.isDeleting) {
              this.isDeleting = false;
            }
          }
        }
      });
  }

  onSave(data: Mouvement) {
    this.isUpdating = true;
    if (data.id !== null) {
      this.store.dispatch(UpdateMouvement({ obj: data }));
    } else {
      this.store.dispatch(CreateMouvement({ obj: data }));
    }
  }

  onDelete(data: Mouvement) {
    this.isDeleting = true;
    this.store.dispatch(DeleteMouvement({ obj: data }));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}