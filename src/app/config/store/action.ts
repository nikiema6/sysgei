import {createAction, props} from '@ngrx/store';
import {
    Exercice, ExerciceList,
    Caracteristique,
    CaracteristiqueList,
    Famille,
    FamilleList,
    Localite,
    LocaliteList,
    Prevision,
    PrevisionList,
    Region,
    RegionList,
    SousFamille,
    SousFamilleList,
    Structure,
    StructureList,
    Province,
    Mouvement,
    MouvementList,
    ProvinceList,
    DepartementList,
    Departement,
    ValeurPevisionList,
    Acquisition,
    AcquisitionList,
    Critere, WorkflowData, ReportingInput, ProcessPrevision,
    DetailMouvement
} from '../app.models';
import {Status} from './reducers';

export const SetStatus = createAction('[Status] Set Status', props<Status>());
export const ClearAppState = createAction('[app-state] Clear app-state');

// ******************************* Les action des region *********************************/
export const SetRegionList = createAction('[RegionList] Set RegionList', props<RegionList>());
export const FetchRegion = createAction('[RegionList] Fetch RegionList');
export const CreateRegion = createAction('[Region] Create Region', props<{ obj: Region}>());
export const UpdateRegion = createAction('[Region] Update Region', props<{ obj: Region}>());
export const DeleteRegion = createAction('[Region] Delete Region', props<{ obj: Region}>());

// ******************************* Les action de familles d'équipement *********************************/
export const SetFamilleList = createAction('[FamilleList] Set FamilleList', props<FamilleList>());
export const FetchFamille = createAction('[FamilleList] Fetch FamilleList');
export const CreateFamille = createAction('[Famille] Create Famille', props<{ obj: Famille}>());
export const UpdateFamille = createAction('[Famille] Update Famille', props<{ obj: Famille}>());
export const DeleteFamille = createAction('[Famille] Delete Famille', props<{ obj: Famille}>());

// ******************************* Les action de sous familles d'équipement *********************************/
export const SetSousFamilleList = createAction('[SousFamilleList] Set SousFamilleList', props<SousFamilleList>());
export const FetchSousFamille = createAction('[SousFamilleList] Fetch SousFamilleList');
export const CreateSousFamille = createAction('[SousFamille] Create SousFamille', props<{ obj: SousFamille}>());
export const UpdateSousFamille = createAction('[SousFamille] Update SousFamille', props<{ obj: SousFamille}>());
export const DeleteSousFamille = createAction('[SousFamille] Delete SousFamille', props<{ obj: SousFamille}>());

// ******************************Les actions de Province *********************************/
export const SetProvinceList = createAction('[ProvinceList] Set ProvinceList', props<ProvinceList>());
export const FetchProvince = createAction('[ProvinceList] Fetch ProvinceList');
export const CreateProvince = createAction('[Province] Create Province', props<{ obj: Province}>());
export const UpdateProvince = createAction('[Province] Update Province', props<{ obj: Province}>());
export const DeleteProvince = createAction('[Province] Delete Province', props<{ obj: Province}>());

/****************** Departements***********************/
export const SetDepartementList = createAction('[DepartementList] Set Departement', props<DepartementList>());
export const FetchDepartement = createAction('[DepartementList] Fetch DepartementList');
export const CreateDepatement = createAction('[DepartementList] Create DepartementList', props<{ obj: Departement}>());
export const UpdateDepartement = createAction('[DepartementList] Update DepartementList', props<{ obj: Departement}>());
export const DeleteDepartement = createAction('[DepartementList] Delete DepartementList', props<{ obj: Departement}>());

// ******************************* Les action des caractéristique d'équipement *********************************/
export const SetCaracteristiqueList = createAction('[CaracteristiqueList] Set CaracteristiqueList', props<CaracteristiqueList>());
export const FetchCaracteristique = createAction('[CaracteristiqueList] Fetch CaracteristiqueList');
export const CreateCaracteristique = createAction('[Caracteristique] Create Caracteristique', props<{ obj: Caracteristique}>());
export const UpdateCaracteristique = createAction('[Caracteristique] Update Caracteristique', props<{ obj: Caracteristique}>());
export const DeleteCaracteristique = createAction('[Caracteristique] Delete Caracteristique', props<{ obj: Caracteristique}>());

// ******************************* Les action des structures administrativest *********************************/
export const SetStructureList = createAction('[StructureList] Set StructureList', props<StructureList>());
export const FetchStructure = createAction('[StructureList] Fetch StructureList');
export const CreateStructure = createAction('[Structure] Create Structure', props<{ obj: Structure}>());
export const UpdateStructure = createAction('[Structure] Update Structure', props<{ obj: Structure}>());
export const DeleteStructure = createAction('[Structure] Delete Structure', props<{ obj: Structure}>());

// ******************************* Les action des localités administratives *********************************/
export const SetLocaliteList = createAction('[LocaliteeList] Set LocaliteList', props<LocaliteList>());
export const FetchLocalite = createAction('[LocaliteList] Fetch LocaliteList');
export const CreateLocalite = createAction('[Localite] Create Localite', props<{ obj: Localite}>());
export const UpdateLocalite = createAction('[Localite] Update Localite', props<{ obj: Localite}>());
export const DeleteLocalite = createAction('[Localite] Delete Localite', props<{ obj: Localite}>());

