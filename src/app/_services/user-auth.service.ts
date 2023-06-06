import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
//this service is responsible for communicationg with the localStorage like storing the data into localStorage, retriving the data etc...
//here we will store the role and the generated token

  constructor() { }

  //storing Role in localstorage
  public setRoles(roles: [])
  {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): []
  {
    return JSON.parse(localStorage.getItem('roles')!);
  }

  //storing token in localStorage
  public setToken(jwtToken: string)
  {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string
  {
    return localStorage.getItem('jwtToken')!;
  }

  //clear the localstorage when application ends
  public clear()
  {
    localStorage.clear();
  }

  //checking whether user is logged in or not by means of checking the localStorage whether it contains the role and token, if not present that means user not logged in currently
  public isLoggedIn() 
  {
    return this.getRoles() && this.getToken(); //returns true or false
  }

  public isAdmin()
  {
    const roles: any[] = this.getRoles();
    // console.log(roles);
    return roles[0].roleName === 'Admin';
  }

  public isTeacher()
  {
    const roles: any[] = this.getRoles();
    // console.log(roles);
    return roles[0].roleName === 'Teacher';
  }

  public isStudent()
  {
    const roles: any[] = this.getRoles();
    // console.log(roles);
    return roles[0].roleName === 'Student';
  }

  public isUser()
  {
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'User';
  }
}
