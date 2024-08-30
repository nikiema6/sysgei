import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Caracteristique, FormGroupColumn, TableColumn } from 'src/app/config/app.models';
import { StatusEnum, messageShow } from 'src/app/config/gloabal-message.config';
import { CreateCaracteristique, DeleteCaracteristique, FetchCaracteristique, UpdateCaracteristique } from 'src/app/config/store/action';
import { State, Status } from 'src/app/config/store/reducers';
import { selecteCaracteristiqueList, selecteStatut } from 'src/app/config/store/selector';

@Component({
  selector: 'app-caracteristique',
  templateUrl: './caracteristique.component.html',
  styleUrls: ['./caracteristique.component.scss']
})
export class CaracteristiqueComponent {
  loading: boolean;
  listeObject: Caracteristique[];
  isUpdating: boolean;
  isDeleting: boolean;

  destroy$: Subject<boolean> = new Subject<boolean>();
  statusObj$: Observable<Status>;

  closeDialog = false;
  formGroup: UntypedFormGroup;
  tableCols: TableColumn[];
  formCols: FormGroupColumn[];
  pageLabel = 'Liste des familles';
  formHeader = 'Création et mise à jour d\'une caractéristique d\'équipement';

  constructor(private store: Store<State>,
    protected fb: UntypedFormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
    this.formCols = [
      { field: 'id', header: 'Id', type: 'number', visible: false, required: false },
      { field: 'codeCaracteristique', header: 'Code caract.', type: 'string', visible: true, required: true },
      { field: 'libelle', header: 'Libelle', type: 'string', visible: true, required: true },
    ];

    this.tableCols = [
      { field: 'codeCaracteristique', header: 'Code', type: 'string', filter: true },
      { field: 'libelle', header: 'Libelle', type: 'string', filter: true },
    ];

    this.formGroup = this.fb.group({
      id: [''],
      codeCaracteristique: [''],
      libelle: ['', Validators.compose([Validators.required])],
    });
  }
  ngOnInit(): void {
    this.loadAll();
    this.statusObj$ = this.store.pipe(select(selecteStatut));
    this.store.pipe(select(selecteCaracteristiqueList)).pipe(takeUntil(this.destroy$))
      .subscribe((familleList: Caracteristique[]) => {
        this.listeObject = [];
        if (familleList) {
          familleList.forEach(fam => this.listeObject.push({ ...fam }));
          this.loading = true;
        }
        this.loading = true;
      });
    this.checkStatus();
  }

  loadAll(): void {
    this.loading = false;
    this.store.dispatch(FetchCaracteristique());
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

  onSave(data: Caracteristique) {
    this.isUpdating = true;
    if (data.id !== null) {
      this.store.dispatch(UpdateCaracteristique({ obj: data }));
    } else {
      this.store.dispatch(CreateCaracteristique({ obj: data }));
    }
  }

  onDelete(data: Caracteristique) {
    this.isDeleting = false;
    this.store.dispatch(DeleteCaracteristique({ obj: data }));

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
