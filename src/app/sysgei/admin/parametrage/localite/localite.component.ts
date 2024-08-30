import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DropdownSelector, FormGroupColumn, Localite, TableColumn } from 'src/app/config/app.models';
import { StatusEnum, messageShow } from 'src/app/config/gloabal-message.config';
import { CreateLocalite, DeleteLocalite, FetchDepartement, FetchLocalite, UpdateLocalite } from 'src/app/config/store/action';
import { State, Status } from 'src/app/config/store/reducers';
import { selecteDepartementList, selecteLocaliteList, selecteStatut } from 'src/app/config/store/selector';

@Component({
  selector: 'app-localite',
  templateUrl: './localite.component.html',
  styleUrls: ['./localite.component.scss']
})
export class LocaliteComponent {
  loading: boolean;
  listeObject: Localite[];
  isUpdating: boolean;
  isDeleting: boolean;

  destroy$: Subject<boolean> = new Subject<boolean>();
  statusObj$: Observable<Status>;

  closeDialog = false;
  formGroup: UntypedFormGroup;
  tableCols: TableColumn[];
  formCols: FormGroupColumn[];
  pageLabel = 'Liste des localités';
  formHeader = 'Création et mise à jour d\'une localié administrative';
  dropDownList: DropdownSelector[]=[];

  constructor(private store: Store<State>,
    protected fb: UntypedFormBuilder,
    private messageService: MessageService) {
    this.formCols = [
      { field: 'departementId', header: 'Commune', type: 'dropdown', visible: true, required: false },
      { field: 'id', header: 'Id', type: 'number', visible: false, required: false },
      { field: 'codeLocalite', header: 'Code localite', type: 'string', visible: true, required: true },
      { field: 'libelle', header: 'Libelle', type: 'string', visible: true, required: true },
    ];

    this.tableCols = [
      { field: 'codeLocalite', header: 'Code', type: 'string', filter: true, width: '10%'},
      { field: 'libelle', header: 'Libelle', type: 'string', filter: true, width: '70%'},
    ];

    this.formGroup = this.fb.group({
      id: [''],
      departementId: ['', Validators.compose([Validators.required])],
      codeLocalite: ['', Validators.compose([Validators.required])],
      libelle: ['', Validators.compose([Validators.required])],
    });

    // contruction des dropdown
      this.dropDownList = [
          {
              action: FetchDepartement(),
              selector: selecteDepartementList,
              key: 'id',
              field: 'departementId',
              optionLabel: 'libelle'
          }
      ];
  }

  ngOnInit(): void {
    this.loadAll();
    this.statusObj$ = this.store.pipe(select(selecteStatut));
    this.store.pipe(select(selecteLocaliteList)).pipe(takeUntil(this.destroy$))
      .subscribe((localite: Localite[]) => {
        this.listeObject = [];
        if (localite) {
          localite.forEach(loca => this.listeObject.push({ ...loca }));
          this.loading = true;
        }
        this.loading = true;
      });

    this.checkStatus();
  }

  loadAll(): void {
    this.loading = false;
    this.store.dispatch(FetchLocalite());
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

  onSave(data: Localite) {
    this.isUpdating = true;
    if (data.id !== null) {
      this.store.dispatch(UpdateLocalite({ obj: data }));
    } else {
      this.store.dispatch(CreateLocalite({ obj: data }));
    }
  }

  onDelete(data: Localite) {
    this.isDeleting = false;
    this.store.dispatch(DeleteLocalite({ obj: data }));

  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
