import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { StudentService } from 'src/app/_services/student.service';
import { TeacherService } from 'src/app/_services/teacher.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/entities/user';
import { UserDetails } from 'src/app/entities/userDetails';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent {

  // observer: any;

  username: string;
  gender: string
  teacherName: string
  userDetails: UserDetails = new UserDetails();
  allDetails: User = new User();

  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private userService: UserService,
    private observer: BreakpointObserver) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails()
  {
    this.userService.getUserDetails().subscribe(
      data => {
        // console.log(data);
        this.userDetails = data;
        // console.log(this.userDetails.username);
        this.getAllDetailsByUserName(this.userDetails.username);
      },
    );
  }

  getAllDetailsByUserName(username: string)
  {
    this.userService.getAllDetailsByUserName(username).subscribe(
      data =>
      {
        this.allDetails = data;
        this.teacherName = this.allDetails.name;
        this.gender = this.allDetails.gender;
        console.log(this.allDetails);
        console.log(this.allDetails.gender);
      }
    );
  }



  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .subscribe((res: any) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

}
