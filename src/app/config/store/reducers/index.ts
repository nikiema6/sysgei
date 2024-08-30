import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as mReducer from '../reducers/reducer';
import {SysgeiAppState} from '../store.state';
import {environment} from '../../../../environments/environment';
import {StatusEnum} from '../../gloabal-message.config';

export interface State {
    sysgeiAppState: SysgeiAppState;
}

export const reducers: ActionReducerMap<any> = {
    sysgeiAppState: mReducer.appReducer
};

export interface Status {
    status: StatusEnum;
    message: string;
    reset?: boolean;
    params?: any;
}

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state: State, action: any): State => {
        window.console.log('state', state);
        window.console.log('action', action);
        return reducer(state, action);
    };
}


export const AppMetaReducers: MetaReducer<any>[] = !environment.production ?
    [logger] : [];
