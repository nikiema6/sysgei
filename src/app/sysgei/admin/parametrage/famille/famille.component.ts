import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Famille, FormGroupColumn, TableColumn } from 'src/app/config/app.models';
import { StatusEnum, messageShow } from 'src/app/config/gloabal-message.config';
import { CreateFamille, DeleteFamille, FetchFamille, UpdateFamille } from 'src/app/config/store/action';
import { State, Status } from 'src/app/config/store/reducers';
import { selecteFamilleList, selecteStatut } from 'src/app/config/store/selector';

@Component({
  selector: 'app-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.scss']
})
export class FamilleComponent {
  loading: boolean;
  listeObject: Famille[];
  isUpdating: boolean;
  isDeleting: boolean;

  destroy$: Subject<boolean> = new Subject<boolean>();
  statusObj$: Observable<Status>;

  closeDialog = false;
  formGroup: UntypedFormGroup;
  tableCols: TableColumn[];
  formCols: FormGroupColumn[];
  pageLabel = 'Liste des familles';
  formHeader = 'Création et mise à jour d\'une famille d\'équipement';

  constructor(private store: Store<State>,
    protected fb: UntypedFormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
    this.formCols = [
      { field: 'id', header: 'Id', type: 'number', visible: false, required: false },
      { field: 'codeFamille', header: 'Code famille', type: 'string', visible: true, required: true },
      { field: 'libelle', header: 'Libelle', type: 'string', visible: true, required: false },
    ];

    this.tableCols = [
      { field: 'codeFamille', header: 'Code', type: 'string', filter: true },
      { field: 'libelle', header: 'Libelle', type: 'string', filter: true },
    ];

    this.formGroup = this.fb.group({
      id: [''],
      codeFamille: [''],
      libelle: ['', Validators.compose([Validators.required])],
    });
  }
  ngOnInit(): void {
    this.loadAll();
    this.statusObj$ = this.store.pipe(select(selecteStatut));
    this.store.pipe(select(selecteFamilleList)).pipe(takeUntil(this.destroy$))
      .subscribe((familleList: Famille[]) => {
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
    this.store.dispatch(FetchFamille());
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

  onSave(data: Famille) {
    this.isUpdating = true;
    if (data.id !== null) {
      this.store.dispatch(UpdateFamille({ obj: data }));
    } else {
      this.store.dispatch(CreateFamille({ obj: data }));
    }
  }

  onDelete(data: Famille) {
    this.isDeleting = false;
    this.store.dispatch(DeleteFamille({ obj: data }));

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
