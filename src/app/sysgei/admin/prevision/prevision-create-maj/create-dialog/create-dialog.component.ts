import {Component, OnDestroy, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {
    DetailPrevisions,
    Exercice,
    Prevision,
    Structure,
    TableColumn,
    ValeurPevision
} from '../../../../../config/app.models';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {
    selecteinitialSousFamilleList,
    selecteprevValForModif,
    selecteStatut,
    selecteStructureList
} from '../../../../../config/store/selector';
import {State, Status} from '../../../../../config/store/reducers';
import {takeUntil} from 'rxjs/operators';
import {
    CreatePrevision,
    DeleteDetailPrevision,
    FetchPrevValForModif, FetchSousFamilleInit,
    FetchStructure,
    SetPrevValForModif,
    UpdatePrevision
} from '../../../../../config/store/action';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {messageShow, StatusEnum} from '../../../../../config/gloabal-message.config';
import {deepCopy} from '../../../../../config/utils';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit, OnDestroy {
    destroy$: Subject<boolean> = new Subject<boolean>();
    statusObj$: Observable<Status>;
    newPrevison: Prevision;
    newDetailPrevision: DetailPrevisions;
    formGroup: UntypedFormGroup;
    cols: any[] = [];
    tableSfCols: any[];
    listValeurPrevision: ValeurPevision[] = [];
    disPlayAddSf: boolean;

    soufamilleList: Array<ValeurPevision> = [];
    selectedFamilleList: Array<ValeurPevision> = [];

    position = 'top';
    currentExercice: Exercice;
    selecstructure: Structure;
    structureList: Structure[];
    ddStrcuture: SelectItem[] = [];
    prevision: Prevision;
    isAdding: boolean;
    consultation: boolean;

    // juste for the test !!!!!!!!!!!

    constructor(public ref: DynamicDialogRef, protected store: Store<State>,
                public config: DynamicDialogConfig, protected messageService: MessageService,
                protected fb: UntypedFormBuilder, private confirmationService: ConfirmationService ) {
        this.tableSfCols = [
            {field: 'libelleSousFamille', header: 'Sous Famille', type: 'string', filter: true, width: '60%'}
        ];
        this.currentExercice = config.data.exercice;
        this.prevision = deepCopy(config.data.prevision);
        this.consultation = config.data.consultation;

        this.formGroup = this.fb.group({
            id: [],
            reference: [],
            designation: [],
            structureId: ['', Validators.compose([Validators.required])],
            exerciceId: []
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    ngOnInit(): void {
        this.statusObj$ = this.store.pipe(select(selecteStatut));
        this.store.dispatch(SetPrevValForModif({datas: []}));
        this.store.dispatch(FetchStructure());
        this.store.dispatch(FetchSousFamilleInit());
        if (this.prevision) {
            this.store.dispatch(FetchPrevValForModif(this.prevision));
            this.formGroup.patchValue(this.prevision);
            this.formGroup.enable();
            if (this.consultation) {
                this.formGroup.get('structureId').disable();
            }
        } else {
            this.listValeurPrevision = [];
        }
        this.store.pipe(select(selecteinitialSousFamilleList)).pipe(takeUntil(this.destroy$))
            .subscribe((niSfList: ValeurPevision[]) => {
                this.soufamilleList = [];
                if (niSfList) {
                    niSfList.forEach(sf => this.soufamilleList.push({...sf}));
                }
            });

        this.store.pipe(select(selecteStructureList)).pipe(takeUntil(this.destroy$))
            .subscribe((structureList: Structure[]) => {
                this.structureList = [];
                this.ddStrcuture = [];
                if (structureList) {
                    structureList.forEach(sf => this.ddStrcuture.push({
                        label: sf.codeStruct + ' ' + sf.libelleCourt + ' - ' + sf.libelleLong,
                        value: sf.id
                    }));
                }
            });

        this.store.pipe(select(selecteprevValForModif)).pipe(takeUntil(this.destroy$))
            .subscribe((prevValeur: ValeurPevision[]) => {
                this.listValeurPrevision = [];
                if (prevValeur) {
                    prevValeur.forEach(s => this.listValeurPrevision.push({...s, old: true}));

                }
            });

        this.checkStatus();
    }

    checkStatus() {
        this.statusObj$.pipe(takeUntil(this.destroy$))
            .subscribe(statusObj => {
                if (statusObj) {
                    if (statusObj.status === StatusEnum.success) {
                        // messageShow(statusObj.status, null, statusObj.message, this.messageService);
                        if (this.isAdding) {
                            this.isAdding = false;
                            this.hidDialog();
                        }
                    }
                }
            });
    }

    dialogAddSousFamille() {
        this.disPlayAddSf = true;
    }

    hidDialog() {
        this.ref.close();
    }

    deleteRow(rowData) {
        if (rowData) {
            this.listValeurPrevision = this.listValeurPrevision
                .filter(v => v.idSousfamille !== rowData.idSousfamille);
            if (rowData?.old && this.prevision?.id) {
                this.store.dispatch(DeleteDetailPrevision({
                    sousFamilleId: rowData.idSousfamille,
                    previsionId: this.prevision.id
                }))
            }
        }
    }

    onClose() {
        this.ref.close(true);
    }

    save() {
       this.confirmationService.confirm({
           header: 'CONFIRMATION',
           message: 'Voulez vous vraiment enregistrer cette prévision ?',
           accept: () => {
               this.isAdding = true;
               const prevision: Prevision = {...this.formGroup.value};
               prevision.detailPrevisions = this.buildPrevToSave();
               if (prevision.id != null) {
                   this.store.dispatch(UpdatePrevision({obj: prevision}));
               } else {
                   prevision.exerciceId = this.currentExercice.id;
                   this.store.dispatch(CreatePrevision({obj: prevision}));
               }
           }
       });
    }

    buildPrevToSave(): DetailPrevisions[] {
        let detailPrev: DetailPrevisions[] = [];
        const an = this.currentExercice.annee;
        this.listValeurPrevision.forEach(lp => {
            for (let a = 0; a <= 2; a++) {
                detailPrev.push({
                    annee: an + a,
                    quantite: lp['valAnne' + a],
                    sousFamilleId: lp.idSousfamille
                })
            }
        });
        return detailPrev;
    }

}
