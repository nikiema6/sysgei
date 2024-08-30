import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    Caracteristique,
    CaracteristiqueList,
    Departement,
    DepartementList,
    Exercice,
    ExerciceList,
    Famille,
    FamilleList, PrevisionList,
    Localite,
    Mouvement,
    LocaliteList,
    Region, RegionList, ReportingInput, SousFamille, SousFamilleList, Structure, StructureList,
    Province, ProvinceList, ValeurPevisionList, Prevision, WorkflowData, ProcessPrevisionList, ProcessPrevision,
    MouvementList,
} from './app.models';
import { AppEndpoint } from './app.endpoint';
import { Observable } from 'rxjs';
import {createAction} from '@ngrx/store';
import {createRequestOption} from './utils';
import {ex} from '@fullcalendar/core/internal-common';

@Injectable({
    providedIn: 'root',
})
export class AppServices {

    constructor(protected http: HttpClient) { }

    public printReport(data: ReportingInput): Observable<ArrayBuffer> {
        return this.http.post(AppEndpoint.REPORTING_URL, data, { responseType: 'arraybuffer' });
    }

    public createRegion(region: Region): Observable<Region> {
        return this.http.post<Region>(AppEndpoint.REGION_URL, region);
    }

    public updateRegion(region: Region): Observable<Region> {
        return this.http.put<Region>(AppEndpoint.REGION_URL, region);
    }

    public deleteRegion(region: Region): Observable<Region> {
        return this.http.patch<Region>(`${AppEndpoint.REGION_URL}/${region.id}`, null);
    }

    public fetchRegion(): Observable<RegionList> {
        return this.http.get<RegionList>(AppEndpoint.REGION_URL);
    }
    /*** Services de Province ****/
    public createProvince(province: Province): Observable<Province> {
        return this.http.post<Province>(AppEndpoint.PROVINCE_URL, province);
    }

    public updateProvince(province: Province): Observable<Province> {
        return this.http.put<Province>(AppEndpoint.PROVINCE_URL, province);
    }

    public deleteProvince(province: Province): Observable<Province> {
        return this.http.patch<Province>(`${AppEndpoint.PROVINCE_URL}/${province.id}`, null);
    }

    public fetchProvince(): Observable<ProvinceList> {
        return this.http.get<ProvinceList>(AppEndpoint.PROVINCE_URL);
    }

    /****** Services Departement ***/
    public createDepartement(departement: Departement): Observable<Departement> {
        return this.http.post<Departement>(AppEndpoint.DEPARTEMENT_URL, departement);
    }
    public updateDepartement(departement: Departement): Observable<Departement> {
        return this.http.put<Departement>(AppEndpoint.DEPARTEMENT_URL, departement);
    }
    public deleteDepartement(departement: Departement): Observable<Departement> {
        return this.http.patch<Departement>(`${AppEndpoint.DEPARTEMENT_URL}/${departement.id}`, null);;
    }
    public fetchDepartement(): Observable<DepartementList> {
        return this.http.get<ProvinceList>(AppEndpoint.DEPARTEMENT_URL);
    }

    /**********************Les services de gestion de la famille des équipement*****************/
    public createFamille(famille: Famille): Observable<Famille> {
        return this.http.post<Famille>(AppEndpoint.FAMILLE_URL, famille);
    }

    public updateFamille(famille: Famille): Observable<Famille> {
        return this.http.put<Famille>(AppEndpoint.FAMILLE_URL, famille);
    }

    public deleteFamille(famille: Famille): Observable<Famille> {
        return this.http.patch<Famille>(`${AppEndpoint.FAMILLE_URL}/${famille.id}`, null);
    }

    public fetchFamille(): Observable<FamilleList> {
        return this.http.get<FamilleList>(AppEndpoint.FAMILLE_URL);
    }

    /**********************Les services de gestion de la sous famille des équipement*****************/
    public createSousFamille(sousFamille: SousFamille): Observable<SousFamille> {
        return this.http.post<SousFamille>(AppEndpoint.SOUS_FAMILLE_URL, sousFamille);
    }

