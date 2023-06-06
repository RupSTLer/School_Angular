import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationService } from '../../_services/notification.service';
import { TeacherService } from '../../_services/teacher.service';
import { UserAuthService } from '../../_services/user-auth.service';
import { Teacher } from '../../entities/teacher';

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.css']
})
export class ListTeacherComponent implements OnInit {

  teachers: Teacher[] = [];

  displayedColumns: string[] = ['teacherId', 'userName', 'name',  'age', 'birthDate', 'gender', 'address', 'phoneNo', 'email', 'department', 'view'];
  displayedColumnsAdmin: string[] = ['teacherId', 'userName', 'name', 'age', 'birthDate', 'gender', 'address', 'phoneNo', 'email', 'department', 'edit', 'delete', 'view'];
  dataSource = new MatTableDataSource<Teacher>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private userAuthService: UserAuthService,
    private notify: NotificationService) { }

  ngOnInit(): void {

    // this.teachers = [{
    //   "id": 1,
    //   "userName":"rup",
    //   "password":"",
    //   "name":"Ralph Del",
    //   "email":"ralph@g.co"
    // },
    // {
    //   "id": 2,
    //   "userName":"rit",
    //   "password":"",
    //   "name":"Ritam Del",
    //   "email":"rit@g.co"
    // }];

    this.getTeachers();
  }
  private getTeachers() {
    this.teacherService.listAllTeachers().subscribe(data => {
      this.teachers = data;
    });
  }

  deleteTeacher(teacherId: string) {
    var ans = confirm("Are you sure to DELETE the details?");
    if (ans) {
      this.teacherService.deleteTeacher(teacherId).subscribe(data => {
        console.log(data);
        this.notify.showSuccess("Details deleted successfully");
        this.getTeachers();
      });
    }
  }

  teacherDetails(teacherId: string) {
    this.router.navigate(['viewTeacher', teacherId]);
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public isAdmin() {
    return this.userAuthService.isAdmin();
  }



}



  // updateTeacher(id: number){
  //   this.router.navigate(['updateTeacher', id]);
  // }