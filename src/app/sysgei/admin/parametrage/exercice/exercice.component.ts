import {Component, OnDestroy, OnInit} from '@angular/core';
import {Exercice, TableColumn, TypeStorage} from '../../../../config/app.models';
import {Observable, Subject, takeUntil} from 'rxjs';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {State, Status} from '../../../../config/store/reducers';
import {select, Store} from '@ngrx/store';
import {ConfirmationService, MessageService} from 'primeng/api';
import {initLocalDate, setLocalStorage} from '../../../../config/utils';
import {selecteExerciceList, selecteStatut} from '../../../../config/store/selector';
import {messageShow, StatusEnum} from '../../../../config/gloabal-message.config';
import {DateUtils} from '../../../../config/dateUtils';
import {CreateExercice, DeleteExercice, FetchExerciceList, UpdateExercice} from '../../../../config/store/action';


@Component({
    selector: 'app-exercice',
    templateUrl: './exercice.component.html',
    styleUrls: ['./exercice.component.scss']
})
export class ExerciceComponent implements OnInit, OnDestroy {
    exerciceList: Exercice[];
    destroy$: Subject<boolean> = new Subject<boolean>();
    statusObj$: Observable<Status>;
    tableCols: TableColumn[];
    formGroup: UntypedFormGroup;
    display: boolean;
    bf: any;
    isUpdating: boolean;
    position = 'top';

    constructor(private store: Store<State>,
                protected fb: UntypedFormBuilder,
                private messageService: MessageService,
                private confirmationService: ConfirmationService
    ) {
        this.tableCols = [
            {field: 'annee', header: 'Année', type: 'string', filter: true},
            {field: 'dateDebut', header: 'Date début', type: 'date', filter: true},
            {field: 'dateFin', header: 'Date fin', type: 'date', filter: true},
            {
                field: 'current', header: 'Status', type: 'boolean', filter: false,
                labelTrue: 'En cours', labelFalse: 'Non atif'
            }
        ];

        this.formGroup = this.fb.group({
            id: [''],
            annee: ['', Validators.compose([Validators.required])],
            dateDebut: ['', Validators.compose([Validators.required])],
            dateFin: ['', Validators.compose([Validators.required])],
            current: ['']
        });
    }

    ngOnInit(): void {
        this.bf = initLocalDate();
        this.statusObj$ = this.store.pipe(select(selecteStatut));
        this.store.dispatch(FetchExerciceList());
        this.store.pipe(select(selecteExerciceList)).pipe(takeUntil(this.destroy$))
            .subscribe((exerciceList: Exercice[]) => {
                if (exerciceList) {
                    this.exerciceList = [];
                    exerciceList.forEach(exe => this.exerciceList.push({...exe}));
                }
            });
        this.checkStatus();
    }

    checkStatus() {
        this.statusObj$.pipe(takeUntil(this.destroy$))
            .subscribe(statusObj => {
                if (statusObj) {
                    messageShow(statusObj.status, null, statusObj.message, this.messageService);
                    if (statusObj.status === StatusEnum.success) {
                        if (this.isUpdating) {
                            this.hidDialog();
                            this.isUpdating = false;
                        }
                    }
                }
            });
    }

    save() {
        const exercice: Exercice = this.formGroup.value;
        this.isUpdating = true;
        if (exercice.id !== null) {
            this.store.dispatch(UpdateExercice({obj: exercice}));
        } else {
            this.store.dispatch(CreateExercice({obj: exercice}));
        }
    }

    openNew() {
        this.formGroup.reset();
        this.display = true;
    }

    update(exercice: Exercice) {
        this.formGroup.patchValue({
            ...exercice,
            dateDebut: exercice.dateDebut ?
                DateUtils.patternToDate(DateUtils.toFormatFromDate(exercice.dateDebut),
                    'DD/MM/YYYY') : null,
            dateFin: exercice.dateFin ?
                DateUtils.patternToDate(DateUtils.toFormatFromDate(exercice.dateFin),
                    'DD/MM/YYYY') : null,
        });
        this.display = true;
    }

    delele(rowData) {
        this.confirmationService.confirm({
            message: 'Voulez-vous vraiment supprimer !',
            header: 'Confirmation',
            accept: () => {
                this.store.dispatch(DeleteExercice({obj: rowData}));
            }
        });
    }

    activerExercice(rowData: Exercice) {
        this.confirmationService.confirm({
            message: 'Voulez-vous chosir ce exercice comme courant !',
            header: 'Confirmation',
            accept: () => {
                rowData.current = true;
                setLocalStorage(TypeStorage.EXERCICE, null);
                this.store.dispatch(UpdateExercice({obj: rowData}));
            }
        });
    }

    hidDialog() {
        this.formGroup.reset();
        this.display = false;
    }
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    closeExercice(rowData) {
        // Todo
    }
}
