import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../../entities/student';
import { StudentService } from '../../_services/student.service';
import { UserAuthService } from '../../_services/user-auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from '../../_services/notification.service';
import { UserService } from '../../_services/user.service';


@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {

  students: Student[] = [];
  displayedColumns: string[] = ['studentId', 'userName', 'name', 'age', 'birthDate', 'gender', 'address', 'phoneNo', 'email', 'classe', 'section', 'view'];
  displayedColumnsAdmin: string[] = ['studentId', 'userName', 'name', 'age', 'birthDate', 'gender', 'address', 'phoneNo', 'email', 'classe', 'section', 'edit', 'delete', 'view'];
  dataSource = new MatTableDataSource<Student>(this.students);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private studentService: StudentService,
    private router: Router,
    public userService: UserService,
    private userAuthService: UserAuthService,
    private notify: NotificationService) { }

  ngOnInit(): void {

    // this.students = [{
    // "id": 1,
    // "userName":"rup",
    // "password":"",
    // "name":"Ralph Del",
    // "email":"ralph@g.co"
    // },
    // {
    //   "id": 2,
    //   "userName":"rit",
    //   "password":"",
    //   "name":"Ritam Del",
    //   "email":"rit@g.co"
    // }];

    this.getStudents();
  }
  private getStudents() {
    this.studentService.listAllStudents().subscribe(data => {
      this.students = data;
    });
  }

  deleteStudent(studentId: string) {
    var ans = confirm("Are you sure to DELETE the details?");
    if (ans) {
      this.studentService.deleteStudent(studentId).subscribe(data => {
        console.log(data);
        this.notify.showSuccess("Details deleted successfully");
        this.getStudents();
      });
    }

  }

  studentDetails(studentId: string) {
    this.router.navigate(['viewStudent', studentId]);
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public isAdmin() {
    return this.userAuthService.isAdmin();
  }

}



  // updateStudent(id: number){
  //   this.router.navigate(['updateStudent', id]);

  // }



