import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LeaveService } from '../../_services/leave.service';
import { NotificationService } from '../../_services/notification.service';
import { Leave } from '../../entities/leave';
import { UserDetails } from 'src/app/entities/userDetails';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-my-leaves',
  templateUrl: './my-leaves.component.html',
  styleUrls: ['./my-leaves.component.css']
})
export class MyLeavesComponent implements OnInit {

  id: number;
  leaves: Leave[]=[];
  userDetails: UserDetails = new UserDetails();
  allDetails: User = new User();

  displayedColumns: string[] = ['id', 'studentId', 'studentName', 'startDate', 'endDate', 'reason', 'time', 'status'];
  dataSource = new MatTableDataSource<Leave>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(
    private leaveService: LeaveService, 
    private notify: NotificationService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getLeaveDetailsByStudentId(studentId: string) {
    this.leaveService.getLeaveDetailsByStudentId(studentId).subscribe(data => {
      // console.log(data);
      this.leaves = data;
    });
  }


  getUserDetails() {
    this.userService.getUserDetails().subscribe(
      data => {
        // console.log(data);
        this.userDetails = data;
        // console.log(this.userDetails.username);
        this.getAllDetailsByUserName(this.userDetails.username);
      },
    );
  }

  getAllDetailsByUserName(username: string) {
    this.userService.getAllDetailsByUserName(username).subscribe(
      (data:any) => {
        this.allDetails = data;
        // console.log(this.allDetails);
        // console.log(this.allDetails.userID);
        this.getLeaveDetailsByStudentId(this.allDetails.userID);
      }
    );
  }




  

}
