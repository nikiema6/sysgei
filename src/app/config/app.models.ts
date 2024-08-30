import { EReportType, ReportFormat } from './utils';

export interface FormGroupColumn {
    field: string;
    type: string;
    header: string;
    visible: boolean;
    required: boolean;
    optionLabel?: string;
    dropdownList?: any[];
    fileNb?: number;
    preview?: string;
    key?: string;
    readonly?: boolean;
}

export interface TableColumn {
    field: string;
    type: string;
    header: string;
    filter: boolean;
    sort?: boolean;
    optionLabel?: string;
    labelTrue?: string;
    labelFalse?: string;
    width?: string;
    compute?: boolean;
    input?: boolean;
}

export interface DropdownSelector {
    action?: any; // [Optional] define an select action when you need to get the data from the database
    selector?: any;
    optionLabel?: any;
    key?: any;
    field: string;
    dropdownEntries?: any[];
}

export interface DropdownData {
    data?: Array<DropdownSelector>;
}

export interface MultiSelectSelector {
    action?: any; // [Optional] define an select action when you need to get the data from the database
    selector?: any;
    field: string;
    optionLabel?: string;
    multiselectEntries: any[];
}

export interface ReportingInput {
    reportFormat: ReportFormat;
    reportType: EReportType;
    page: number;
    numeroExercice?: number;
    exerciceId?: number;
    previsionId?: number;
    ville?: string;
    etape?: EtapeWorkflow
    structureId?: number
}

export interface Region {
    id?: number;
    codeRegion?: string;
    libelle?: string;
}
export  interface Province {
    id?: number;
    codeProvince?: string;
    libelleRegion?: string;
    libelle?: string;
    regionId?: number;
}

export interface ProvinceList {
    datas: Array<Province>
}

export interface RegionList {
    datas: Array<Region>
}

export interface Prevision {
    id?: number;
    reference?: string;
    designation?: string;
    structureId?: number;
    libelleStructure?: string;
    exerciceId?: number;
    detailPrevisions?: Array<DetailPrevisions>
}

export interface DetailPrevisions {
    id?: number;
    quantite?: number;
    annee?: number;
    previsionId?: number;
    sousFamilleId?: number;
}

export interface Famille {
    id?: number;
    codeFamille?: string;
    libelle?: string;
}

export interface FamilleList {
    datas: Array<Famille>
}

export interface SousFamille {
    id?: number;
    codeSousFamille?: string;
    libelle?: string;
    familleId?: number;
}

export interface SousFamilleList {
    datas: Array<SousFamille>
}

export interface Caracteristique {
    id?: number;
    codeCaracteristique?: string;
    libelle?: string;
}

export interface CaracteristiqueList {
    datas: Array<Caracteristique>;
}

export interface Structure {
    id?: number
    libelleCourt?: string;
    libelleLong?: string;
    codeStruct?: string;
    localiteId?: number;
    libelleLocalite?: string;
}

export interface StructureList {
    datas: Array<Structure>
}

export interface Localite {
      id?: number;
      codeLocalite?: string;
      libelle?: string;
      departementId?: number;
}

export interface LocaliteList {
    datas: Array<Localite>;
}

export  interface Departement {
     id?: number;
    codeDept?: string;
    libelle?: string;
    provinceId?: number;
}
export interface DepartementList {
    datas: Array<Departement>;

}

export  interface ValeurPevision {
    idStructure?: number;
    idPrevisison?: number;
    idSousfamille: number,
    libelleFamille?: string,
    libelleSousFamille?: string,
    old?: boolean,
    valAnne0?: number,
    valAnne1?: number,
    valAnne2?: number,
}

export  interface ValeurPevisionList {
    datas: Array<ValeurPevision>
}

export interface PrevisionList {
    datas: Array<Prevision>
}

export interface Exercice {
    id?: number;
    annee?: number;
    dateDebut?: Date;
    dateFin?: Date;
    dateClose?: Date;
    current?: boolean;
}

export interface ExerciceList {
    datas: Array<Exercice>;
}

export enum TypeStorage {
    EXERCICE = 'EXERCICE'
}

export enum EtapeWorkflow {
    INIT = 'INIT',
    SOUMIS = 'SOUMIS',
    VALIDE = 'VALIDE',
    REJETE = 'REJETE'
}

export interface Critere {
    exerciceId?: number,
    structureId?: number
    etape?: EtapeWorkflow

}

export interface WorkflowData {
    previsionList: Array<Prevision>,
    etapeWorkflow: EtapeWorkflow
}

export interface ProcessPrevision {
    id?: number,
    libelle?: string,
    dateDebut?: Date,
    dateFin?: Date,
    etat?: EtapeProcessPrev
}

export interface ProcessPrevisionList {
    datas: Array<ProcessPrevision>
}

export enum EtapeProcessPrev {
    OUVERT = 'OUVERT', FERMER = 'FERMER',
}
export interface Mouvement {
    [x: string]: any;
    id?: number;
    motif?: string;
    typemouvement?: string;
    structureId?: number;

}

export interface MouvementList {
  datas: Array<Mouvement>;
}
export interface DetailMouvement {
    idMouvement?: number;
    idAcquisition?: number;
    // Autres propriétés du détail du mouvement
  }

  export interface Equipement {
    [x: string]: any;
    id?: number;
    infocaracacteristique: string; // Propriété pour les informations de caractéristiques
    quantite: number; // Propriété pour la quantité
    Idcaracacteristique?: number; // Propriété pour l'ID de caractéristique
    Idacquisition?: number; // Propriété pour l'ID d'acquisition
    idsoufamille?: number; // Propriété pour l'ID de sous-famille
    // Autres propriétés de l'équipement
  }
  export interface DetailMouvementList {
    datas: Array<DetailMouvement>;
  }
  export interface Acquisition {
    libelle: any;
    [x: string]: any;
    id?: number;
    equipements: Equipement[]; // Vérifiez que cette propriété existe
    // Autres propriétés de l'acquisition
  }
  export interface AcquisitionList {
    datas: Array<Acquisition >;
  }

