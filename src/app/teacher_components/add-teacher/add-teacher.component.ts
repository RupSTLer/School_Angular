import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../_services/notification.service';
import { TeacherService } from '../../_services/teacher.service';
import { Teacher } from '../../entities/teacher';


@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  hide = true;
  teacher: Teacher = new Teacher();

  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private notify: NotificationService) { }

  ngOnInit(): void {

  }

  addForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]{4,}')]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).{5,}')]),
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
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
    return this.addForm.get('userName');
  }
  get password() {
    return this.addForm.get('password');
  }
  get name() {
    return this.addForm.get('name');
  }
  get age() {
    return this.addForm.get('age');
  }
  get birthDate() {
    return this.addForm.get('birthDate');
  }
  get gender() {
    return this.addForm.get('gender');
  }
  get address() {
    return this.addForm.get('address');
  }
  get phoneNo() {
    return this.addForm.get('phoneNo');
  }
  get email() {
    return this.addForm.get('email');
  }
  get department() {
    return this.addForm.get('department');
  }


  addTeacher() {
    this.teacherService.addTeacher(this.teacher).subscribe(data => {
      console.log(data);
      if(data === "Username already exists")
      {
        this.notify.showError(this.teacher.userName + " :username already exist");
      }
      else if(data === "Email already exists")
      {
        this.notify.showError(this.teacher.email + " :email already exist");
      }
      else if(data === "PhoneNo already exists")
      {
        this.notify.showError(this.teacher.phoneNo + " :phoneno already exist");
      }
      else if(data === "Invalid date. Date must be in between 2010 to 2020")
      {
        this.notify.showError(this.teacher.birthDate + " :birthdate is invalid. Date must be in between 2010 to 2020");
      }
      else if(data === "Teacher added successfully")
      {
        this.notify.showSuccess(this.teacher.name + " is successfully added");
        this.goToTeacherList();
      }
       
    });
  }

  goToTeacherList() {
    this.router.navigate(['/listTeacher']); //router provides a navigate method and through navigate method we can pass a path we are going to navigate
  }

  onSubmit() {
    console.log(this.teacher);
    this.addTeacher();
  }


}
