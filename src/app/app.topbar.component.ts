import {Component, OnDestroy, OnInit} from '@angular/core';
import { AppMainComponent} from './app.main.component';
import {State} from './config/store/reducers';
import {select, Store} from '@ngrx/store';
import {selecteExerciceList, selecteProcessPrevision} from './config/store/selector';
import {takeUntil, Subject} from 'rxjs';
import {Exercice, ProcessPrevision, TypeStorage} from './config/app.models';
import {getLocalStorage, setLocalStorage} from './config/utils';
import {
    ClearAppState,
    FetchExerciceList,
    FetchPrevisionProcesList,
    SetCurentExercice,
    SetCurentProcess
} from './config/store/action';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit, OnDestroy {
    destroy$: Subject<boolean> = new Subject<boolean>();
    exerciceList: Exercice[] = [];
    processPrevisions: ProcessPrevision[] = [];
    selectedExercie: Exercice;
    userProfile: KeycloakProfile;

    constructor(public app: AppMainComponent, private store: Store<State>,
    private keycloakService: KeycloakService) {}

    ngOnInit(): void {
        this.store.dispatch(FetchExerciceList());
        this.store.dispatch(FetchPrevisionProcesList());

        this.keycloakService.isLoggedIn()
            .then(loggedIn => {
                if (loggedIn) {
                    this.keycloakService.loadUserProfile()
                        .then(keycloakProfile => {
                            this.userProfile = keycloakProfile;
                        });
                }
            });


        this.store.pipe(select(selecteExerciceList)).pipe(takeUntil(this.destroy$))
            .subscribe((exerciceList: Exercice[]) => {
                if (exerciceList) {
                    this.exerciceList = [];
                    exerciceList.forEach(exe => this.exerciceList.push({...exe}));
                    const storExe: Exercice = getLocalStorage(TypeStorage.EXERCICE);
                    if (storExe) {
                        this.selectedExercie = this.exerciceList.find(val => val.id === storExe.id);
                        if (this.selectedExercie) {
                            this.store.dispatch(SetCurentExercice(this.selectedExercie));
                        }
                    } else {
                        this.selectedExercie = this.exerciceList.find(val => val.current);
                        if (this.selectedExercie) {
                            setLocalStorage(TypeStorage.EXERCICE, this.selectedExercie);
                            this.store.dispatch(SetCurentExercice(this.selectedExercie));
                        }
                    }
                }
            });

        this.store.pipe(select(selecteProcessPrevision)).pipe(takeUntil(this.destroy$))
            .subscribe((processPrevisions: ProcessPrevision[]) => {
                this.processPrevisions = [];
                if (processPrevisions) {
                    processPrevisions.forEach(p => this.processPrevisions.push({...p}));
                    const processPrev = this.processPrevisions.find(value => !value.dateFin);
                    this.store.dispatch(SetCurentProcess(processPrev));
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    logout() {
        this.keycloakService.logout();
        this.store.dispatch(ClearAppState())
    }

}
