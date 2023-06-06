import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { UserDetails } from '../entities/userDetails';
import { Observable, Subject } from 'rxjs';
import { User } from '../entities/user';
import { TimerService } from './timer.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //it will contain API endpoints for user service of backend

  baseURL = "http://localhost:9001";
  private logoutSubject: Subject<void> = new Subject<void>();

  //this implies that this particular authenticate path/endpoint don't require any authentication 
  requestHeader = new HttpHeaders({ "No-Auth": "True"});
  constructor(
    private http: HttpClient, 
    private userAuthService: UserAuthService,
    private timerService: TimerService,
    private router: Router) 
    {
      this.timerService.getTimer().subscribe(()=>{
        this.logout();
      })
     }


  public register(registerData: any)
  {
    return this.http.post(this.baseURL + '/registerNewUser', registerData);
  }

  public login(loginData: any) {
    return this.http.post(this.baseURL + '/authenticate', loginData, {headers: this.requestHeader});

    this.timerService.resetTimer();
  }

  logout(): void {
    this.userAuthService.clear();
    this.router.navigate(['/login']);   //after logging out, it will redirect to login page
    this.logoutSubject.next();
  }

  onLogout(): Observable<void> {
    return this.logoutSubject.asObservable();
  }

  public forUser()
  {
    return this.http.get(this.baseURL + '/forUser', { responseType: 'text'});
  }

  public forAdmin()
  {
    return this.http.get(this.baseURL + '/forAdmin', { responseType: 'text'});
  }

  getUserDetails(): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.baseURL}/userDetails`);
  }

  getNameOfUser(username: string)
  {
    return this.http.get(`${this.baseURL}/getNameOfUser/${username}`, {responseType: 'text'});    
  }

  getAllDetailsByUserName(username: string): Observable<User>
  {
    return this.http.get<User>(`${this.baseURL}/getAllDetailsByUserName/${username}`);
  }


  //it will check whether the currently loggedin user and passing user role is same or not 
  //checking allowedRoles and actualroles if same or not
  public roleMatch(allowedRoles: any): boolean
  {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();   //taking roles data from localStorage

    if(userRoles != null && userRoles)
    {
      for(let i=0;i<userRoles.length;i++)
      {
        for(let j=0;j<allowedRoles.length;j++)
        {
          if(userRoles[i].roleName === allowedRoles[j])
          {
            isMatch=true;
            return isMatch;
          }
          else
          {
            return isMatch;
          } 
        } 
      }
    }
    return isMatch;
  }


}
