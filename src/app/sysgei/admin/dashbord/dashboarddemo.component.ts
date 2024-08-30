import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {ProductService} from '../../../demo/service/productservice';
import {CommonModule} from '@angular/common';
import {NgPrimengModule} from '../../../ng-primeng.module';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';

@Component({
    imports: [CommonModule, NgPrimengModule],
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['../../../../assets/demo/badges.scss']
})
export class DashboardDemoComponent implements OnInit {

    products: any[];
    selectedCar: any;
    items: MenuItem[];
    userProfile: KeycloakProfile;

    constructor(private keycloakService: KeycloakService) {}

    ngOnInit() {
        this.keycloakService.isLoggedIn()
            .then(loggedIn => {
                if (loggedIn) {
                    this.keycloakService.loadUserProfile()
                        .then(keycloakProfile => {
                            this.userProfile = keycloakProfile;
                        });
                }
            });
    }
}