    public updateSousFamille(sousFamille: Famille): Observable<SousFamille> {
        return this.http.put<SousFamille>(AppEndpoint.SOUS_FAMILLE_URL, sousFamille);
    }

    public deleteSousFamille(sousFamille: SousFamille): Observable<SousFamille> {
        return this.http.patch<SousFamille>(`${AppEndpoint.SOUS_FAMILLE_URL}/${sousFamille.id}`, null);
    }

    public fetchSousFamille(): Observable<SousFamilleList> {
        return this.http.get<SousFamilleList>(AppEndpoint.SOUS_FAMILLE_URL);
    }

    /**********************Les services de gestion des caractéristiques des équipement*****************/
    public createCaracteristique(caracteristique: Caracteristique): Observable<Caracteristique> {
        return this.http.post<Caracteristique>(AppEndpoint.CARACTERISTIQUE_URL, caracteristique);
    }

    public updateCaracteristique(caracteristique: Caracteristique): Observable<Caracteristique> {
        return this.http.put<Caracteristique>(AppEndpoint.CARACTERISTIQUE_URL, caracteristique);
    }

    public deleteCaracteristique(caracteristique: Caracteristique): Observable<Caracteristique> {
        return this.http.patch<Caracteristique>(`${AppEndpoint.CARACTERISTIQUE_URL}/${caracteristique.id}`, null);
    }

    public fetchCaracteristique(): Observable<CaracteristiqueList> {
        return this.http.get<CaracteristiqueList>(AppEndpoint.CARACTERISTIQUE_URL);
    }

    /**********************Les services de gestion des strucutures administratives*****************/
    public createStructure(structure: Structure): Observable<Structure> {
        return this.http.post<Structure>(AppEndpoint.STRUCTURE_URL, structure);
    }

    public updateStructure(structure: Structure): Observable<Structure> {
        return this.http.put<Structure>(AppEndpoint.STRUCTURE_URL, structure);
    }

    public deleteStructure(structure: Structure): Observable<Structure> {
        return this.http.patch<Structure>(`${AppEndpoint.STRUCTURE_URL}/${structure.id}`, null);
    }

    public fetchStructure(): Observable<StructureList> {
        return this.http.get<StructureList>(AppEndpoint.STRUCTURE_URL);
    }
    /**********************Les services de gestion des localités administratives*****************/
    public createLocalite(localite: Localite): Observable<Localite> {
        return this.http.post<Localite>(AppEndpoint.LOCALITE_URL, localite);
    }

    public updateLocalite(localite: Localite): Observable<Localite> {
        return this.http.put<Localite>(AppEndpoint.LOCALITE_URL, localite);
    }

    public deleteLocalite(localite: Localite): Observable<Localite> {
        return this.http.patch<Localite>(`${AppEndpoint.LOCALITE_URL}/${localite.id}`, null);
    }

    public fetchLocalite(): Observable<LocaliteList> {
        return this.http.get<LocaliteList>(AppEndpoint.LOCALITE_URL);
    }

    /**********************Les services des prevision*****************/

    public fetchPrevision(option: any): Observable<PrevisionList> {
        const params = createRequestOption(option);
        return this.http.get<PrevisionList>(AppEndpoint.PREVISION_URL, {params});
    }

    public createPrevision(obj: Prevision): Observable<Prevision> {
        return this.http.post<Prevision>(`${AppEndpoint.PREVISION_URL}`, obj)
    }

    public updatePrevision(obj: Prevision): Observable<Prevision> {
        return this.http.put<Prevision>(`${AppEndpoint.PREVISION_URL}`, obj)
    }

    public deletePrevision(obj: Prevision): Observable<Prevision> {
        return this.http.patch<Prevision>(`${AppEndpoint.PREVISION_URL}/${obj.id}`, obj)
    }
    /**********************Les services de gestion de l'exercice *****************/

