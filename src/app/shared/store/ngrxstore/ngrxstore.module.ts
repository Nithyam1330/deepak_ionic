
import { ActionReducerMap, ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { IUserState, LoginReducer } from '../../../views/auth-views/login/login.reducer';
import { NgModule } from '@angular/core';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from './../../../../environments/environment';


export interface IAppState {
    User: IUserState;
}
const reducers: ActionReducerMap<IAppState> = {
    User: LoginReducer,
};
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    // Add Required  State keys in "keys" Array to sync with local storage
    return localStorageSync({ keys: ['User'], rehydrate: true })(reducer);
}
export function logger(reducer: ActionReducer<IAppState>): any {
    return storeLogger()(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = environment.production ? [localStorageSyncReducer] : [localStorageSyncReducer, logger];

@NgModule({
    imports: [
        StoreModule.forRoot(
            reducers,
            { metaReducers }
        )
    ]
})
export class NgrxStoreModule { }
