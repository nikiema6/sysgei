import { Routes } from '@angular/router';
import { AppAuthGuard } from '../../config/security/app-auth.guard';
import { CaracteristiqueComponent } from './parametrage/caracteristique/caracteristique.component';
import { DepartementComponent } from './parametrage/departement/departement.component';
import { ExerciceComponent } from './parametrage/exercice/exercice.component';
import { FamilleComponent } from './parametrage/famille/famille.component';
import { LocaliteComponent } from './parametrage/localite/localite.component';
import { ProcessPrevComponent } from './parametrage/process-prev/process-prev.component';
import { ProvinceComponent } from './parametrage/province/province.component';
import { RegionComponent } from './parametrage/region/region.component';
import { SousfamilleComponent } from './parametrage/sousfamille/sousfamille.component';
import { StructureComponent } from './parametrage/structure/structure.component';
import { PrevCentraliseComponent } from './prevision/prev-centralise/prev-centralise.component';
import { PrevisionCreateMajComponent } from './prevision/prevision-create-maj/prevision-create-maj.component';
import { PrevisionValidationComponent } from './prevision/prevision-validation/prevision-validation.component';
import { DetailMouvementComponent } from './mouvement/detail-mouvement/detail-mouvement.component';
import { MouvementComponent } from './mouvement/mouvement/mouvement.component';


export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () => import('./dashbord/dashboarddemo.component')
                    .then(c => c.DashboardDemoComponent )
            },
            {
                path: 'exercice',
                canActivate: [AppAuthGuard],
                component: ExerciceComponent
            },
            {
                path: 'process',
                canActivate: [AppAuthGuard],
                component: ProcessPrevComponent
            },
            {
                path: 'parametrage',
                canActivate: [AppAuthGuard],
                children: [
                    {
                        path: 'decoupage',
                        children: [
                            {
                                path: 'region',
                                component: RegionComponent
                            },
                            {
                                path: 'province',
                                component: ProvinceComponent
                            },
                            {
                                path: 'departement',
                                component: DepartementComponent
                            },
                            {
                                path: 'localite',
                                component: LocaliteComponent
                            },
                            {
                                path: 'structure',
                                component: StructureComponent
                            }
                        ]
                    },
                    {
                        path: 'equipement',
                        canActivate: [AppAuthGuard],
                        children: [
                            {
                                path: 'famille',
                                component: FamilleComponent
                            },
                            {
                                path: 'sousfamille',
                                component: SousfamilleComponent
                            },
                            {
                                path: 'caracteristique',
                                component: CaracteristiqueComponent
                            }
                        ]
                    }
                ]

            },
            {
                path: 'prevision',
                canActivate: [AppAuthGuard],
                children: [
                    {
                        path: 'create',
                        component: PrevisionCreateMajComponent
                    },
                    {
                        path: 'valide',
                        component: PrevisionValidationComponent
                    },
                    {
                        path: 'centralisation',
                        component: PrevCentraliseComponent
                    }
                ]
            },
            {
                path: 'mouvement',
                canActivate: [AppAuthGuard],
                children: [

                    {
                        path: 'mouvement',
                        component: MouvementComponent
                    },
                    {
                        path: 'details',
                        component: DetailMouvementComponent // Route pour Mouvement
                    }
                        ]
           }
            ]
          }

];
