import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FeeService } from '../../_services/fee.service';
import { NotificationService } from '../../_services/notification.service';
import { Fee } from '../../entities/fee';
import { UserDetails } from 'src/app/entities/userDetails';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-my-fees',
  templateUrl: './my-fees.component.html',
  styleUrls: ['./my-fees.component.css']
})
export class MyFeesComponent implements OnInit {

  fees: Fee[] = [];
  userDetails: UserDetails = new UserDetails();
  allDetails: User = new User();
  length: number;

  displayedColumns: string[] = ['id', 'studentId', 'studentName', 'feeType', 'amount', 'paymentType', 'time'];
  dataSource = new MatTableDataSource<Fee>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(
    private feeService: FeeService,
    private notify: NotificationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getFeesByStudentId(studentId: string) {
    this.feeService.getFeesByStudentId(studentId).subscribe(data => {
      // console.log(data);
      this.fees = data;
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
      data => {
        this.allDetails = data;
        // console.log(this.allDetails);
        // console.log(this.allDetails.userID);
        this.getFeesByStudentId(this.allDetails.userID);
      }
    );
  }

}
