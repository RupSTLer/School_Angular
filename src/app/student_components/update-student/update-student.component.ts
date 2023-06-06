import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../_services/notification.service';
import { StudentService } from '../../_services/student.service';
import { Student } from '../../entities/student';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})

export class UpdateStudentComponent implements OnInit {

  studentId: string;
  student: Student = new Student();
  hide = true;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notify: NotificationService) { }


  ngOnInit(): void {

    this.route.params.subscribe(param => {
      this.studentId = param['studentId'];
    });
    this.studentService.getStudentByStudentId(this.studentId).subscribe(data => {
      this.student = <Student>data;
    })
  }

  updateForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]{4,}')]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).{5,}')]),
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
    studentID: new FormControl('', [Validators.required, Validators.pattern('')]),
    age: new FormControl('', [Validators.required, Validators.min(6), Validators.max(18)]),
    birthDate: new FormControl('', [Validators.required, Validators.pattern('')]),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 .,-]+$')]),
    phoneNo: new FormControl('', [Validators.required, Validators.pattern('(0|91)?[6-9][0-9]{9}')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$')]),
    classe: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{3,}')]),
    section: new FormControl('', [Validators.required, Validators.pattern('[A-D]')]),

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
  get studentID() {
    return this.updateForm.get('studentID');
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
  get classe() {
    return this.updateForm.get('classe');
  }
  get section() {
    return this.updateForm.get('section');
  }


  updateStudent() {
    var ans = confirm("Are you sure to UPDATE the student details?");
    if (ans) {
      this.studentService.updateStudent(this.studentId, this.student).subscribe(data => {
        if (data === "Username already exists") {
          this.notify.showError(this.student.userName + " :username already exist");
        }
        else if (data === "Email already exists") {
          this.notify.showError(this.student.email + " :email already exist");
        }
        else if (data === "PhoneNo already exists") {
          this.notify.showError(this.student.phoneNo + " :phoneno already exist");
        }
        else if (data === "Invalid date. Date must be in between 2010 to 2020") {
          this.notify.showError(this.student.birthDate + " :birthdate is invalid. Date must be in between 2010 to 2020");
        }
        else if (data === "Student details updated successfully") {
          this.notify.showSuccess(this.student.userName + " updated successfully");
          this.goToStudentList();
        }

      });
    }
  }

  goToStudentList() {
    this.router.navigate(['/listStudent']); //router provides a navigate method and through navigate method we can pass a path we are going to navigate
  }

}
