// import { Injectable, NgZone } from '@angular/core';
// import { Router } from '@angular/router';
// import { NotificationService } from './notification.service';
// import { UserAuthService } from './user-auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AutoLogOutService {

//     //log off details
//     isLogin = false;

//     constructor(
//         private router: Router,
//         private notify: NotificationService,
//         private userAuthService: UserAuthService,
//         private ngZone: NgZone
//     ) {
//       if(this.isUserLoggedIn()){
//         this.isLogin=true;
//       }
//       this.lastAction(Date.now());
//       this.check();
//       this.initListener();
//       this.initInterval();
//     }
  
//     /**
//      * last action
//      */
//     getLastAction(): any {
//       return localStorage.getItem('lastAction');
//     }
  
//     /**
//      * set last action
//      * @param value
//      */
//     lastAction(value: any) {
//       localStorage.setItem('lastAction', JSON.stringify(value));
//     }
  
//     /**
//      * start event listener
//      */
//     initListener() {
//       this.ngZone.runOutsideAngular(() => {
//         document.body.addEventListener('click', () => this.reset());
//       });
//     }
  
//     /**
//      * time interval
//      */
//     initInterval() {
//       this.ngZone.runOutsideAngular(() => {
//         setInterval(() => {
//           this.check();
//         }, 1000);
//       })
//     }
  
//     /**
//      * reset timer
//      */
//     reset() {
//       this.lastAction(Date.now());
//     }
  
//     /**
//      * check timer
//      */
//     check() {
//       const now = Date.now();
//       const timeLeft = parseInt(this.getLastAction()) + (1) * 1000;
//       const diff = timeLeft - now;
//       const isTimeout = diff < 0;
//       console.log(timeLeft);
//       console.log(isTimeout);
//       // this.isLoggedIn.subscribe(event => this.isLogin = event);
//       this.ngZone.run(() => {
//         if (isTimeout && this.isLogin) {
//           localStorage.removeItem('user_id');
//           localStorage.removeItem('lastAction');
//           setTimeout(()=>{
//             console.log("Your Session Expired due to longer Inactivity, Login Again To Continue");
//             alert("Your Session Expired due to longer Inactivity, Login Again To Continue");
//             alert("logging off");
//             this.userAuthService.clear();
//           },10000);
//           this.router.navigate(['/login']);
//         }
//       });
//     }
  
//     /**
//      *check if a user is logged in
//      */
//     isUserLoggedIn() {
//       return this.userAuthService.isLoggedIn();
//     }
// }
