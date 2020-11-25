import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonRequestService } from '../../../shared/services/http/common-request.service';
import { RequestEnums } from '../../../shared/constants/request-enums';
import { StorageService } from '../../../shared/services/common/storage.service';
import { LoaderService } from '../../../shared/services/common/loader/loader.service';
import { SPINNER_TYPE } from '../../../shared/services/common/loader/spinner-enums';
import { LoginActions } from './login.action';
import { Store } from '@ngrx/store';
import { IAppState } from './../../../shared/store/ngrxstore/ngrxstore.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private commonRequestService: CommonRequestService, private storageService: StorageService, private loaderService: LoaderService, private loginAction: LoginActions, private storeObj: Store<IAppState>) { }

  ngOnInit() { }
  registration() {
    this.router.navigate(['registration']);
  }

  getInfo() {
    RequestEnums.LOGIN.values[0] = 5;
    this.commonRequestService.request(RequestEnums.LOGIN).subscribe(res => {
      console.log(res);
    });
  }
  setStorage() {
    this.storageService.setLocalStorageItem('username', 'sai');
  }

  getStorage() {
    console.log(this.storageService.getLocalStorageItem('username'));
  }

  removeStorage() {
    console.log(this.storageService.deleteLocalStorageItem('username'));
  }

  openLoader() {
    this.loaderService.showLoader('loading sample 123....', SPINNER_TYPE.DOTS, true, 5000, true, '', true, true, true );
  }

  dispactAction() {
    this.storeObj.dispatch(this.loginAction.login({username: 'vipul', password: 'parmar'}));
  }
}
