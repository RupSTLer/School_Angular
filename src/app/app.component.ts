import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './_services/user.service';
import { UserDetails } from './entities/userDetails';
import { LocalStorage } from '@ng-idle/core';
import { Subscription } from 'rxjs';
import { UserAuthService } from './_services/user-auth.service';
// import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
// import { Keepalive } from '@ng-idle/keepalive';
// import { BnNgIdleService } from 'bn-ng-idle/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  private logoutSubscription: Subscription;

  title = 'School_Management_System';
  userDetails: UserDetails = new UserDetails();
  username: any;

  constructor(private router: Router,
    private userAuthService: UserAuthService,
    private userService: UserService) 
    {
      this.logoutSubscription = this.userService.onLogout().subscribe(() => {
        alert('logging off soon');
        this.userAuthService.clear();
        this.router.navigate(['/login']);
        console.log('user logged out due to inactivity');
      });
     }

  ngOnDestroy(): void {
    this.logoutSubscription.unsubscribe();
  }

 

  // //implementing auto logout
  ngOnInit(): void {
   
    // console.log(this.username);
  //   this.bnIdle.startWatching(60).subscribe((isTimedOut: boolean) => {
  //     if(isTimedOut)
  //     {
  //       console.log("Session Expired");
  //       localStorage.clear();
  //       this.router.navigate(['/login']);
  //       this.bnIdle.stopTimer();
  //     }
  //   });
  }

  setUserName()
  {
    this.username = localStorage.getItem('username')?.toString();
  }

  // idleState = 'Not started.';
  // timedOut = false;
  // lastPing?: Date;

  // constructor(private idle: Idle, private keepalive: Keepalive) {
    // // sets an idle timeout of 5 seconds, for testing purposes.
    // idle.setIdle(5);
    // // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    // idle.setTimeout(5);
    // // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    // idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    // idle.onTimeout.subscribe(() => {
    //   this.idleState = 'Timed out!';
    //   this.timedOut = true;
    // });
    // idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    // idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    // // sets the ping interval to 15 seconds
    // keepalive.interval(15);

    // keepalive.onPing.subscribe(() => this.lastPing = new Date());

    // this.reset();
  // }

  // reset() {
  //   this.idle.watch();
  //   this.idleState = 'Started.';
  //   this.timedOut = false;
  // }
}

// https://stackblitz.com/edit/ng-idle-issue-98?file=src%2Fapp%2Fapp.component.html
// https://stackblitz.com/edit/ngx-toastr?file=app%2Fapp.component.ts
// https://www.section.io/engineering-education/auto-logout-angular/

