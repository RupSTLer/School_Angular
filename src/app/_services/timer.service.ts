import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil, timer } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService implements OnDestroy {

  private readonly INACTIVE_TIME = 30 * 60 * 1000;  //30 seconds of in activity
  private readonly WARNING_TIME = 10 * 1000;  //10 seconds of in activity
  private timer$: Observable<number>;
  private resetTimerSubject: Subject<void> = new Subject<void>();
  private destroy$: Subject<void> = new Subject<void>();
  private timerSubscription: any;

  constructor(
    private userAuthService: UserAuthService, 
    private router: Router, 
    private notify: NotificationService
  ) { 
    this.timer$ = timer(this.INACTIVE_TIME);
    this.setupScreenActivityListeners();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTimer(): Observable<number>
  {
    return this.timer$;
  }

  resetTimer(): void {
    this.resetTimerSubject.next();
  }

  getResetTimerSignal(): Observable<void> {
    return this.resetTimerSubject.asObservable();
  }

  private setupScreenActivityListeners(): void {
    ['mousemove', 'keydown', 'touchstart'].forEach((eventType) => {
      window.addEventListener(eventType, () => {
        this.resetTimer();
      });
    });
  }

  public startInactivityTimer(): void {
    this.stopInactivityTimer();
    this.timerSubscription = this.timer$
        .pipe(takeUntil(this.resetTimerSubject), takeUntil(this.destroy$))
        .subscribe((val) => {
          const remainingTime = this.INACTIVE_TIME - (val +1) * 1000;
          if(remainingTime <= this.WARNING_TIME)
          {
            console.log(`user will be logged out in ${remainingTime / 1000} seconds. `);
            alert(`user will be logged out in ${remainingTime / 1000} seconds. `);
          }
          if(remainingTime <= 0)
          {
            this.logout();
            console.log('user logged out due to inactivity');
          }
      
        });
  }

  public stopInactivityTimer():void
  {
    if(this.timerSubscription)
    {
      this.timerSubscription.unsubscribe();
      this.timerSubscription=null;
    }
  }

  public logout(): void
  {
    this.stopInactivityTimer();
    this.userAuthService.clear();
    this.router.navigate(['/login']);   //after logging out, it will redirect to login page
    this.notify.showSuccess("logged out auto");
  }

}
