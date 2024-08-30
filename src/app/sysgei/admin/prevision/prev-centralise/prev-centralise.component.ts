import {Component, OnDestroy, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {
    Critere,
    EtapeWorkflow,
    Exercice,
    ReportingInput,
    Structure,
    ValeurPevision
} from '../../../../config/app.models';
import {select, Store} from '@ngrx/store';
import {State, Status} from '../../../../config/store/reducers';
import {Observable, Subject} from 'rxjs';
import {
    selecteCurrentExercice,
    selecteExerciceList, selecteReportPrintBytes,
    selecteStructureList,
    selecteValPrevisionByCriteria
} from '../../../../config/store/selector';
import {takeUntil} from 'rxjs/operators';
import {
    FetchExerciceList,
    FetchPrevValeurByCritere,
    FetchStructure,
    PrintReport, SetPrintReport
} from '../../../../config/store/action';
import {EReportType, printByFormat, ReportFormat} from '../../../../config/utils';

@Component({
  selector: 'app-prev-centralise',
  templateUrl: './prev-centralise.component.html',
  styleUrls: ['./prev-centralise.component.scss']
})
export class PrevCentraliseComponent implements OnInit, OnDestroy{
    destroy$: Subject<boolean> = new Subject<boolean>();
    statusObj$: Observable<Status>;
    ddStrucure: SelectItem[] = [];
    ddExercice: SelectItem[] = [];
    selectedExercice: Exercice;
    exerciceList: Array<Exercice> = [];
    reportInput: ReportingInput;
    critere: Critere = {
        etape: EtapeWorkflow.VALIDE
    };
    listValeurPrevision: ValeurPevision[] = [];
    listValeurPrevisionCopy: ValeurPevision[] = [];
    position: 'top';
    loading: boolean;
    private isprinting: any;

    constructor(protected store: Store<State>) {}

    ngOnInit(): void {
        this.reportInput = {
            reportFormat: ReportFormat.PDF,
            reportType: EReportType.PREVISION_REPORT,
            page: 1,
            ville: 'Ouagadougou',
            etape: EtapeWorkflow.VALIDE
        };
        this.loading = false;
        this.store.dispatch(FetchStructure());
        this.store.dispatch(FetchExerciceList());
        this.store.pipe(select(selecteStructureList)).pipe(takeUntil(this.destroy$))
            .subscribe((structureList: Structure[]) => {
                this.ddStrucure = [];
                if (structureList) {
                    structureList.forEach(sf => this.ddStrucure.push({
                        label: sf.codeStruct + ' ' + sf.libelleCourt + ' - ' + sf.libelleLong,
                        value: sf.id
                    }));
                }
            });

        this.store.pipe(select(selecteValPrevisionByCriteria)).pipe(takeUntil(this.destroy$))
            .subscribe((prevValeur: ValeurPevision[]) => {
                this.listValeurPrevisionCopy = [];
                this.listValeurPrevision = [];
                this.loading = false;
                if (prevValeur) {
                    prevValeur.forEach(s => this.listValeurPrevisionCopy.push({...s, old: true}));
                    this.listValeurPrevision = this.listValeurPrevisionCopy;
                    if (prevValeur.length > 0 ) {
                        this.loading = true;
                    }
                }
            });

        this.store.pipe(select(selecteExerciceList)).pipe(takeUntil(this.destroy$))
            .subscribe((exerciceList: Exercice[]) => {
                this.ddExercice = [];
                if (exerciceList) {
                    exerciceList.forEach(e => {
                        this.ddExercice.push({value: e.id, label: e.annee.toString()});
                        this.exerciceList.push({...e});
                    });
                }
            });
        this.store.pipe(select(selecteCurrentExercice)).pipe(takeUntil(this.destroy$))
            .subscribe((exercice: Exercice) => {
                if (exercice) {
                    this.selectedExercice = {...exercice};
                    this.critere.exerciceId = this.selectedExercice.id;
                    this.loading = true;
                }
            });

        this.store.pipe(select(selecteReportPrintBytes)).pipe(takeUntil(this.destroy$))
            .subscribe((bytes: ArrayBuffer) => {
                if (bytes) {
                    if (this.isprinting) {
                        this.isprinting = false;
                        printByFormat(bytes, this.reportInput.reportFormat);
                        this.store.dispatch(SetPrintReport({reporteFile: null}));
                    }
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    exerciceChange() {
        this.loading = false;
        this.selectedExercice = this.exerciceList.find(value => value.id === this.critere.exerciceId);
        if (this.selectedExercice) {
            this.loading = true;
        }
    }

    search() {
        this.loading = false;
        this.store.dispatch(FetchPrevValeurByCritere(this.critere));
    }

    printReport() {
        this.reportInput.exerciceId = this.critere.exerciceId;
        this.reportInput.structureId = this.critere.structureId;
        this.isprinting = true;
        this.store.dispatch(PrintReport(this.reportInput));
    }
}
