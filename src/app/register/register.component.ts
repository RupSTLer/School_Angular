import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  
  hide = true;
  
  constructor(
    private userService: UserService, 
    private router: Router,
    private notify: NotificationService) { }

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
    department: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{3,}')]),

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
  get department() {
    return this.addForm.get('department');
  }








  register(registerForm: NgForm) 
  {
    console.log(registerForm.value);
    this.userService.register(registerForm.value).subscribe(
      (response) => {
        this.notify.showSuccess("Registered Successfully!")
        this.router.navigate(['/login']);
        // console.log(registerForm.value);
      },

    );
  }

}
