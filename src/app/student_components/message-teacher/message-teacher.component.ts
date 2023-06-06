import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/_services/message.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { StudentService } from 'src/app/_services/student.service';
import { TeacherService } from 'src/app/_services/teacher.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import { Message } from 'src/app/entities/message';
import { Teacher } from 'src/app/entities/teacher';
import { User } from 'src/app/entities/user';
import { UserDetails } from 'src/app/entities/userDetails';

@Component({
  selector: 'app-message-teacher',
  templateUrl: './message-teacher.component.html',
  styleUrls: ['./message-teacher.component.css']
})
export class MessageTeacherComponent implements OnInit{

  id: number;
  msg: Message = new Message();
  teacher: Teacher;
  sendMessageForm: FormGroup;
  teachers: Teacher[]=[];
  maxChars = 100;

  username: string;
  userDetails: UserDetails = new UserDetails();
  allDetails: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private router: Router,
    private userAuthService: UserAuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private studentservice: StudentService,
    private messageSer: MessageService,
    private notify: NotificationService,
    private activeR: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUserDetails();

    this.sendMessageForm = this.formBuilder.group({
      teacher: ['', Validators.required],
      message: ['', Validators.required]
    });
    // this.id = this.route.snapshot.params['id'];

    // this.teachers = new Teacher();

    // this.route.params.subscribe(param => {
    //   this.id = param['id'];
    // });
    // this.teacherService.getTeacherById(this.id).subscribe( (data:any) => {
    //    this.teachers = data;
    // });

    this.teacherService.listAllTeachers().subscribe(data => {
      this.teachers = data;
   });


    // this.teacherService.getTeacherById(this.id).subscribe(data => {
    //   this.teachers = data;
    // });

    //    this.teachers = [{
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
  }

  addMsg()
  {
    // this.msg.senderId = localStorage.getItem('userID')?.toString();
    this.msg.senderId = this.allDetails.userID;
    this.messageSer.addMessage(this.msg).subscribe( (data:any) => {
      // console.log(data);
      // this.msg = data;
    });  

    this.notify.showSuccess("Message sent successfully..");
    this.router.navigate(['/studentDashboard']);
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
        // console.log(data);
        this.allDetails = data;
        // console.log(this.allDetails);
        // console.log(this.allDetails.email);
        // console.log(this.allDetails.userID);
        localStorage.setItem('userID', this.allDetails.userID);
        // this.addMsg(this.allDetails.userID);
      }
    );
  }

}
