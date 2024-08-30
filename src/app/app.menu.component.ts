import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import {KeycloakService} from 'keycloak-angular';
import {isUserInRoles} from './config/utils';
import {UserRoles} from './config/app.constant';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppMainComponent, private keycloakService: KeycloakService) { }

    ngOnInit() {
        this.model = [
            { label: 'Dashboard', icon: 'pi  pi-fw pi-home', routerLink: ['/']},
            {
                label: 'Exercice',
                icon: 'pi pi-calendar ',
                visible: isUserInRoles(UserRoles.user, this.keycloakService),
                routerLink: ['/exercice']
            },
            {
                label: 'Ouv./Fermeture Prevision',
                icon: 'pi pi-calendar ',
                visible: isUserInRoles(UserRoles.user, this.keycloakService),
                routerLink: ['/process']
            },
            {
                label: 'Parametrages', icon: 'pi pi-fw pi-cog', routerLink: ['/parametrage'],
                items: [
                    {
                        label: 'Decoupage Admin.',
                        icon: 'pi pi-fw pi-wrench',
                        visible: isUserInRoles(UserRoles.user, this.keycloakService),
                        routerLink: ['/parametrage/decoupage'],
                        items: [
                            {
                                label: 'Région',
                                icon: 'pi pi-fw pi-wrench',
                                routerLink: ['/parametrage/decoupage/region']
                            },
                            {
                                label: 'Province',
                                icon: 'pi pi-fw pi-wrench',
                                routerLink: ['/parametrage/decoupage/province']
                            },
                            {
                                label: 'Commune',
                                icon: 'pi pi-fw pi-wrench',
                                routerLink: ['/parametrage/decoupage/departement']
                            },
                            {
                                label: 'Localité',
                                icon: 'pi pi-fw pi-wrench',
                                routerLink: ['/parametrage/decoupage/localite']
                            },
                            {
                                label: 'Structure',
                                icon: 'pi pi-fw pi-wrench',
                                routerLink: ['/parametrage/decoupage/structure']
                            }
                        ]
                    },
                    {
                        label: 'Equipement',
                        icon: 'pi pi-fw pi-wrench',
                        visible: isUserInRoles(UserRoles.user, this.keycloakService),
                        routerLink: ['/parametrage/equipement'],
                        items: [
                            {
                                label: 'Famille',
                                icon: 'pi pi-fw pi-wrench',
                                routerLink: ['/parametrage/equipement/famille']
                            },
                            {
                                label: 'Sous Famille',
                                icon: 'pi pi-fw pi-wrench',
                                routerLink: ['/parametrage/equipement/sousfamille']
                            },
                            {
                                label: 'Caractériqtique',
                                icon: 'pi pi-fw pi-wrench',
                                routerLink: ['/parametrage/equipement/caracteristique']
                            }
                        ]
                    }
                ]
            },
            {
                label:'Prévision', icon:'pi pi-fw pi-history', routerLink: ['/prevision'],
                items:[
                    {
                        label: 'Création/Maj.',
                        icon: 'pi pi-fw pi-th-large',
                        visible: isUserInRoles(UserRoles.user, this.keycloakService),
                        routerLink: ['/prevision/create']
                    },
                    {
                        label: 'Validation',
                        icon: 'pi pi-fw pi-th-large',
                        visible: isUserInRoles(UserRoles.user, this.keycloakService),
                        routerLink: ['/prevision/valide']
                    },
                    {
                        label: 'Centralisation',
                        icon: 'pi pi-fw pi-th-large',
                        visible: isUserInRoles(UserRoles.user, this.keycloakService),
                        routerLink: ['/prevision/centralisation']
                    },
                ]
            },
            {
                label: 'Acquisition', icon: 'pi pi-fw pi-compass', routerLink: ['/utilities'],
                items: [

                ]
            },
            {
                label: 'Mouvement', icon: 'pi pi-fw pi-compass', routerLink: ['/mouvement'],
                items: [
                    {
                        label: 'Affectations',
                        icon: 'pi pi-fw pi-th-large',
                        visible: isUserInRoles(UserRoles.user, this.keycloakService),
                        routerLink: ['/mouvement/mouvement']
                    },
                    {
                        label: 'Détails des mouvements',
                         icon: 'pi pi-fw pi-info-circle',
                        visible: isUserInRoles(UserRoles.user, this.keycloakService),
                        routerLink: ['/mouvement/details']
                      }
                ]
            },
            {
                label: 'Consultation', icon: 'pi pi-fw pi-compass', routerLink: ['/utilities'],
                items: []
            }

        ];
    }

    onMenuClick(event) {
        if (!this.app.isHorizontal()) {
        }
        this.app.onMenuClick(event);
    }
}
