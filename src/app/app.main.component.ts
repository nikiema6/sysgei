import {Component, OnInit} from '@angular/core';
import { MenuService } from './app.menu.service';
import { PrimeNGConfig } from 'primeng/api';
import { AppComponent } from './app.component';
import {fromEvent, Subject, takeUntil} from 'rxjs';
import {KeycloakService} from 'keycloak-angular';

@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html'
})
export class AppMainComponent implements OnInit {
    destroy$: Subject<boolean> = new Subject<boolean>();
    callRefreshStartTime: number;

    topbarMenuActive: boolean;

    overlayMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    menuClick: boolean;

    topbarItemClick: boolean;

    resetMenu: boolean;

    menuHoverActive: boolean;

    configActive: boolean;

    configClick: boolean;

    constructor(private menuService: MenuService,
                private primengConfig: PrimeNGConfig,
                public app: AppComponent, private keycloakService: KeycloakService) { }

    ngOnInit() {
        this.callRefreshStartTime = new Date().getTime();
        this.primengConfig.ripple = true;
        fromEvent(document, 'mousedown').pipe(takeUntil(this.destroy$)).subscribe(e => {
          //  this.refreshToken();
        });

        fromEvent(document, 'keypress').pipe(takeUntil(this.destroy$)).subscribe(e => {
           // this.refreshToken();
        });
    }

    // to refresh token
    /*refreshToken(): void {
        const interval = (window as any).globalConfig.refreshTokenFunctionCallTimeSpan;
        if (new Date().getTime() - this.callRefreshStartTime >= interval) {
            this.callRefreshStartTime = new Date().getTime();
            const minTokenValidity = (window as any).globalConfig.refreshTokenMinTokenValidity;
            this.keycloakService.updateToken(minTokenValidity).then(refreshed => {
                if (refreshed) {
                    console.log('Keycloak Token refreshed after ' + minTokenValidity + ' ms');
                } else {
                    console.log('Keycloak Token still valid ');
                }
            }).catch(error => {
                console.error('Error occurred when refreshing the token: ' + error);
            });
        }
    }*/

    onLayoutClick() {
        if (!this.topbarItemClick) {
            this.topbarMenuActive = false;
        }

        if (!this.menuClick) {
            if (this.isHorizontal() || this.isSlim()) {
                this.menuService.reset();
            }

            if (this.overlayMenuActive || this.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }

            this.menuHoverActive = false;
        }

        if (this.configActive && !this.configClick) {
            this.configActive = false;
        }

        this.configClick = false;
        this.topbarItemClick = false;
        this.menuClick = false;
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.topbarMenuActive = false;

        if (this.isOverlay()) {
            this.overlayMenuActive = !this.overlayMenuActive;
        }
        if (this.isDesktop()) {
            this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
        } else {
            this.staticMenuMobileActive = !this.staticMenuMobileActive;
        }

        event.preventDefault();
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.resetMenu = false;
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    onConfigClick(event) {
        this.configClick = true;
    }

    onRippleChange(event) {
        this.app.ripple = event.checked;
    }

    isHorizontal() {
        return this.app.menuMode === 'horizontal';
    }

    isSlim() {
        return this.app.menuMode === 'slim';
    }

    isOverlay() {
        return this.app.menuMode === 'overlay';
    }

    isMobile() {
        return window.innerWidth < 1025;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    hideOverlayMenu() {
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    }
}
