import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from 'src/app/_services/teacher.service';
import { Teacher } from 'src/app/entities/teacher';

@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.css']
})
export class ViewTeacherComponent {

  teacherId: string;
  teacher: Teacher
  constructor(private route: ActivatedRoute, private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.teacherId = this.route.snapshot.params['teacherId'];

    this.teacher = new Teacher();
    this.teacherService.getTeacherByTeacherId(this.teacherId).subscribe(data => {
      this.teacher = data;
    });
  }

}
