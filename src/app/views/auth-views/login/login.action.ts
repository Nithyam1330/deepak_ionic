import { Injectable } from '@angular/core';
import { CustomAction } from './../../../shared/store/customaction';

@Injectable({
    providedIn: 'root'
}
)
export class LoginActions {
  
    static LOGIN = 'LOGIN';
    login(data: {}): CustomAction {
        return {
            payload: data,
            type: LoginActions.LOGIN
        };
    }

 
   
}
