import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from '../_services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import { FormBuilder, FormsModule, NgForm } from '@angular/forms';
import { Expression } from '@angular/compiler';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // let fixture = LoginComponent;

  // let authServiceMock: any;
  // let formBuilderMock: FormBuilder;
  // let routerMock: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        FormsModule,
      ],
      declarations: [LoginComponent],
      providers: [NotificationService,
        MatSnackBar]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    /////////////
    // authServiceMock = {
    //   login: jest.fn()
    // };
    // formBuilderMock = new FormBuilder();
    // routerMock = jest.fn();
    // fixture = new LoginComponent(
    //   formBuilderMock,
    //   authServiceMock,
    //   routerMock
    // );
    // fixture.
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the login form', () => {
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('input[type="text"]')).toBeTruthy();
    expect(compiled.querySelector('input[type="password"]')).toBeTruthy();
    expect(compiled.querySelector('input[type="submit"]')).toBeTruthy();
  });

  it('should submit the login form with valid credentials', () => {
    const compiled = fixture.nativeElement;

    const userNameInput = compiled.querySelector('input[type="text"]');
    const passwordInput = compiled.querySelector('input[type="password"]');
    const submitButton = compiled.querySelector('input[type="submit"]');

    jest.spyOn(component, 'login');

    userNameInput.value = 'anu14120';
    passwordInput.value = 'Anu@pass';

    userNameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    submitButton.click();

    expect(component.login).toHaveBeenCalled();

    //check the validity 
    expect(userNameInput.validity.valid).toBeTruthy();
    expect(passwordInput.validity.valid).toBeTruthy();



  });


  it('should submit the login form with invalid credentials', () => {
    const compiled = fixture.nativeElement;

    const userNameInput = compiled.querySelector('input[type="text"]');
    const passwordInput = compiled.querySelector('input[type="password"]');
    const submitButton = compiled.querySelector('input[type="submit"]');

    jest.spyOn(component, 'login');

    userNameInput.value = 'anu';
    passwordInput.value = 'anupass';

    userNameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    submitButton.click();

    expect(component.login).not.toHaveBeenCalled();

    //check the validity 
    expect(userNameInput.validity.valid).toBeTruthy();
    expect(passwordInput.validity.valid).toBeFalsy();


  });


  // it('should allow admin users to log in', () => {
  //   const compiled = fixture.nativeElement;

  //   const userNameInput = compiled.querySelector('input[type="text"]');
  //   const passwordInput = compiled.querySelector('input[type="password"]');
  //   const submitButton = compiled.querySelector('input[type="submit"]');

  //   jest.spyOn(component, 'login');

  //   userNameInput.value = 'admin123';
  //   passwordInput.value = 'admin@pass';

  //   userNameInput.dispatchEvent(new Event('input'));
  //   passwordInput.dispatchEvent(new Event('input'));

  //   submitButton.click();

  //   expect(component.login).toHaveBeenCalled();
  //   expect(component.role).toBe('admin');

  //   //check the validity 
  //   expect(userNameInput.validity.valid).toBeTruthy();
  //   expect(passwordInput.validity.valid).toBeTruthy();



  // });



  // it('should display error message for invalid password format', () => {
  //   const compiled = fixture.nativeElement;

  //   const passwordInput = compiled.querySelector('input[type="password"]');
  //   const errorElement = compiled.querySelector('.password-error');

  //   passwordInput.value = 'invalid';
  //   passwordInput.dispatchEvent(new Event('input'));
  //   fixture.detectChanges();
  //   expect(errorElement.textContent).toContain('Invalid password format');
  // });


  // it('should display error message for empty password', () => {
  //   const compiled = fixture.nativeElement;

  //   const passwordInput = compiled.querySelector('input[type="password"]');
  //   const errorElement = compiled.querySelector('.password-error');

  //   passwordInput.value = '';
  //   passwordInput.dispatchEvent(new Event('input'));
  //   fixture.detectChanges();
  //   expect(errorElement.textContent).toContain('passsword is incorrect');
  // });


  // it('should clear the login form on successful submission', () => {
  //   const compiled = fixture.nativeElement;

  //   const userNameInput = compiled.querySelector('input[type="text"]');
  //   const passwordInput = compiled.querySelector('input[type="password"]');
  //   const submitButton = compiled.querySelector('input[type="submit"]');

  //   jest.spyOn(component, 'login');

  //   userNameInput.value = 'anu14120';
  //   passwordInput.value = 'Anu@pass';

  //   userNameInput.dispatchEvent(new Event('input'));
  //   passwordInput.dispatchEvent(new Event('input'));

  //   submitButton.click();

  //   expect(component.login).toHaveBeenCalled();

  //   //check the validity 
  //   expect(userNameInput.validity.valid).toBeTruthy();
  //   expect(passwordInput.validity.valid).toBeTruthy();

  //   //reset the form
  //   component.login();
  //   fixture.detectChanges();

  //   //check if the form inputs are clear
  //   expect(userNameInput.value).toBe('');
  //   expect(passwordInput.value).toBe('');

  // });



});
