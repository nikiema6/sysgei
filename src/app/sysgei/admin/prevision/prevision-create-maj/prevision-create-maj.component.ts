import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {State, Status} from '../../../../config/store/reducers';
import {Observable, Subject, takeUntil} from 'rxjs';
import {messageShow, StatusEnum} from '../../../../config/gloabal-message.config';
import {select, Store} from '@ngrx/store';
import {ConfirmationService, MessageService} from 'primeng/api';
import {
    Critere, EtapeProcessPrev,
    EtapeWorkflow,
    Exercice,
    Prevision,
    ProcessPrevision,
    ReportingInput,
    TableColumn
} from '../../../../config/app.models';
import {
    selecteCurentProcess,
    selecteCurrentExercice,
    selectePevisionList,
    selecteReportPrintBytes,
    selecteStatut
} from '../../../../config/store/selector';
import {DialogService} from 'primeng/dynamicdialog';
import {CreateDialogComponent} from './create-dialog/create-dialog.component';
import {
    DeletePrevision,
    FetchPrevision,
    PrintReport,
    SetPrevisionList,
    SetPrintReport,
    WorkflowNext
} from '../../../../config/store/action';
import {EReportType, printByFormat, ReportFormat} from '../../../../config/utils';
import {AppServices} from '../../../../config/app.services';

@Component({
  selector: 'app-prevision-create-maj',
  templateUrl: './prevision-create-maj.component.html',
  styleUrls: ['./prevision-create-maj.component.scss']
})
export class PrevisionCreateMajComponent implements OnInit, OnDestroy {
    @Input() etapeWorkFlow: EtapeWorkflow;
    @Input() etapeWorkFlowNext: EtapeWorkflow;
    @Input() title: String;
    @Output() process = new EventEmitter<ProcessPrevision>();
    header: String;
    destroy$: Subject<boolean> = new Subject<boolean>();
    statusObj$: Observable<Status>;
    position = 'left';
    tableCols: TableColumn[];
    previsionList: Array<Prevision> = [];
    filterFiels: any[];
    private currentExercice: Exercice;
    private isDeleting: boolean;
    private isSubmited: boolean;
    reportInput: ReportingInput;
    curentProcess: ProcessPrevision;
    etatProcess = EtapeProcessPrev;


    constructor(private store: Store<State>,
                private messageService: MessageService,
                private dialogService: DialogService,
                private confirmationService: ConfirmationService) {
        this.tableCols = [
            {field: 'reference', header: 'Réference', type: 'string', filter: true, width: '20%'},
            {field: 'libelleStructure', header: 'Structure', type: 'string', filter: true, width: '60%'}
        ];
    }

    ngOnInit(): void {
        this.header = this.etapeWorkFlow !== null ? this.title : 'Création/Maj de prévision';
        this.filterFiels = this.tableCols.map(c => c.field);
        this.statusObj$ = this.store.pipe(select(selecteStatut));
        this.store.pipe(select(selectePevisionList)).pipe(takeUntil(this.destroy$))
            .subscribe((previsionList: Prevision[]) => {
                this.previsionList = [];
                if (previsionList) {
                    previsionList.forEach(p => this.previsionList.push({...p}));
                }
            });
        this.store.pipe(select(selecteCurrentExercice)).pipe(takeUntil(this.destroy$))
            .subscribe((exercice: Exercice) => {
                if (exercice) {
                    this.currentExercice = exercice;
                    this.loadPevision();
                }
            });
        this.store.pipe(select(selecteCurentProcess)).pipe(takeUntil(this.destroy$))
            .subscribe((procePrevi: ProcessPrevision) => {
                if (procePrevi) {
                    this.curentProcess = {...procePrevi};
                    this.process.emit(this.curentProcess);
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
                        if (this.isDeleting) {
                            this.isDeleting = false;
                        }
                        if (this.isSubmited) {
                            this.isSubmited = false;
                        }
                        this.loadPevision();
                    }
                }
            });
    }

    loadPevision() {
        const etap = this.etapeWorkFlow != null ? this.etapeWorkFlow : EtapeWorkflow.INIT;
        const critere: Critere = {
            exerciceId: this.currentExercice.id ?? null,
            etape: etap
        };
        this.store.dispatch(FetchPrevision(critere));
    }


    // Ouvrire le dialog pour la creation d'une
    // prevision
    openNew() {
        this.dialogCall('Crétion de prévision')
    }

    // Modification d'une pression
    // prend en paramtre la prevision à supprimer
    edit(pre: Prevision) {
        this.dialogCall('Crétion de prévision', pre);
    }

    // Soumettre une pression pour validation
    // prend en paramtre la prevision soumettre
    soumettre(pre: Prevision) {
        this.confirmationService.confirm({
            header: 'CONFIRMATION',
            message: 'Voulez-vous vraiment effectuer cette opération ?',
            accept: () => {
                this.isSubmited = true;
                const etap = this.etapeWorkFlowNext != null ? this.etapeWorkFlowNext: EtapeWorkflow.SOUMIS;
                this.store.dispatch(WorkflowNext({
                    etapeWorkflow: etap,
                    previsionList: [pre]
                }));
            }
        })
    }

    // Suppression d'une prevision
    // prend en paramtre la prevision à supprimer
    delete(pre: Prevision) {
        this.confirmationService.confirm({
            header: 'CONFIRMATION',
            message: 'Voulez-vous vraiment supprimer cette prevision ?',
            accept: () => {
                this.isDeleting = true;
                this.store.dispatch(DeletePrevision({obj: pre}));
            }
        })
    }

    buildPrevToUpdate(prevision: Prevision) {
        let detailPreLis = prevision.detailPrevisions;
        detailPreLis.forEach((value, index) => {
            console.log(detailPreLis.slice(index,index+1));
        });
    }


    dialogCall( header: string, prevision?: Prevision,
                consultation?: boolean, widthD?: string) {
        const config = {
            header,
            width: widthD ? widthD : '90%',
            contentStyle: {overflow: 'auto'},
            closable: true,
            draggable: true,
            resizable: true,
            maximizable: true,
            data: {
                exercice: this.currentExercice,
                prevision,
                consultation
            }
        };
        const ref = this.dialogService.open(CreateDialogComponent,  config);
        ref.onClose.subscribe(() => {
            this.store.dispatch(SetPrevisionList({datas: []}));
            this.loadPevision();
        });
    }


    detail(rowData) {
        this.dialogCall(
            'Detail de prevision Rerf '+ rowData.reference,
            rowData, true, '60%')
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

}