    public createExercice(exercice: Exercice): Observable<Exercice> {
        return this.http.post<Exercice>(AppEndpoint.EXERCICE_URL, exercice);
    }

    public updateExercice(exercice: Exercice): Observable<Exercice> {
        return this.http.put<Exercice>(AppEndpoint.EXERCICE_URL, exercice);
    }

    public deletExercice(exercice: Exercice): Observable<boolean> {
        return this.http.delete<boolean>(`${AppEndpoint.EXERCICE_URL}/${exercice.id}`);
    }

    public closeExercice(exercice: Exercice): Observable<Exercice> {
        return this.http.put<Exercice>(`${AppEndpoint.EXERCICE_URL}/close`, exercice);
    }

    public fetchExercice(): Observable<ExerciceList> {
        return this.http.get<ExerciceList>(AppEndpoint.EXERCICE_URL);
    }

    // Recuperation de l'inialisation des sous famille pour la creation =
    // de la prevision
    public fetchIniSousFamilleList(): Observable<ValeurPevisionList> {
        return this.http.get<ValeurPevisionList>(`${AppEndpoint.SOUS_FAMILLE_URL}/init`);
    }

    public fetchPrevValForModif(prevision: Prevision): Observable<ValeurPevisionList>  {
        return this.http.patch<ValeurPevisionList>(`${AppEndpoint.PREVISION_URL}/val`, prevision);
    }

    public deletDetailPrevision(option: any): Observable<any>  {
        const params= createRequestOption(option);
        return this.http.delete<any>(`${AppEndpoint.DETAIL_PREVISION_URL}`, {params});
    }

    public worflowNext(worflowData: WorkflowData): Observable<any> {
        return this.http.put<WorkflowData>(`${AppEndpoint.PREVISION_URL}/suivant`, worflowData);
    }

    /**********************************Procesuss de d'ouverture ***************************/
    /******************************et de cloture de la saisie de prevision*****************/
    public fetchPrevisionProcesList(): Observable<ProcessPrevisionList> {
        return this.http.get<ProcessPrevisionList>(`${AppEndpoint.PROCESS_URL}`);
    }

    public ouvrirePrevisionProces(obj: ProcessPrevision): Observable<ProcessPrevision> {
        return this.http.post<ProcessPrevision>(`${AppEndpoint.PROCESS_URL}`, obj);
    }

    public annulerPrevisionProces(obj: ProcessPrevision): Observable<ProcessPrevision> {
        return this.http.put<ProcessPrevision>(`${AppEndpoint.PROCESS_URL}`, obj);
    }

    public clorePrevisionProces(obj: ProcessPrevision): Observable<ProcessPrevision> {
        return this.http.patch<ProcessPrevision>(`${AppEndpoint.PROCESS_URL}`, obj);
    }

    public fetchPrevValeurByCritere(option: any): Observable<ValeurPevisionList> {
        const params = createRequestOption(option);
        return this.http.get<ValeurPevisionList>(`${AppEndpoint.PREVISION_URL}/centralisation`,
            {params});
    }

    public activeExercice(exercice: Exercice) {
        return this.http.post<Exercice>(`${AppEndpoint.EXERCICE_URL}/active`, exercice);
    }

    /**********************Les services de gestion des mouvements *****************/
public createMouvement(mouvement: Mouvement): Observable<Mouvement> {
    return this.http.post<Mouvement>(AppEndpoint.MOUVEMENT_URL, mouvement);
}

public updateMouvement(mouvement: Mouvement): Observable<Mouvement> {
    return this.http.put<Mouvement>(AppEndpoint.MOUVEMENT_URL, mouvement);
}

public deleteMouvement(mouvement: Mouvement): Observable<Mouvement> {
    return this.http.delete<Mouvement>(`${AppEndpoint.MOUVEMENT_URL}/${mouvement.id}`);
}

public fetchMouvement(): Observable<MouvementList> {
    return this.http.get<MouvementList>(AppEndpoint.MOUVEMENT_URL);
}
}
