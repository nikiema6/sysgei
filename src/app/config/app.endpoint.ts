import {SERVICE_PREFIX} from './app.constant';

export class AppEndpoint {
    static readonly REPORTING_URL = `${SERVICE_PREFIX}/reporting`;
    static readonly REGION_URL = `${SERVICE_PREFIX}/region`;
    static readonly PROVINCE_URL = `${SERVICE_PREFIX}/province`;
    static readonly DEPARTEMENT_URL = `${SERVICE_PREFIX}/departement`;
    static readonly FAMILLE_URL = `${SERVICE_PREFIX}/famille`;
    static readonly SOUS_FAMILLE_URL = `${SERVICE_PREFIX}/sous-famille`;
    static readonly CARACTERISTIQUE_URL = `${SERVICE_PREFIX}/caracteristique`;
    static readonly STRUCTURE_URL = `${SERVICE_PREFIX}/structure`;
    static readonly LOCALITE_URL = `${SERVICE_PREFIX}/localite`;
    static readonly PREVISION_URL = `${SERVICE_PREFIX}/prevision`;
    static readonly EXERCICE_URL = `${SERVICE_PREFIX}/exercice`;
    static readonly DETAIL_PREVISION_URL = `${SERVICE_PREFIX}/detail-prevision`;
    static readonly PROCESS_URL = `${SERVICE_PREFIX}/process`;
    static readonly MOUVEMENT_URL = `${SERVICE_PREFIX}mouvement`;
    static readonly DETAIL_MOUVEMENT_URL = `${SERVICE_PREFIX}detail-mouvement`;





}
