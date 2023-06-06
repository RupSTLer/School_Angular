import { Component, OnInit } from '@angular/core';
import { StudentService } from '../_services/student.service';
import { News } from '../entities/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  componentName = "news";
  news: News[]=[];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {

    this.news = [{
      "title": "Holiday",
      "body": "Holiday due to Independence Day",
      "date": "15-08-2023"
    }
    ];
    // this.getAllNews();
  }


  // getAllNews() {
  //   this.studentService.getAllNews().subscribe(
  //     (data) => {
  //       console.log(data);
  //       this.news = data;
  //     }
  //   );
  // }

}
