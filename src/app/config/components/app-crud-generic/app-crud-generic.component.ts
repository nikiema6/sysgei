import {
    AfterContentChecked,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges, OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { DropdownSelector, FormGroupColumn, MultiSelectSelector, TableColumn } from '../../app.models';
import { DateUtils } from '../../dateUtils';
import { select, Store } from '@ngrx/store';
import { State } from '../../store/reducers';
import { takeUntil, Subject } from 'rxjs';
import { messageShow } from '../../gloabal-message.config';

@Component({
    selector: 'app-crud-generic',
    templateUrl: './app-crud-generic.component.html',
    styleUrls: ['./app-crud-generic.component.scss']
})
export class AppCrudGenericComponent implements OnInit, OnDestroy, AfterContentChecked, OnChanges {
    destroy$: Subject<boolean> = new Subject<boolean>();
    @Input() pageLabel: string;
    @Input() tableCols: TableColumn[];
    @Input() formCols: FormGroupColumn[];
    @Input() formGroup: UntypedFormGroup;
    @Output() newItemEvent = new EventEmitter<any>();
    @Output() removeEvent = new EventEmitter<any>();
    @Output() filterEvent = new EventEmitter<any>();
    @Input() listeObject: any[];
    @Input() dropdownList: DropdownSelector[];
    @Input() multiSelectList: MultiSelectSelector[];
    @Input() closeDialog: boolean;
    @Input() formHeader: string;
    @Input() notModif: boolean;
    @Input() notDelete: boolean;
    @Input() searchField: any[];
    @Input() addFilter: boolean;
    @Input() consultation: boolean;
    display: boolean;
    filterFiels: any[];
    dropDownObject: any = {};
    multiselectObject: any = {};
    position: any = 'top';
    value: any;

    constructor(protected confirmationService: ConfirmationService,
        protected messageService: MessageService,
        protected changeDet: ChangeDetectorRef, private store: Store<State>) {
    }

    ngOnInit(): void {
        this.filterFiels = this.tableCols.map(c => c.field);
        if (this.dropdownList) {
            this.dropdownList.forEach((dropdownSelector: DropdownSelector) => {
                // when the action is given and the dropdownEntries should be built
                if (dropdownSelector.action || dropdownSelector.selector) {
                    if (dropdownSelector.action) {
                        this.store.dispatch(dropdownSelector.action);
                    }
                    this.store.pipe(select(dropdownSelector.selector)).pipe(takeUntil(this.destroy$))
                        .subscribe(objList => {
                            if (objList) {
                                const values = objList.slice();
                                const dropdownEntries: SelectItem[] = [];
                                values.forEach((entry: any) => {
                                    dropdownEntries.push({
                                        label: entry[dropdownSelector.optionLabel],
                                        value: entry[dropdownSelector.key]
                                    });
                                });
                                this.dropDownObject[dropdownSelector.field] = DateUtils.sortArray(dropdownEntries,
                                    'value', 'asc');
                            }
                        });
                } else {
                    // when the dropdownEntries is given directly as object
                    this.dropDownObject[dropdownSelector.field] =
                        DateUtils.sortArray(dropdownSelector.dropdownEntries, 'value', 'asc');
                }
            });

        }

        if (this.multiSelectList) {
            this.multiSelectList.forEach(v => {
                this.multiselectObject[v.field] = v.multiselectEntries;
            });
        }
    }

    // Permet de lever l'exception
    // ExpressionChangedAfterItHasBeenCheckedError
    ngAfterContentChecked(): void {
        this.changeDet.detectChanges();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.closeDialog) {
            this.hidDialog();
        }
    }

    save() {
        if (this.formGroup.valid) {
            const data: any = this.formGroup.value;
            this.newItemEvent.emit(data);
        } else {
            messageShow('warning', null, 'Formulaire invalid',
                this.messageService);
        }
    }

    delele(data: any) {
        this.confirmationService.confirm({
            header: 'CONFIRMATION',
            message: 'Voulez-vous vraiment supprimer cet enregistrement ',
            accept: () => {
                this.removeEvent.emit(data);
            }
        });
    }

    openNew() {
        this.formGroup.reset();
        this.display = true;
    }

    edit(rowData: any) {
        this.formGroup.patchValue(rowData);
        const cols = this.tableCols.filter(col => col.type === 'date');
        if (cols?.length > 0) {
            cols.forEach(col => {
                const date = rowData[col.field] ?
                    DateUtils.patternToDate(DateUtils.toFormatFromDate(rowData[col.field]),
                        'DD/MM/YYYY') : null;
                this.formGroup.get(col.field).setValue(date);
            });
        }
        this.display = true;
    }

    hidDialog() {
        this.formGroup.reset();
        this.display = false;
    }

    onFilterChange(field: string) {
        if (field) {
            const elem = this.searchField.find(res => res.field === field);
            if (elem) {
                elem.value = this.value;
                this.filterEvent.emit(elem);
            }
        }
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        // Now let's also unsubscribe from the subject itself:
        this.destroy$.unsubscribe();
    }
}
