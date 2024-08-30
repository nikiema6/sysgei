import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ObservableNotification } from '@ngrx/effects/src/utils';
import { Store, select } from '@ngrx/store';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DropdownSelector, Famille, FormGroupColumn, SousFamille, SousFamilleList, TableColumn } from 'src/app/config/app.models';
import { StatusEnum, messageShow } from 'src/app/config/gloabal-message.config';
import { CreateSousFamille, DeleteSousFamille, FetchFamille, FetchSousFamille, UpdateSousFamille } from 'src/app/config/store/action';
import { State, Status } from 'src/app/config/store/reducers';
import { selecteFamilleList, selecteSousFamilleList, selecteStatut } from 'src/app/config/store/selector';
import * as appSelector from '../../../../config/store/selector';

@Component({
  selector: 'app-sousfamille',
  templateUrl: './sousfamille.component.html',
  styleUrls: ['./sousfamille.component.scss']
})
export class SousfamilleComponent {

  loading: boolean;
  listeObject: SousFamille[];
  isUpdating: boolean;
  isDeleting: boolean;

  destroy$: Subject<boolean> = new Subject<boolean>();
  statusObj$: Observable<Status>;

  closeDialog = false;
  formGroup: UntypedFormGroup;
  tableCols: TableColumn[];
  formCols: FormGroupColumn[];
  pageLabel = 'Liste des sous familles';
  formHeader = 'Création et mise à jour d\'une sous famille d\'équipement';
  dropDownList: DropdownSelector[]=[];


  constructor(private store: Store<State>,
    protected fb: UntypedFormBuilder,
    private messageService: MessageService) {
    this.formCols = [
      { field: 'familleId', header: 'Famille', type: 'dropdown', visible: true, required: false },
      { field: 'id', header: 'Id', type: 'number', visible: false, required: false },
      { field: 'codeSousFamille', header: 'Code sous famille', type: 'string', visible: true, required: true },
      { field: 'libelle', header: 'Libelle', type: 'string', visible: true, required: true },
    ];

    this.tableCols = [
      { field: 'codeSousFamille', header: 'Code', type: 'string',
          filter: true, width: '10%'},
      { field: 'libelle', header: 'Libelle', type: 'string', filter: true, width: '70%'},
    ];

    this.formGroup = this.fb.group({
      id: [''],
      familleId: [''],
      codeSousFamille: [''],
      libelle: ['', Validators.compose([Validators.required])],
    });

    // contruction des dropdown
      this.dropDownList = [
          {
              action: FetchFamille(),
              selector: appSelector.selecteFamilleList,
              key: 'id',
              field: 'familleId',
              optionLabel: 'libelle'
          }
      ];
  }

  ngOnInit(): void {
    this.loadAll();
    this.statusObj$ = this.store.pipe(select(selecteStatut));
    this.store.pipe(select(selecteSousFamilleList)).pipe(takeUntil(this.destroy$))
      .subscribe((sousFamilleList: SousFamille[]) => {
        this.listeObject = [];
        if (sousFamilleList) {
          sousFamilleList.forEach(sousFam => this.listeObject.push({ ...sousFam }));
          this.loading = true;
        }
        this.loading = true;
      });

    this.checkStatus();
  }

  loadAll(): void {
    this.loading = false;
    this.store.dispatch(FetchSousFamille());
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

  onSave(data: SousFamille) {
    this.isUpdating = true;
    if (data.id !== null) {
      this.store.dispatch(UpdateSousFamille({ obj: data }));
    } else {
      this.store.dispatch(CreateSousFamille({ obj: data }));
    }
  }

  onDelete(data: SousFamille) {
    this.isDeleting = false;
    this.store.dispatch(DeleteSousFamille({ obj: data }));

  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
