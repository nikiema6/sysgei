import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DropdownSelector, FormGroupColumn, Structure, TableColumn } from 'src/app/config/app.models';
import { StatusEnum, messageShow } from 'src/app/config/gloabal-message.config';
import { CreateStructure, DeleteStructure, FetchLocalite, FetchStructure, UpdateStructure } from 'src/app/config/store/action';
import { State, Status } from 'src/app/config/store/reducers';
import { selecteFamilleList, selecteLocaliteList, selecteStatut, selecteStructureList } from 'src/app/config/store/selector';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent {
  loading: boolean;
  listeObject: Structure[];
  isUpdating: boolean;
  isDeleting: boolean;

  destroy$: Subject<boolean> = new Subject<boolean>();
  statusObj$: Observable<Status>;

  closeDialog = false;
  formGroup: UntypedFormGroup;
  tableCols: TableColumn[];
  formCols: FormGroupColumn[];
  pageLabel = 'Liste des structures administratives';
  formHeader = 'Création et mise à jour d\'une structure administrative';
  dropDownList: DropdownSelector[]=[];


  constructor(private store: Store<State>,
    protected fb: UntypedFormBuilder,
    private messageService: MessageService) {
    this.formCols = [
      { field: 'localiteId', header: 'Localité', type: 'dropdown', visible: true, required: false },
      { field: 'id', header: 'Id', type: 'number', visible: false, required: false },
      { field: 'codeStruct', header: 'Code struct.', type: 'string', visible: true, required: true },
      { field: 'libelleCourt', header: 'Libelle court', type: 'string', visible: true, required: true },
      { field: 'libelleLong', header: 'Libelle long', type: 'string', visible: true, required: true },
    ];

    this.tableCols = [
      { field: 'codeStruct', header: 'Code', type: 'string',
          filter: true, width: '10%'},
      { field: 'libelleCourt', header: 'Libelle court', type: 'string', filter: true, width: '10%'},
      { field: 'libelleLong', header: 'Libelle long', type: 'string', filter: true, width: '55%'},
    ];

    this.formGroup = this.fb.group({
      id: [''],
      localiteId: ['', Validators.compose([Validators.required])],
      codeStruct: ['', Validators.compose([Validators.required])],
      libelleCourt: ['', Validators.compose([Validators.required])],
      libelleLong: ['', Validators.compose([Validators.required])],
    });

    // contruction des dropdown
      this.dropDownList = [
          {
              action: FetchLocalite(),
              selector: selecteLocaliteList,
              key: 'id',
              field: 'localiteId',
              optionLabel: 'libelle'
          }
      ];
  }

  ngOnInit(): void {
    this.loadAll();
    this.statusObj$ = this.store.pipe(select(selecteStatut));
    this.store.pipe(select(selecteStructureList)).pipe(takeUntil(this.destroy$))
      .subscribe((structureList: Structure[]) => {
        this.listeObject = [];
        if (structureList) {
          structureList.forEach(struct => this.listeObject.push({ ...struct }));
          this.loading = true;
        }
        this.loading = true;
      });

    this.checkStatus();
  }

  loadAll(): void {
    this.loading = false;
    this.store.dispatch(FetchStructure());
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

  onSave(data: Structure) {
    this.isUpdating = true;
    if (data.id !== null) {
      this.store.dispatch(UpdateStructure({ obj: data }));
    } else {
      this.store.dispatch(CreateStructure({ obj: data }));
    }
  }

  onDelete(data: Structure) {
    this.isDeleting = false;
    this.store.dispatch(DeleteStructure({ obj: data }));

  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
