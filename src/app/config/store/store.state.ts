import {Status} from './reducers';
import {
    Caracteristique,
    Departement,
    Exercice,
    Famille,
    Localite,
    Prevision, ProcessPrevision,
    Province,
    Region,
    SousFamille,
    Structure, ValeurPevision,Mouvement
} from '../app.models';

export interface SysgeiAppState {
    [x: string]: any;
    statut: Status;
    regionList: Array<Region>;
    provinceList: Array<Province>;
    familleList: Array<Famille>;
    sousFamilleList: Array<SousFamille>;
    previsionList: Array<Prevision>;
    exerciceList: Array<Exercice>;
    exercice: Exercice;
    caracteristiqueList: Array<Caracteristique>;
    structureList: Array<Structure>;
    localiteList: Array<Localite>;
    departementList: Array<Departement>;
    initialSousFamilleList: Array<ValeurPevision>,
    prevValForModifList: Array<ValeurPevision>,
    report: ArrayBuffer,
    processPrevisionList: Array<ProcessPrevision>,
    curentProcess: ProcessPrevision,
    valeurPrevisionList: Array<ValeurPevision>,
    mouvementList: Array<Mouvement>,
    

}
