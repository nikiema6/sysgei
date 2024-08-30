import {Component, OnDestroy, OnInit} from '@angular/core';
import {State, Status} from '../../../../config/store/reducers';
import {EtapeProcessPrev, ProcessPrevision, TableColumn} from '../../../../config/app.models';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ConfirmationService, MessageService} from 'primeng/api';
import {selecteProcessPrevision, selecteStatut} from '../../../../config/store/selector';
import {takeUntil} from 'rxjs/operators';
import {messageShow, StatusEnum} from '../../../../config/gloabal-message.config';
import {
    AnnulerPrevisionProces,
    ClorePrevisionProces,
    FetchPrevisionProcesList,
    OuvrirePrevisionProces
} from '../../../../config/store/action';
import {DateUtils} from '../../../../config/dateUtils';

@Component({
  selector: 'app-process-prev',
  templateUrl: './process-prev.component.html',
  styleUrls: ['./process-prev.component.scss']
})
export class ProcessPrevComponent implements OnInit, OnDestroy {
    listProcess: ProcessPrevision[] = [];
    destroy$: Subject<boolean> = new Subject<boolean>();
    statusObj$: Observable<Status>;
    tableCols: TableColumn[];

    constructor(protected store: Store<State>,
                protected messageService: MessageService,
                protected confirmationService: ConfirmationService) {
        this.tableCols = [
            {field: 'libelle', header: 'Processus', type: 'string', filter: false},
            {field: 'dateDebut', header: 'Date début', type: 'date', filter: false},
            {field: 'dateFin', header: 'Date fin', type: 'date', filter: false},
            {field: 'etat', header: 'Etat', type: 'string', filter: false}
        ];
    }

    ngOnInit(): void {
        this.statusObj$ = this.store.pipe(select(selecteStatut));
        this.store.dispatch(FetchPrevisionProcesList());
        this.store.pipe(select(selecteProcessPrevision)).pipe(takeUntil(this.destroy$))
            .subscribe((processPrevisions: ProcessPrevision[]) => {
                this.listProcess = [];
                if (processPrevisions) {
                    processPrevisions.forEach(p => this.listProcess.push({...p}));
                    this.listProcess = DateUtils.sortArray(this.listProcess, 'dateFin', 'desc');
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

                    }
                }
            });
    }


    openPrevision() {
        this.confirmationService.confirm({
            header: 'OUVERTURE DE PROCESS',
            message: 'Voulez-vous vraiment Ouvrie un process de saisie de prévision',
            accept: () =>  {
                const process: ProcessPrevision = {
                    libelle: 'Ouverture de la saisie de prévision',
                    dateDebut: new Date(),
                    etat: EtapeProcessPrev.OUVERT
                };
                this.store.dispatch(OuvrirePrevisionProces({obj: process}));
            }
        })
    }

    closePrevision() {
        this.confirmationService.confirm({
            header: 'CLOTURE DE PROCESS',
            message: 'Voulez-vous vraiment fermer le process de saisie de prévision',
            accept: () =>  {
                const process: ProcessPrevision = {
                    libelle: 'Clôture de la saisie de prévision',
                    dateDebut: new Date(),
                    etat: EtapeProcessPrev.FERMER
                };
                this.store.dispatch(ClorePrevisionProces({obj: process}));
            }
        })
    }

    annuler(rowData) {
        this.confirmationService.confirm({
            header: 'ANNULATION DE PROCESS',
            message: 'Voulez-vous vraiment annuler le process de saisie de prévision',
            accept: () =>  {
                this.store.dispatch(AnnulerPrevisionProces({obj: rowData}));
            }
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();

    }
}
