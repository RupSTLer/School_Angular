import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../entities/userDetails';
import { User } from '../entities/user';
import { UserService } from '../_services/user.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  stuName: string;
  username: string;
  userDetails: UserDetails = new UserDetails();
  allDetails: User = new User();

  constructor(
    private fb: FormBuilder,
    private userService: UserService
    ) { }

    ngOnInit(): void {
      this.getUserDetails();
    }

    profile = new FormGroup({
      userName: new FormControl(''),
      userPassword: new FormControl(''),
      userID: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      
    });

    get studentId() {
      return this.profile.get('userId');
    }
    get studentName() {
      return this.profile.get('studentName');
    }


    getUserDetails()
    {
      this.userService.getUserDetails().subscribe(
        data => {
          // console.log(data);
          this.userDetails = data;
          // console.log(this.userDetails.username);
          this.getAllDetailsByUserName(this.userDetails.username);
          console.log(this.allDetails.userID);
        },
      );
    }
  
    getAllDetailsByUserName(username: string)
    {
      this.userService.getAllDetailsByUserName(username).subscribe(
        data =>
        {
          // console.log(data);
          this.allDetails = data;
          // console.log(this.allDetails);
          // console.log(this.allDetails.email);
          // console.log(this.allDetails.userID);
  
          this.profile.patchValue({
            userName: this.allDetails.userName || '',
            userPassword: this.allDetails.userPassword || '',
            userID: this.allDetails.userID || '',
            name: this.allDetails.name || '',
            email: this.allDetails.email || ''
  
          });
  
        }
      );
    }


}
