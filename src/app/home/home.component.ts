import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { StudentService } from '../_services/student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  news: any[] = [];


  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    // this.events;
  
  }

  // viewDate: Date = new Date();

  // events: CalendarEvent[] = [
  //   {
  //     title: 'Event 1',
  //     start: new Date(),
  //     color: {
  //       primary: '#e3bc08',
  //       secondary: '#FDF1BA'
  //     }
  //   },
  //   {
  //     title: 'Event 2',
  //     start: new Date(),
  //     color: {
  //       primary: '#1e90ff',
  //       secondary: '#D1E8FF'
  //     }
  //   },
  //   {
  //     title: 'Event 2',
  //     start: new Date(),
  //     color: {
  //       primary: '#1e90ff',
  //       secondary: '#D1E8FF'
  //     }
  //   }
  // ];

  

  // showNews()
  // {
  //   this.studentService.getAllNews().subscribe(
  //     (data) => {
  //       console.log(data);
  //       this.news = data;
  //     }
  //   )
  // }


}
