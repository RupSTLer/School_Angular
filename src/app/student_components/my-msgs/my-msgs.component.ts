import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '../../_services/message.service';
import { NotificationService } from '../../_services/notification.service';
import { Message } from '../../entities/message';
import { UserDetails } from 'src/app/entities/userDetails';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-my-msgs',
  templateUrl: './my-msgs.component.html',
  styleUrls: ['./my-msgs.component.css']
})

export class MyMsgsComponent implements OnInit {

  myMsgs: Message[]=[];
  userDetails: UserDetails = new UserDetails();
  allDetails: User = new User();

  displayedColumns: string[] = ['id','senderId', 'receiverId', 'message', 'time'];
  dataSource = new MatTableDataSource<Message>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private msgService: MessageService, 
    private notify: NotificationService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getMsgsBySenderId(senderId: string) {
    this.msgService.getMsgBySenderId(senderId).subscribe( data => {
      console.log(data);
      console.log(senderId);
      this.myMsgs = data;
    });
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
        // console.log(this.allDetails);
        // console.log(this.allDetails.userID);
        this.getMsgsBySenderId(this.allDetails.userID);
      }
    );
  }


}
