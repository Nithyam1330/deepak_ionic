import { Registration } from './registration.model';
import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/services/common/validators';
import { VALIDATION_PATTERNS } from 'src/app/shared/constants/validation-patterns';
import { BaseClass } from 'src/app/shared/services/common/baseClass';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent extends BaseClass implements OnInit {

  public registerationForm: FormGroup;
  public registrationObject = new Registration();
  @ViewChild('registerationNgForm') registerationNgForm: FormGroupDirective;
  public validation_messages = {
    'firstname': [
      { type: 'required', message: 'Please enter firstname' },
      { type: 'whitespace', message: 'Please enter valid firstname' },
      { type: 'pattern', message: 'Please enter alphabets only' },
      { type: 'maxlength', message: 'Firstname can be maximum of 20 characters' },
      { type: 'minlength', message: 'Firstname should be minimum of 2 characters' }
    ],
    'email': [
      { type: 'required', message: 'Please enter email' },
      { type: 'pattern', message: 'Please enter valid email' }
    ],
    'lastname': [
      { type: 'required', message: 'Please enter LastName' },
      { type: 'whitespace', message: 'Please enter valid lastname' },
      { type: 'pattern', message: 'Please enter alphabets only' },
      { type: 'maxlength', message: 'Lastname can be maximum of 20 characters' },
      { type: 'minlength', message: 'Lastname should be minimum of 3 characters' }
    ],
    'phone': [
      { type: 'required', message: 'Please enter Phone number' },
      { type: 'pattern', message: 'Please enter only digits for phone number' },
      { type: 'maxlength', message: 'Phone number can be maximum of 10 digits' },
      { type: 'minlength', message: 'Phone number should be minimum of 10 digits' },
      { type: 'phoneNumber', message: 'Please enter valid mobile number' }
    ]
  };

  constructor(private _formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {

    this.initializeForm();
  }

  initializeForm() {
    this.registerationForm = this._formBuilder.group({
      firstname: ['', Validators.compose([
        Validators.required, CustomValidators.noWhitespaceValidator, Validators.pattern('^[A-Za-z\' \']*$'),
        Validators.maxLength(20),
        Validators.minLength(2)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(VALIDATION_PATTERNS.EMAIL)
      ])],
      lastname: ['', Validators.compose([
        Validators.required, CustomValidators.noWhitespaceValidator, Validators.pattern('^[A-Za-z\' \']*$'),
        Validators.maxLength(20),
        Validators.minLength(3)
      ])],
      phone: ['', Validators.compose([
        Validators.minLength(10),
        Validators.pattern(VALIDATION_PATTERNS.POSITIVE_INTEGER),
        Validators.maxLength(10),
        Validators.minLength(10),
        CustomValidators.phoneNumberValidator
      ])]
    });
  }

  onSubmit() {
    if (this.registerationForm.valid) {
      console.log(this.registerationForm.value);
      this.registerationForm.reset();
      this.registerationNgForm.resetForm();
    }
  }


}
