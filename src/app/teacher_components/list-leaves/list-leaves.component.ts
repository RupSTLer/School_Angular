import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveService } from '../../_services/leave.service';
import { NotificationService } from '../../_services/notification.service';
import { Leave } from '../../entities/leave';

@Component({
  selector: 'app-list-leaves',
  templateUrl: './list-leaves.component.html',
  styleUrls: ['./list-leaves.component.css']
})
export class ListLeavesComponent implements OnInit {

  id: number;
  leaves: Leave[]=[];

  displayedColumns: string[] = ['id', 'studentId', 'startDate', 'endDate', 'reason', 'time', 'status', 'approve', 'reject'];
  dataSource = new MatTableDataSource<Leave>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(
    private leaveService: LeaveService, 
    private router: Router,
    private notify: NotificationService
    ) { }

  ngOnInit(): void {
    
    this.getLeaves();

    // this.route.params.subscribe(param => {
    //   this.id = param['id'];
    // });

    //creating dummy list for leaves
    // this.leaves = [{  }, {  }];

  }

  private getLeaves() {
    this.leaveService.listLeaves().subscribe( data => {
      this.leaves = data;
    });   
  }

  approve(id: number)
  { 
    var ans = confirm("Are you sure to APPROVE the leave?");
    if(ans)
    {
      this.leaveService.approveLeave(id).subscribe(
        data =>
        {
          console.log(data);
          // this.notify.showSuccess("Leave Approved..!");
          location.reload();
        }
      );
    }
  
  }

  reject(id: number)
  {
    var ans = confirm("Are you sure to REJECT the leave?");
    if(ans)
    {
      this.leaveService.rejectLeave(id).subscribe(
        data =>
        {
          console.log(data);
          // this.notify.showSuccess("Leave Rejected..!");
          location.reload();
        }
      );
    }
  }

}
