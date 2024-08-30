import {Component, OnDestroy, OnInit} from '@angular/core';
import {DropdownSelector, FormGroupColumn, Province, Region, TableColumn} from '../../../../config/app.models';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {State, Status} from '../../../../config/store/reducers';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Observable, Subject, takeUntil} from 'rxjs';
import * as appSelector from '../../../../config/store/selector';
import {selecteProvinceList, selecteStatut} from '../../../../config/store/selector';
import {
    CreateProvince,
    DeleteProvince,
    FetchProvince,
    FetchRegion,
    UpdateProvince
} from '../../../../config/store/action';
import {messageShow, StatusEnum} from '../../../../config/gloabal-message.config';


// @ts-ignore
@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss']
})
export class ProvinceComponent implements OnInit, OnDestroy {

     loading: boolean;
        listeObject: Province[];
        isUpdating: boolean;
        isDeleting: boolean;

        destroy$: Subject<boolean> = new Subject<boolean>();
        statusObj$: Observable<Status>;

        closeDialog = false;
        formGroup: UntypedFormGroup;
        tableCols: TableColumn[];
        formCols: FormGroupColumn[];
        pageLabel = 'Liste des Provinces';
        formHeader = 'Création et mise à jour d\'un point de Province';
        ddListRegion: DropdownSelector[];

    constructor(private store: Store<State>,
                    protected fb: UntypedFormBuilder,
                    private messageService: MessageService,
                    private confirmationService: ConfirmationService) {

            this.ddListRegion =[{
                action: FetchRegion(),
                selector : appSelector.selecteRegionList,
                key:'id',
                field: 'regionId',
                optionLabel: 'libelle'
            }];

            this.formCols = [
                {field: 'id', header: 'Id', type: 'long', visible: false, required: false},
                {field: 'regionId', header: 'Region', type: 'dropdown', visible: true, required: true},
                {field: 'codeProvince', header: 'Code Province', type: 'string', visible: true, required: true},
                {field: 'libelle', header: 'Libelle', type: 'string', visible: true, required: false},
            ];

            this.tableCols = [
                {field: 'libelleRegion', header: 'Region', type: 'string', filter: true},
                {field: 'codeProvince', header: 'Code Province', type: 'string', filter: true},
                {field: 'libelle', header: 'Libelle', type: 'string', filter: true},
            ];

            this.formGroup = this.fb.group({
                id: [''],
                regionId: [''],
                codeProvince: [''],
                libelle: ['', Validators.compose([Validators.required])],
            });
        }


       ngOnInit(): void {
            this.loadAll();
            this.statusObj$ = this.store.pipe(select(selecteStatut));
            this.store.pipe(select(selecteProvinceList)).pipe(takeUntil(this.destroy$))
                .subscribe((provinces: Province[]) => {
                    this.listeObject = [];
                    if (provinces) {
                        provinces.forEach(p => this.listeObject.push({...p}));
                        this.loading = true;
                    }
                    this.loading = true;
                });

        this.checkStatus();
        }

        loadAll(): void {
                this.loading = false;
                this.store.dispatch(FetchProvince());
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

        onSave(data: Province) {
                this.isUpdating = true;
                if (data.id !== null) {
                    this.store.dispatch(UpdateProvince({obj: data}));
                } else {
                    this.store.dispatch(CreateProvince({obj: data}));
                }
            }

        onDelete(data: Province) {
                this.confirmationService.confirm({
                    message: 'Souhaitez-vous chosir cette province comme courant !',
                    header: 'Confirmation',
                    accept: () => {
                        this.isDeleting = false;
                        this.store.dispatch(DeleteProvince({obj: data}));
                    }
                });
        }

        ngOnDestroy(): void {
            this.destroy$.next(true);
            this.destroy$.unsubscribe();
        }
}
