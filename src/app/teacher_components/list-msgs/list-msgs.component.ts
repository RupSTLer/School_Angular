import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MessageService } from '../../_services/message.service';
import { NotificationService } from '../../_services/notification.service';
import { Message } from '../../entities/message';


@Component({
  selector: 'app-list-msgs',
  templateUrl: './list-msgs.component.html',
  styleUrls: ['./list-msgs.component.css']
})

export class ListMsgsComponent implements OnInit {

  allMsgs: Message[]=[];
  myMsgs: Message[]=[];
  senderId: string;

  displayedColumns: string[] = ['id','senderId', 'receiverId', 'message', 'time'];
  dataSource = new MatTableDataSource<Message>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(
    private msgService: MessageService, 
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

    this.getAllMsgs();
  }
  getAllMsgs() {
    this.msgService.getMessages().subscribe( data => {
      console.log(data);
      this.allMsgs = data;
    });
  }

}
