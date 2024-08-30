import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {GlobalConfig} from './global';
import {AppServices} from '../app.services';
import * as appActions from './action';
import {StatusEnum} from '../gloabal-message.config';

@Injectable()
export class AppEffect {
    private successMsg = 'Opération reussie !';

    // Region Effects
    fetchRegion$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<any>(appActions.FetchRegion),
            mergeMap(() =>
                this.appService.fetchRegion().pipe(
                    map(resp => appActions.SetRegionList(resp)),
                    catchError(error => of(error))
                )
            )
        );
    });
    createRegion$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.CreateRegion),
        mergeMap((payload) => this.appService.createRegion(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchRegion()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));
    updateRegion$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.UpdateRegion),
        mergeMap((payload) => this.appService.updateRegion(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchRegion()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));

    deleteRegion$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.DeleteRegion),
        mergeMap((payload) => this.appService.deleteRegion(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchRegion()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))

    ));

    /********************Les Effects pour les familles d'équipement******************/
    createFamille$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.CreateFamille),
        mergeMap((payload) => this.appService.createFamille(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchFamille()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));
    updateFamille$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.UpdateFamille),
        mergeMap((payload) => this.appService.updateFamille(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchFamille()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));

    deleteFamille$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.DeleteFamille),
        mergeMap((payload) => this.appService.deleteFamille(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchFamille()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))

    ));

    fetchFamille$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<any>(appActions.FetchFamille),
            mergeMap(() =>
                this.appService.fetchFamille().pipe(
                    map(resp => appActions.SetFamilleList(resp)),
                    catchError(error => of(error))
                )
            )
        );
    });

    /********************Les Effects pour les familles d'équipement******************/
    createSousFamille$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.CreateSousFamille),
        mergeMap((payload) => this.appService.createSousFamille(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchSousFamille()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));
    updateSousFamille$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.UpdateSousFamille),
        mergeMap((payload) => this.appService.updateSousFamille(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchSousFamille()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));

    deleteSousFamille$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.DeleteSousFamille),
        mergeMap((payload) => this.appService.deleteSousFamille(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchSousFamille()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))

    ));

    fetchSousFamille$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<any>(appActions.FetchSousFamille),
            mergeMap(() =>
                this.appService.fetchSousFamille().pipe(
                    map(resp => appActions.SetSousFamilleList(resp)),
                    catchError(error => of(error))
                )
            )
        );
    });

    // Effect of Province
    fetchProvince$ = createEffect(()=> {
            return this.actions$.pipe(
                ofType<any>(appActions.FetchProvince),
                mergeMap(() =>
                    this.appService.fetchProvince().pipe(
                        map(resp => appActions.SetProvinceList(resp)),
                        catchError(error =>of(error))
                    )
                )
            );
    });

    createProvince$ = createEffect(() => this.actions$.pipe(
            ofType(appActions.CreateProvince),
            mergeMap((payload) => this.appService.createProvince(payload.obj)
                .pipe(
                    switchMap(() => [
                        appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                        appActions.FetchProvince()
                    ]),
                    catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
    ));
    updateProvince$ = createEffect(() => this.actions$.pipe(
                ofType(appActions.UpdateProvince),
                mergeMap((payload) => this.appService.updateProvince(payload.obj)
                    .pipe(
                        switchMap(() => [
                            appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                            appActions.FetchProvince()
                        ]),
                        catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
    ));
    deleteProvince$ = createEffect(() => this.actions$.pipe(
                ofType(appActions.DeleteProvince),
                mergeMap((payload) => this.appService.deleteProvince(payload.obj)
                    .pipe(
                        switchMap(() => [
                            appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                            appActions.FetchProvince()
                        ]),
                        catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
     ));

    /********************Les Effects pour les caractéristiques d'équipement******************/
    createCaracteristique$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.CreateCaracteristique),
        mergeMap((payload) => this.appService.createCaracteristique(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchCaracteristique()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));
    updateCarateristique$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.UpdateCaracteristique),
        mergeMap((payload) => this.appService.updateCaracteristique(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchCaracteristique()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));

    deleteCaracteristique$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.DeleteCaracteristique),
        mergeMap((payload) => this.appService.deleteCaracteristique(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchCaracteristique()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))

    ));

    fetchCaracteristique$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<any>(appActions.FetchCaracteristique),
            mergeMap(() =>
                this.appService.fetchCaracteristique().pipe(
                    map(resp => appActions.SetCaracteristiqueList(resp)),
                    catchError(error => of(error))
                )
            )
        );
    });

    /********************Les Effects pour les structures administratives******************/
    createStructure$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.CreateStructure),
        mergeMap((payload) => this.appService.createStructure(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchStructure()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));
    updateStructure$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.UpdateStructure),
        mergeMap((payload) => this.appService.updateStructure(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchStructure()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));

    deleteStructure$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.DeleteStructure),
        mergeMap((payload) => this.appService.deleteStructure(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchStructure()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))

    ));

    fetchStructure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<any>(appActions.FetchStructure),
            mergeMap(() =>
                this.appService.fetchStructure().pipe(
                    map(resp => appActions.SetStructureList(resp)),
                    catchError(error => of(error))
                )
            )
        );
    });

    /********************Les Effects pour les localités administratives******************/
    createLocalite$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.CreateLocalite),
        mergeMap((payload) => this.appService.createLocalite(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchLocalite()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));
    updateLocalite$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.UpdateLocalite),
        mergeMap((payload) => this.appService.updateLocalite(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchLocalite()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));

    deleteLocalite$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.DeleteLocalite),
        mergeMap((payload) => this.appService.deleteLocalite(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchLocalite()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))

    ));

    fetchLocalite$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<any>(appActions.FetchLocalite),
            mergeMap(() =>
                this.appService.fetchLocalite().pipe(
                    map(resp => appActions.SetLocaliteList(resp)),
                    catchError(error => of(error))
                )
            )
        );
    });

    /********************Les Effects pour les départements administratives******************/
    createDepartement$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.CreateDepatement),
        mergeMap((payload) => this.appService.createDepartement(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchDepartement()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));
    updateDepartement$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.UpdateDepartement),
        mergeMap((payload) => this.appService.updateDepartement(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchDepartement()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));

    deleteDepartement$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.DeleteDepartement),
        mergeMap((payload) => this.appService.deleteDepartement(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchDepartement()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))

    ));

    fetchDepartement$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<any>(appActions.FetchDepartement),
            mergeMap(() =>
                this.appService.fetchDepartement().pipe(
                    map(resp => appActions.SetDepartementList(resp)),
                    catchError(error => of(error))
                )
            )
        );
    });

    /********************Les Effects la gestion des prévision******************/
    fetchPrevisionList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<any>(appActions.FetchPrevision),
            mergeMap(payload =>
                this.appService.fetchPrevision(payload).pipe(
                    map(resp => appActions.SetPrevisionList(resp)),
                    catchError(error => of(error))
                )
            )
        );
    });

    createPrevision$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.CreatePrevision),
        mergeMap((payload) => this.appService.createPrevision(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg})
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));
    updatePrevision$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.UpdatePrevision),
        mergeMap((payload) => this.appService.updatePrevision(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg})
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));

    deletePrevision$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.DeletePrevision),
        mergeMap((payload) => this.appService.deletePrevision(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg})
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))

    ));
    /********************Les Effects la gestion des prévision******************/
    // Exercice Effects
    fetchExercice$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<any>(appActions.FetchExerciceList),
            mergeMap(() =>
                this.appService.fetchExercice().pipe(
                    map(resp => appActions.SetExerciceList(resp)),
                    catchError(error => of(error))
                )
            )
        );
    });
    createExercice$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.CreateExercice),
        mergeMap((payload) => this.appService.createExercice(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchExerciceList()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));
    updateExercice$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.UpdateExercice),
        mergeMap((payload) => this.appService.updateExercice(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchExerciceList()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));

    deleteExercice$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.DeleteExercice),
        mergeMap((payload) => this.appService.deletExercice(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchExerciceList()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));

    closeExercice$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.DeleteExercice),
        mergeMap((payload) => this.appService.closeExercice(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchExerciceList()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));

    // Exercice Effects
    activateExercice$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.DeleteExercice),
        mergeMap((payload) => this.appService.activeExercice(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchExerciceList()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));
    fetchIniSousFamilleList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<any>(appActions.FetchSousFamilleInit),
            mergeMap(() =>
                this.appService.fetchIniSousFamilleList().pipe(
                    map(resp => appActions.SetIniSousFamilleList(resp)),
                    catchError(error => of(error))
                )
            )
        );
    });

    fetchPrevValForModif$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<any>(appActions.FetchPrevValForModif),
            mergeMap(payload =>
                this.appService.fetchPrevValForModif(payload).pipe(
                    map(resp => appActions.SetPrevValForModif(resp)),
                    catchError(error => of(error))
                )
            )
        );
    });
    deleteDetailPrevision$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<any>(appActions.DeleteDetailPrevision),
            mergeMap(payload =>
                this.appService.deletDetailPrevision(payload).pipe(
                    switchMap(() => [
                        appActions.SetStatus({status: StatusEnum.success, message: this.successMsg})
                    ]),
                    catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        );
    });

    WorkflowNext$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<any>(appActions.WorkflowNext),
            mergeMap(payload =>
                this.appService.worflowNext(payload).pipe(
                    switchMap(() => [
                        appActions.SetStatus({status: StatusEnum.success, message: this.successMsg})
                    ]),
                    catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        );
    });

    reportPrintEffets$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<any>(appActions.PrintReport),
            mergeMap(payload =>
                this.appService.printReport(payload).pipe(
                    map(resp => appActions.SetPrintReport({reporteFile: resp})),
                    catchError(error => of(error))
                )
            )
        );
    });

    /********************Les Effects la gestion des prévision******************/
        // Exercice Effects
    FetchPrevisionProcesList = createEffect(() => {
        return this.actions$.pipe(
            ofType<any>(appActions.FetchPrevisionProcesList),
            mergeMap(() =>
                this.appService.fetchPrevisionProcesList().pipe(
                    map(resp => appActions.SetPrevisionProcesList(resp)),
                    catchError(error => of(error))
                )
            )
        );
    });
    OuvrirePrevisionProces$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.OuvrirePrevisionProces),
        mergeMap((payload) => this.appService.ouvrirePrevisionProces(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchPrevisionProcesList()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));
    AnnulerPrevisionProces$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.AnnulerPrevisionProces),
        mergeMap((payload) => this.appService.annulerPrevisionProces(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchPrevisionProcesList()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));

    ClorePrevisionProces$ = createEffect(() => this.actions$.pipe(
        ofType(appActions.ClorePrevisionProces),
        mergeMap((payload) => this.appService.clorePrevisionProces(payload.obj)
            .pipe(
                switchMap(() => [
                    appActions.SetStatus({status: StatusEnum.success, message: this.successMsg}),
                    appActions.FetchPrevisionProcesList()
                ]),
                catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));

    FetchPrevValeurByCritere$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<any>(appActions.FetchPrevValeurByCritere),
            mergeMap(payload =>
                this.appService.fetchPrevValeurByCritere(payload).pipe(
                    map(resp => appActions.SetPrevValeurByCritere(resp)),
                    catchError(error => of(error))
                )
            )
        );
    });

    /********************Les Effects la gestion des mouvements******************/
    fetchMouvementList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(appActions.FetchMouvement),
            mergeMap(() =>
                this.appService.fetchMouvement().pipe(
                    map(resp => appActions.SetMouvementList(resp)),
                    catchError(error => of(error))
                )
            )
        );
    });

createMouvement$ = createEffect(() => this.actions$.pipe(
    ofType(appActions.CreateMouvement),
    mergeMap((payload) => this.appService.createMouvement(payload.obj)
        .pipe(
            switchMap(() => [
                appActions.SetStatus({ status: StatusEnum.success, message: this.successMsg }),
                appActions.FetchMouvement()
            ]),
            catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        ))
));

updateMouvement$ = createEffect(() => this.actions$.pipe(
    ofType(appActions.UpdateMouvement),
    mergeMap((payload) => this.appService.updateMouvement(payload.obj)
        .pipe(
            switchMap(() => [
                appActions.SetStatus({ status: StatusEnum.success, message: this.successMsg }),
                appActions.FetchMouvement()
            ]),
            catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        ))
));

deleteMouvement$ = createEffect(() => this.actions$.pipe(
    ofType(appActions.DeleteMouvement),
    mergeMap((payload) => this.appService.deleteMouvement(payload.obj)
        .pipe(
            switchMap(() => [
                appActions.SetStatus({ status: StatusEnum.success, message: this.successMsg }),
                appActions.FetchMouvement()
            ]),
            catchError((error) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        ))
));

    constructor(
        private actions$: Actions,
        private appService: AppServices) {}
}
