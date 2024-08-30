import { Action, createReducer, on } from '@ngrx/store';
import {
    ClearAppState,
    SetCaracteristiqueList,
    SetCurentExercice,
    SetCurentProcess,
    SetDepartementList,
    SetExerciceList,
    SetFamilleList,
    SetIniSousFamilleList,
    SetLocaliteList,
    SetMouvementList,
    SetPrevisionList,
    SetPrevisionProcesList,
    SetPrevValeurByCritere,
    SetPrevValForModif,
    SetPrintReport,
    SetProvinceList,
    SetRegionList,
    SetSousFamilleList,
    SetStatus,
    SetStructureList,
    SetAcquisitionList,
    SetDetailMouvementList
} from '../action';
import { SysgeiAppState } from '../store.state';
import {
    CaracteristiqueList,
    DepartementList,
    Exercice,
    ExerciceList,
    FamilleList,
    LocaliteList,
    MouvementList,DetailMouvementList,
    PrevisionList, ProcessPrevision, ProcessPrevisionList,
    ProvinceList,
    RegionList,
    SousFamilleList,
    StructureList, ValeurPevisionList,AcquisitionList
} from '../../app.models';

export const initialState: SysgeiAppState = {
    statut: null,
    regionList: [],
    provinceList: [],
    departementList: [],
    familleList: [],
    sousFamilleList: [],
    caracteristiqueList: [],
    structureList: [],
    localiteList: [],
    previsionList: [],
    exerciceList: [],
    exercice: null,
    initialSousFamilleList: [],
    prevValForModifList: [],
    report: null,
    processPrevisionList: [],
    curentProcess: null,
    valeurPrevisionList: [],
    mouvementList: [],
    detailmouvementList: [],
    acquisitionList: []
};

const appReducers = createReducer(
    initialState,
    on(ClearAppState, () => {
        return null;
    }),
    on(SetStatus, (state, payload) => {
        return { ...state, statut: payload };
    }),
    on(SetRegionList, (state, payload: RegionList) => {
        return { ...state, regionList: payload.datas };
    }),
    on(SetProvinceList, (state, payload: ProvinceList) => {
        return { ...state, provinceList: payload.datas };
    }),
    on(SetDepartementList, (state, payload: DepartementList) => {
        return { ...state, departementList: payload.datas };
    }),
    on(SetFamilleList, (state, payload: FamilleList) => {
        return { ...state, familleList: payload.datas };
    })
    ,
    on(SetSousFamilleList, (state, payload: SousFamilleList) => {
        return { ...state, sousFamilleList: payload.datas };
    }),
    on(SetPrevisionList, (state, payload: PrevisionList) => {
        return { ...state, previsionList: payload.datas };
    }),
    on(SetExerciceList, (state, payload: ExerciceList) => {
        return { ...state, exerciceList: payload.datas };
    }),
    on(SetCurentExercice, (state, payload: Exercice) => {
        return { ...state, exercice: payload };
    }),
    on(SetCaracteristiqueList, (state, payload: CaracteristiqueList) => {
        return { ...state, caracteristiqueList: payload.datas };
    })
    ,
    on(SetStructureList, (state, payload: StructureList) => {
        return { ...state, structureList: payload.datas };
    })
    ,
    on(SetLocaliteList, (state, payload: LocaliteList) => {
        return { ...state, localiteList: payload.datas };
    }),
    on(SetIniSousFamilleList, (state, payload: ValeurPevisionList) => {
        return { ...state, initialSousFamilleList: payload.datas };
    }),
    on(SetPrevValForModif, (state, payload: ValeurPevisionList) => {
        return { ...state, prevValForModifList: payload.datas };
    }),
    on(SetPrintReport, (state, payload: any) => {
        return { ...state, report: payload.reporteFile};
    }),
    on(SetPrevisionProcesList, (state, payload: ProcessPrevisionList) => {
        return { ...state, processPrevisionList: payload.datas };
    }),
    on(SetCurentProcess, (state, payload: ProcessPrevision) => {
        return { ...state, curentProcess: payload };
    }),
    on(SetPrevValeurByCritere, (state, payload: ValeurPevisionList) => {
        return { ...state, valeurPrevisionList: payload.datas };
    }),
    on(SetMouvementList, (state, payload: MouvementList) => {
        return { ...state, mouvementList: payload.datas };
    }),
    on(SetAcquisitionList, (state, payload: AcquisitionList) => {
        return { ...state, acquisitionList: payload.datas };
    }),
    on(SetDetailMouvementList, (state, payload: DetailMouvementList) => {
        return { ...state, detailmouvementList: payload.datas };
    }),
    

);

export function appReducer(state: any | undefined, action: Action) {
    return appReducers(state, action);
}