// ******************************* Les action de previsions *********************************/
export const SetPrevisionList = createAction('[previsionList] Set previsionList', props<PrevisionList>());
export const FetchPrevision = createAction('[previsionList] Fetch previsionList', props<Critere>());
export const CreatePrevision = createAction('[prevision] Create prevision', props<{ obj: Prevision}>());
export const UpdatePrevision = createAction('[prevision] Update prevision', props<{ obj: Prevision}>());
export const DeletePrevision = createAction('[prevision] Delete prevision', props<{ obj: Prevision}>());
export const SetIniSousFamilleList = createAction('[IniSousFamilleList] Set IniSousFamilleList',
    props<ValeurPevisionList>());
export const FetchSousFamilleInit = createAction('[SousFamille] Init SousFamille');
export const FetchPrevValForModif = createAction('[PRevValueFor] ForUpdate PRevValueFor',
    props<Prevision>());
export const SetPrevValForModif = createAction('[PRevValueFor] Set PRevValueFor',
    props<ValeurPevisionList>());



// ******************************* Les action de Exercice *********************************/
export const CreateExercice = createAction('[CreateExercice] Create CreateExercice', props<{ obj: Exercice}>());
export const SetExerciceList = createAction('[ExerciceList] Set ExerciceList', props<ExerciceList>());
export const UpdateExercice = createAction('[UpdateExercice] Update UpdateExercice', props<{ obj: Exercice}>());
export const ActivateExercice = createAction('[UpdateExercice] Active UpdateExercice', props<{ obj: Exercice}>());
export const DeleteExercice = createAction('[UpdateExercice] DELETE UpdateExercice', props<{ obj: Exercice}>());
export const FetchExerciceList = createAction('[ExerciceList] Fetch ExerciceList');
export const SetCurentExercice = createAction('[CurrentExercice] Set CurrentExercice', props<Exercice>());

// ******************************* Les action de DetailPrevision *********************************/
export const DeleteDetailPrevision = createAction('[DetailPrevision] Delete DetailPrevision',
    props<{sousFamilleId: number, previsionId: number}>());
export const WorkflowNext = createAction('[WorkflowNext] Workflow WorkflowNext',
    props<WorkflowData>());
// ******************************* Les action de report *********************************/
export const PrintReport = createAction('[PrintReport] Print PrintReport',
    props<ReportingInput>());
export const SetPrintReport  = createAction('[PrintReport] Set PrintReport',
    props<{reporteFile: ArrayBuffer}>());

// ******************************* Les action de ProcessPrevision *********************************/
export const OuvrirePrevisionProces = createAction('[PrevisionProces] Open PrevisionProces', props<{ obj: ProcessPrevision}>());
export const FetchPrevisionProcesList = createAction('[PrevisionProcesList] Fetch PrevisionProcesList');
export const SetPrevisionProcesList = createAction('[PrevisionProcesList] Set PrevisionProcesList', props<PrevisionList>());
export const AnnulerPrevisionProces = createAction('[PrevisionProces] Annuler PrevisionProces', props<{ obj: ProcessPrevision}>());
export const ClorePrevisionProces = createAction('[PrevisionProces] Clore PrevisionProces', props<{ obj: ProcessPrevision}>());
export const SetCurentProcess = createAction('[CurentProcess] Set CurentProcess', props<ProcessPrevision>());
//*****************************************************************************************************/
export const SetPrevValeurByCritere = createAction('[PrevValeurByCritere] Set PrevValeurByCritere',
    props<ValeurPevisionList>());
export const FetchPrevValeurByCritere = createAction('[PrevValeurByCritere] Fetch PrevValeurByCritere',
    props<Critere>());

    // ******************************Les actions de Mouvement *********************************/
export const SetMouvementList = createAction('[MouvementList] Set MouvementList', props<MouvementList>());
export const FetchMouvement = createAction('[MouvementList] Fetch MouvementList');
export const CreateMouvement= createAction('[Mouvement] Create Mouvement', props<{ obj: Mouvement}>());
export const UpdateMouvement = createAction('[Mouvement] Update Mouvement', props<{ obj: Mouvement}>());
export const DeleteMouvement = createAction('[Mouvement] Delete Mouvement', props<{ obj: Mouvement}>());

export const FetchDetailMouvement = createAction('[DetailMouvement] Fetch DetailMouvement', props<{ acquisitionId: number, mouvementId: number }>());
export const SetDetailMouvement = createAction('[DetailMouvement] Set DetailMouvement', props<DetailMouvement>());

export const FetchAcquisitionList = createAction('[Acquisition] Fetch Acquisition List');

// Vérifiez si cette ligne existe et est correcte


export const FetchMouvementList = createAction(
  '[Mouvement] Fetch Mouvement List'
);
export const SetAcquisitionList = createAction(
  '[Acquisition] Set Acquisition List',
  props<{ datas: Acquisition[] }>()
);
export const SetDetailMouvementList = createAction(
  '[DetailMouvement] Set Detail Mouvement List',
  props<{ datas: DetailMouvement[] }>()
);
export const FetchDetailMouvementList = createAction(
    '[DetailMouvement] Fetch Detail Mouvement List'
  );
export const DeleteAcquisition = createAction(
  '[Acquisition] Delete Acquisition',
  props<{ id: number }>()
);