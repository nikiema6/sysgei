import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Departement, DropdownSelector, FormGroupColumn, TableColumn } from 'src/app/config/app.models';
import { CreateDepatement, DeleteDepartement, FetchDepartement, FetchProvince, UpdateDepartement } from 'src/app/config/store/action';
import { State, Status } from 'src/app/config/store/reducers';
import * as appSelector from '../../../../config/store/selector';
import { StatusEnum, messageShow } from 'src/app/config/gloabal-message.config';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent {
  loading: boolean;
  listeObject: Departement[];
  isUpdating: boolean;
  isDeleting: boolean;

  destroy$: Subject<boolean> = new Subject<boolean>();
  statusObj$: Observable<Status>;

  closeDialog = false;
  formGroup: UntypedFormGroup;
  tableCols: TableColumn[];
  formCols: FormGroupColumn[];
  pageLabel = 'Liste des département';
  formHeader = 'Création et mise à jour d\'un département';
  dropDownList: DropdownSelector[];


  constructor(private store: Store<State>,
    protected fb: UntypedFormBuilder,
    private messageService: MessageService) {
    this.formCols = [
      { field: 'id', header: 'Id', type: 'number', visible: false, required: false },
      { field: 'provinceId', header: 'Province', type: 'dropdown', visible: true, required: true },
      { field: 'codeDept', header: 'Code départ.', type: 'string', visible: true, required: true },
      { field: 'libelle', header: 'Libelle', type: 'string', visible: true, required: true },
    ];

    this.tableCols = [
      { field: 'codeDept', header: 'Code', type: 'string', filter: true, width: '10%'},
      { field: 'libelle', header: 'Libelle', type: 'string', filter: true, width: '70%'},
    ];

    this.formGroup = this.fb.group({
      id: [''],
      provinceId: [''],
      codeDept: [''],
      libelle: ['', Validators.compose([Validators.required])],
    });

    // contruction des dropdown
      this.dropDownList = [
          {
              action: FetchProvince(),
              selector: appSelector.selecteProvinceList,
              key: 'id',
              field: 'provinceId',
              optionLabel: 'libelle'
          }
      ];
  }

  ngOnInit(): void {
    this.loadAll();
    this.statusObj$ = this.store.pipe(select(appSelector.selecteStatut));
    this.store.pipe(select(appSelector.selecteDepartementList)).pipe(takeUntil(this.destroy$))
      .subscribe((departementList: Departement[]) => {
        this.listeObject = [];
        if (departementList) {
          departementList.forEach(depart => this.listeObject.push({ ...depart }));
          this.loading = true;
        }
        this.loading = true;
      });

    this.checkStatus();
  }

  loadAll(): void {
    this.loading = false;
    this.store.dispatch(FetchDepartement());
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

  onSave(data: Departement) {
    this.isUpdating = true;
    if (data.id !== null) {
      this.store.dispatch(UpdateDepartement({ obj: data }));
    } else {
      this.store.dispatch(CreateDepatement({ obj: data }));
    }
  }

  onDelete(data: Departement) {
    this.isDeleting = false;
    this.store.dispatch(DeleteDepartement({ obj: data }));

  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
