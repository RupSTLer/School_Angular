import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { StudentService } from '../_services/student.service';
import { UserService } from '../_services/user.service';
import { TeacherService } from '../_services/teacher.service';
import { UserDetails } from '../entities/userDetails';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  message: string;
  teacherCount: number;
  studentCount: number;
  username: string;
  adminName: string
  userDetails: UserDetails = new UserDetails();


  constructor(
    private userService: UserService, 
    private observer: BreakpointObserver,
    private studentService: StudentService,
    private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.countStudent();
    this.countTeacher();
  }

  getUserDetails()
  {
    this.userService.getUserDetails().subscribe(
      data => {
        console.log(data);
        this.userDetails = data;
        // console.log(this.userDetails.username);
        this.getNameOfUser(this.userDetails.username);
      },
    );
  }

  getNameOfUser(username: string)
  {
    // console.log(username);
    this.userService.getNameOfUser(username).subscribe(
      name => {
        // console.log(name);
        this.adminName = name;
        console.log(this.adminName);
      }
    );
  }

  forAdmin()
  {
    this.userService.forAdmin().subscribe(
      (response) => {
        console.log(response);
        this.message = response;
      }
    )
  }

  countStudent()
  {
    this.studentService.countStudent().subscribe(
      (res2) => {
        var count = Number(res2);
        console.log(count);
        this.studentCount = count;
      }
    )
  }

  countTeacher()
  {
    this.teacherService.countTeacher().subscribe(
      (res2) => {
        var count = Number(res2);
        console.log(count);
        this.teacherCount = count;
      }
    )
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


