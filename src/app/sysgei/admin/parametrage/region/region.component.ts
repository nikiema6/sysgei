import {Component, OnDestroy, OnInit} from '@angular/core';
import {DropdownSelector, FormGroupColumn, Region, TableColumn} from '../../../../config/app.models';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {State, Status} from '../../../../config/store/reducers';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {Observable, Subject, takeUntil} from 'rxjs';
import {selecteRegionList, selecteStatut} from '../../../../config/store/selector';
import {CreateRegion, DeleteRegion, FetchRegion, UpdateRegion} from '../../../../config/store/action';
import {messageShow, StatusEnum} from '../../../../config/gloabal-message.config';
import {ex} from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit, OnDestroy {
    loading: boolean;
    listeObject: Region[];
    isUpdating: boolean;
    isDeleting: boolean;
    dropdownList: DropdownSelector[] = [];

    destroy$: Subject<boolean> = new Subject<boolean>();
    statusObj$: Observable<Status>;

    closeDialog = false;
    formGroup: UntypedFormGroup;
    tableCols: TableColumn[];
    formCols: FormGroupColumn[];
    pageLabel = 'Liste des region';
    formHeader = 'Création et mise à jour d\'un point de région';

    constructor(private store: Store<State>,
                protected fb: UntypedFormBuilder,
                private messageService: MessageService,
                private confirmationService: ConfirmationService) {
        this.formCols = [
            {field: 'id', header: 'Id', type: 'number', visible: false, required: false},
            {field: 'codeRegion', header: 'Code region', type: 'string', visible: true, required: true},
            {field: 'libelle', header: 'Libelle', type: 'string', visible: true, required: false},
            {field: 'regionId', header: 'Region', type: 'dropdown', visible: true, required: false},
        ];

        this.tableCols = [
            {field: 'codeRegion', header: 'Code', type: 'string', filter: true},
            {field: 'libelle', header: 'Libelle', type: 'string', filter: true},
        ];

        this.formGroup = this.fb.group({
            id: [''],
            codeRegion: [''],
            libelle: ['', Validators.compose([Validators.required])],
            regionId: []
        });
    }

    ngOnInit(): void {
        this.loadAll();
        this.statusObj$ = this.store.pipe(select(selecteStatut));
        this.store.pipe(select(selecteRegionList)).pipe(takeUntil(this.destroy$))
            .subscribe((regionList: Region[]) => {
                this.listeObject = [];
                if (regionList ) {
                    regionList.forEach(exe => this.listeObject.push({...exe}));

                    let dd: SelectItem[] = [];
                    regionList.forEach(exe => {
                        const cp = {...exe};
                        dd.push({value: cp.id, label: cp.libelle})
                    });
                    this.dropdownList.push({
                        field: 'regionId',
                        dropdownEntries: dd
                    });
                    this.loading = true;
                }
                this.loading = true;
            });
        this.checkStatus();
    }

    loadAll(): void {
        this.loading = false;
        this.store.dispatch(FetchRegion());
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

    onSave(data: Region) {
        this.isUpdating = true;
        if (data.id !== null) {
            this.store.dispatch(UpdateRegion({obj: data}));
        } else {
            this.store.dispatch(CreateRegion({obj: data}));
        }
    }

    onDelete(data: Region) {
        this.isDeleting = false;
        this.store.dispatch(DeleteRegion({obj: data}));
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
