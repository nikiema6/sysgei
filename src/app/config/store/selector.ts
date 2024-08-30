import {State} from './reducers';

export const selecteStatut = (state: State) => state.sysgeiAppState.statut;
export const selecteRegionList = (state: State) => state.sysgeiAppState.regionList;
export const selecteProvinceList = (state: State) => state.sysgeiAppState.provinceList;
export const selecteFamilleList = (state: State) => state.sysgeiAppState.familleList;
export const selecteSousFamilleList = (state: State) => state.sysgeiAppState.sousFamilleList;
export const selecteCaracteristiqueList = (state: State) => state.sysgeiAppState.caracteristiqueList;
export const selecteStructureList = (state: State) => state.sysgeiAppState.structureList;
export const selecteLocaliteList = (state: State) => state.sysgeiAppState.localiteList;
export const selecteDepartementList = (state: State) => state.sysgeiAppState.departementList;
export const selectePevisionList = (state: State) => state.sysgeiAppState.previsionList;
export const selecteExerciceList = (state: State) => state.sysgeiAppState.exerciceList;
export const selecteCurrentExercice = (state: State) => state.sysgeiAppState.exercice;
export const selecteinitialSousFamilleList = (state: State) => state.sysgeiAppState.initialSousFamilleList;
export const selecteprevValForModif = (state: State) => state.sysgeiAppState.prevValForModifList;
export const selecteReportPrintBytes = (state: State) => state.sysgeiAppState.report;
export const selecteProcessPrevision = (state: State) => state.sysgeiAppState.processPrevisionList;
export const selecteCurentProcess = (state: State) => state.sysgeiAppState.curentProcess;
export const selecteValPrevisionByCriteria = (state: State) => state.sysgeiAppState.valeurPrevisionList;
export const selecteMouvementList = (state: State) => state.sysgeiAppState.mouvementList;
export const selecteAcquisitionList = (state: State) => state.sysgeiAppState.acquisitionList;
export const selecteDetailMouvementList = (state: State) => state.sysgeiAppState.detailmouvementList;

