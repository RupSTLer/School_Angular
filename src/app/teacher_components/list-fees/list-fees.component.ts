import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FeeService } from '../../_services/fee.service';
import { NotificationService } from '../../_services/notification.service';
import { Fee } from '../../entities/fee';

@Component({
  selector: 'app-list-fees',
  templateUrl: './list-fees.component.html',
  styleUrls: ['./list-fees.component.css']
})
export class ListFeesComponent implements OnInit {

  fees: Fee[]=[];

  displayedColumns: string[] = ['id', 'studentId', 'studentName', 'feeType', 'amount', 'paymentType', 'time'];
  dataSource = new MatTableDataSource<Fee>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(
    private feeService: FeeService, 
    private router: Router,
    private notify: NotificationService 
    ) { }

  ngOnInit(): void {

    // this.fees = [{
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

    this.getFees();
  }
  private getFees() {
    this.feeService.listFees().subscribe( data => {
      console.log(data);
      this.fees = data;
    });
  }

}
