import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgPrimengModule } from '../../ng-primeng.module';
import { AdminRoutes } from './admin-routes';
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
import { CreateDialogComponent } from './prevision/prevision-create-maj/create-dialog/create-dialog.component';
import { PrevisionCreateMajComponent } from './prevision/prevision-create-maj/prevision-create-maj.component';
import { PrevisionValidationComponent } from './prevision/prevision-validation/prevision-validation.component';
import { DetailMouvementComponent } from './mouvement/detail-mouvement/detail-mouvement.component';
import { MouvementComponent } from './mouvement/mouvement/mouvement.component';



@NgModule({
  declarations: [
    RegionComponent,
    FamilleComponent,
    SousfamilleComponent,
    CaracteristiqueComponent,
    ExerciceComponent,
    ProvinceComponent,
    DepartementComponent,
    StructureComponent,
    LocaliteComponent,
    PrevisionCreateMajComponent,
    CreateDialogComponent,
    PrevisionValidationComponent,
    ProcessPrevComponent,
    PrevCentraliseComponent,
    MouvementComponent,
    DetailMouvementComponent,
   
  ],
  imports: [
    CommonModule,
      NgPrimengModule,
      RouterModule.forChild(AdminRoutes)
  ]
})
export class AdminModule { }
