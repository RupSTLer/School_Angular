import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../_services/notification.service';
import { TeacherService } from '../../_services/teacher.service';
import { Teacher } from '../../entities/teacher';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css']
})
export class UpdateTeacherComponent implements OnInit {

  teacherId: string;
  teacher: Teacher = new Teacher();
  hide = true;

  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private route: ActivatedRoute,
    private notify: NotificationService) { }

  ngOnInit(): void {

    this.route.params.subscribe(param => {
      this.teacherId = param['teacherId'];
    });
    this.teacherService.getTeacherByTeacherId(this.teacherId).subscribe(data => {
      this.teacher = <Teacher>data;
    })
  }

  updateForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]{4,}')]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).{5,}')]),
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
    teacherID: new FormControl('', [Validators.required, Validators.pattern('')]),
    age: new FormControl('', [Validators.required, Validators.min(6), Validators.max(18)]),
    birthDate: new FormControl('', [Validators.required, Validators.pattern('')]),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 .,-]+$')]),
    phoneNo: new FormControl('', [Validators.required, Validators.pattern('(0|91)?[6-9][0-9]{9}')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$')]),
    department: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{3,}')]),

  });



  // getter for validation
  get userName() {
    return this.updateForm.get('userName');
  }
  get password() {
    return this.updateForm.get('password');
  }
  get name() {
    return this.updateForm.get('name');
  }
  get teacherID() {
    return this.updateForm.get('teacherID');
  }
  get age() {
    return this.updateForm.get('age');
  }
  get birthDate() {
    return this.updateForm.get('birthDate');
  }
  get gender() {
    return this.updateForm.get('gender');
  }
  get address() {
    return this.updateForm.get('address');
  }
  get phoneNo() {
    return this.updateForm.get('phoneNo');
  }
  get email() {
    return this.updateForm.get('email');
  }
  get department() {
    return this.updateForm.get('department');
  }

  updateTeacher() {
    var ans = confirm("Are you sure to UPDATE the teacher details?");
    if (ans) {
      this.teacherService.updateTeacher(this.teacherId, this.teacher).subscribe(data => {
        console.log(data);
        if (data === "Username already exists") {
          this.notify.showError(this.teacher.userName + " :username already exist");
        }
        else if (data === "Email already exists") {
          this.notify.showError(this.teacher.email + " :email already exist");
        }
        else if (data === "PhoneNo already exists") {
          this.notify.showError(this.teacher.phoneNo + " :phoneno already exist");
        }
        else if (data === "Invalid date. Date must be in between 2010 to 2020") {
          this.notify.showError(this.teacher.birthDate + " :birthdate is invalid. Date must be in between 2010 to 2020");
        }
        else if (data === "Teacher details updated successfully") {
          this.notify.showSuccess(this.teacher.userName + " updated successfully");
          this.goToTeacherList();
        }

      });
    }
  }

  goToTeacherList() {
    this.router.navigate(['/listTeacher']); //router provides a navigate method and through navigate method we can pass a path we are going to navigate
  }


}
