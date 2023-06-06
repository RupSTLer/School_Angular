import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../../entities/student';
import { StudentService} from '../../_services/student.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../_services/notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  
  student: Student = new Student();
  submitted=false;
  visible: boolean=true;
  hide: boolean = true;

  viewPass()
  {
    this.visible = !this.visible;
    this.hide = !this.hide;
  }

  constructor(
    private studentService: StudentService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private notify:NotificationService,
    private toaster: ToastrService
    ) { }

  ngOnInit(): void {
  }

  addForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]{4,}')]),
    password: new FormControl('',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).{5,}')]),
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
    age: new FormControl('', [Validators.required, Validators.min(6), Validators.max(18)]),
    birthDate: new FormControl('', [Validators.required, Validators.pattern('')]),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 .,-]+$')]),
    phoneNo: new FormControl('', [Validators.required, Validators.pattern('(0|91)?[6-9][0-9]{9}')]),
    email: new FormControl('',[Validators.required, Validators.email, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$')]),
    classe: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{3,}')]),
    section: new FormControl('', [Validators.required, Validators.pattern('[A-D]')]),

  });



  // getter for validation
  get userName()
  {
    return this.addForm.get('userName');
  }
  get password()
  {
    return this.addForm.get('password');
  }
  get name()
  {
    return this.addForm.get('name');
  }
  get age()
  {
    return this.addForm.get('age');
  }
  get birthDate()
  {
    return this.addForm.get('birthDate');
  }
  get gender()
  {
    return this.addForm.get('gender');
  }
  get address()
  {
    return this.addForm.get('address');
  }
  get phoneNo()
  {
    return this.addForm.get('phoneNo');
  }
  get email()
  {
    return this.addForm.get('email');
  }
  get classe()
  {
    return this.addForm.get('classe');
  }
  get section()
  {
    return this.addForm.get('section');
  }


  addStudent(){

    this.submitted = true;

    this.studentService.addStudent(this.student).subscribe(data =>{
      console.log(data);
      if(data === "Username already exists")
      {
        this.notify.showError(this.student.userName + " :username already exist");
      }
      else if(data === "Email already exists")
      {
        this.notify.showError(this.student.email + " :email already exist");
      }
      else if(data === "PhoneNo already exists")
      {
        this.notify.showError(this.student.phoneNo + " :phoneno already exist");
      }
      else if(data === "Invalid date. Date must be in between 2010 to 2020")
      {
        this.notify.showError(this.student.birthDate + " :birthdate is invalid. Date must be in between 2010 to 2020");
      }
      else if(data === "Student added successfully")
      {
        this.notify.showSuccess(this.student.name + " is successfully added");
        this.goToStudentList();
      }

    }); 
  }

  goToStudentList(){
    this.router.navigate(['/listStudent']); //router provides a navigate method and through navigate method we can pass a path we are going to navigate
  }

  onSubmit()
  {
    console.log(this.student);
    this.addStudent();
  }

 
}

// this.emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"

 // addForm: FormGroup;
    // this.addForm = this.formBuilder.group({
    //   userName: ['',[Validators.required, Validators.pattern('[a-zA-Z0-9]{4,}')]],
    //   password: ['', Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).{5,}')],
    //   name: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
    //   age: ['', [Validators.required, Validators.min(6), Validators.max(18)]],
    //   birthDate: ['', [Validators.required, Validators.pattern('')]],
    //   gender: ['', [Validators.required]],
    //   address: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 .,-]+$')]],
    //   phoneNo: ['', [Validators.required, Validators.pattern('(0|91)?[6-9][0-9]{9}')]],
    //   email: ['',[Validators.required, Validators.email, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$')]],
    //   classe: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3,}')]],
    //   section: ['', [Validators.required, Validators.pattern('[A-D]')]]
       
    // });
    

    
   

