
import { CustomAction } from './../../../shared/store/customaction';
import { LoginActions } from '../login/login.action';

export interface IUserState {
    username:string;
    password:string;
}

const initial: IUserState = {
    username:'',
    password:''
};
export function LoginReducer(state: IUserState = initial, action: CustomAction): IUserState {
    switch (action.type) {
        case LoginActions.LOGIN: {
            state = action.payload;
            return Object.assign({}, state);
        }

            default:
            return state;
    }
}
