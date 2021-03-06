import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  

  @Output() cancelRegister = new EventEmitter();
  constructor(private authService: AuthService, private router: Router,
              private alertify: AlertifyService, private fb: FormBuilder) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-dark-blue'
    },
    this.createRegisterForm();
  }

  // tslint:disable-next-line: typedef
  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      //knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      //city: ['', Validators.required],
      //country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  // tslint:disable-next-line: typedef
  passwordMatchValidator(g: FormGroup ) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true}
  }

  // tslint:disable-next-line: typedef
register() {
  if (this.registerForm.valid) {
    this.user = Object.assign({}, this.registerForm.value);
    this.authService.register(this.user).subscribe(() => {
      this.alertify.success('Registration successful');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.authService.login(this.user).subscribe(() => {
        this.router.navigate(['/balance-member']);
      })
    });
  }
  }

  // tslint:disable-next-line: typedef
  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }
}
