import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app.routing.module';

import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import {AppConfigComponent} from './app.config.component'
import {AppCodeModule} from './blocks/app-code/app.code.component';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component'
import {AppErrorComponent} from './pages/app.error.component';
import {AppLoginComponent} from './pages/app.login.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {AppMenuComponent} from './app.menu.component';
import {AppMenuitemComponent} from './app.menuitem.component';
import {AppTopBarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';
import {FormLayoutDemoComponent} from './demo/view/formlayoutdemo.component';
import {InputDemoComponent} from './demo/view/inputdemo.component';
import {FloatLabelDemoComponent} from './demo/view/floatlabeldemo.component';
import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
import {ButtonDemoComponent} from './demo/view/buttondemo.component';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {ListDemoComponent} from './demo/view/listdemo.component';
import {TreeDemoComponent} from './demo/view/treedemo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MediaDemoComponent} from './demo/view/mediademo.component';
import {MenusComponent} from './demo/view/menus/menus.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {IconsComponent} from './utilities/icons.component';
import {BlocksComponent} from './blocks/blocks/blocks.component';
import {BlockViewer} from './blocks/blockviewer/blockviewer.component';
import {EventService} from './demo/service/eventservice';
import {NodeService} from './demo/service/nodeservice';
import {MenuService} from './app.menu.service';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AppMetaReducers, reducers} from './config/store/reducers';
import {AppEffect} from './config/store/effect';
import {NgPrimengModule} from './ng-primeng.module';
import {ConfirmationService, MessageService} from 'primeng/api';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {kcInitializer} from './config/security/app-init';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AppInterceptor} from './config/security/app-interceptor';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        AppCodeModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgPrimengModule,
        StoreModule.forRoot(reducers, {metaReducers: AppMetaReducers}),
        EffectsModule.forRoot([AppEffect]),
        NgbModule,
        KeycloakAngularModule,
        NgxSpinnerModule
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppConfigComponent,
        AppCalendarComponent,
        AppCrudComponent,
        AppAccessdeniedComponent,
        AppErrorComponent,
        AppTimelineDemoComponent,
        AppLoginComponent,
        AppNotfoundComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        FormLayoutDemoComponent,
        InputDemoComponent,
        FloatLabelDemoComponent,
        InvalidStateDemoComponent,
        ButtonDemoComponent,
        TableDemoComponent,
        ListDemoComponent,
        TreeDemoComponent,
        PanelsDemoComponent,
        OverlaysDemoComponent,
        MediaDemoComponent,
        MenusComponent,
        MessagesDemoComponent,
        MessagesDemoComponent,
        MiscDemoComponent,
        ChartsDemoComponent,
        EmptyDemoComponent,
        FileDemoComponent,
        DocumentationComponent,
        IconsComponent,
        BlocksComponent,
        BlockViewer
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: kcInitializer,
            multi: true,
            deps: [KeycloakService]
        },
        {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true},
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        EventService, NodeService, MenuService,
        ConfirmationService, MessageService, DialogService
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
