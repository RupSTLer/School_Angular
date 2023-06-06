import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../_services/notification.service';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Student } from '../entities/student';
import { TimerService } from '../_services/timer.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { AutoLogOutService } from '../_services/auto-log-out.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  student: Student[] = [];
  userName: string;
  password: string;

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]{4,}')]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).{5,}')])
  })

  // get userName()
  // {
  //   return this.loginForm.get('userName');
  // }
  // get password()
  // {
  //   return this.loginForm.get('password');
  // }

  constructor(
    private userservice: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private notify: NotificationService,
    private timerService: TimerService,
    // private autolog: AutoLogOutService
    ) { }

  ngOnInit(): void {

  }
  login(loginForm: NgForm) {
    // console.log("Form is submitted");
    console.log(loginForm.value);  //will return value taken from the form on console

    this.userservice.login(loginForm.value).subscribe(
      (response: any) => {
        // console.log(response); //to check the response
        // console.log(response.jwtToken);
        // console.log(response.user.role);

        //storing response(role and token) into localStorage
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        localStorage.setItem('username', loginForm.value.userName);
        // console.log(loginForm.value.userName); //to check the userName

        const role = response.user.role[0].roleName;

        if (role === 'Admin') {
          this.router.navigate(['/admin']);              //if logged in user is admin, the page will navigate to admin dashboard
          this.notify.showSuccess(loginForm.value.userName + " logged in");
          this.timerService.startInactivityTimer();
        }
        else if(role === 'Student') {
          this.router.navigate(['/studentDashboard']);   //if logged in user is user, the page will navigate to user dashboard
          this.notify.showSuccess(loginForm.value.userName + " logged in");
        }
        else if(role === 'Teacher') {
          this.router.navigate(['/teacherDashboard']);   //if logged in user is user, the page will navigate to user dashboard
          this.notify.showSuccess(loginForm.value.userName + " logged in");
        }

        // this.autolog.initListener();
        // this.autolog.check();

        // if(this.timerService.startInactivityTimer.length >= 20000)
        // {
        //   alert("logging off in 20 seconds");
        //   // this.timerService.startInactivityTimer();
        // }
        
        // this.timerService.startInactivityTimer();
    
      },
      (err: HttpErrorResponse) => {
        console.log(err.status);
        if(err.status === 401)
        {
            this.notify.showError("invalid credentials");
            this.router.navigate(['/login']);
        }
      }

    );
  }

  registerUser() {
    this.router.navigate(['/register']);
  }

}

//generated token will be erased when user reload the page,so the token should be stored in some permanent space so that the user dont need to login again and again
//we can use cookies, session to store the jwt token but localStorage could be the best amongst


