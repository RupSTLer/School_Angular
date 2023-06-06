import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeeService } from '../../_services/fee.service';
import { NotificationService } from '../../_services/notification.service';
import { UserService } from '../../_services/user.service';
import { Fee } from '../../entities/fee';
import { User } from '../../entities/user';
import { UserDetails } from '../../entities/userDetails';

@Component({
  selector: 'app-pay-fees',
  templateUrl: './pay-fees.component.html',
  styleUrls: ['./pay-fees.component.css']
})
export class PayFeesComponent implements OnInit {

  // payFeesForm: FormGroup;
  
  stuName: string;
  username: string;
  userDetails: UserDetails = new UserDetails();
  fee: Fee = new Fee();
  allDetails: User = new User();
  // allDetails: User = new User();

  constructor(private fb: FormBuilder,
    private feeService: FeeService,
    private router: Router,
    private notify: NotificationService,
    private userService: UserService) { }


  ngOnInit(): void {
    this.getUserDetails();

    // this.payFeesForm = this.fb.group({
    //   studentId: ['', [Validators.required, Validators.pattern('^[SMS]{3}[0-9]{3}$')]],
    //   studentName: new FormControl(this.allDetails.name || '', [Validators.required, Validators.pattern('[a-zA-Z]{2}[a-zA-Z ]+')]),
    //   amount: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+[\.]?[0-9]{0,2}$')]),
    //   feeType: new FormControl('', Validators.required),
    //   paymentType: new FormControl('', Validators.required),
    // });
  }

  payFeesForm = new FormGroup({
    studentId: new FormControl('', [Validators.required, Validators.pattern('^[SMS]{3}[0-9]{3}$')]),
    studentName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{2}[a-zA-Z ]+')]),
    amount: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+[\.]?[0-9]{0,2}$')]),
    feeType: new FormControl('', Validators.required),
    paymentType: new FormControl('', Validators.required),
  });

  // getter for validation
  get studentId() {
    return this.payFeesForm.get('studentId');
  }
  get studentName() {
    return this.payFeesForm.get('studentName');
  }
  get amount() {
    return this.payFeesForm.get('amount');
  }
  get feeType() {
    return this.payFeesForm.get('feeType');
  }
  get paymentType() {
    return this.payFeesForm.get('paymentType');
  }

  fillAmount()
  {
    if(this.fee.feeType === 'Monthly')
    {
      this.fee.amount = 3333;
    }
    if(this.fee.feeType === 'Quarterly')
    {
      this.fee.amount = 6666;
    }
    if(this.fee.feeType === 'Yearly')
    {
      this.fee.amount = 9999;
    }
  }



  payFees() {
    this.feeService.payFees(this.fee).subscribe(data => {
      // console.log(data);
      if (data === "Fees paid successfully..") {
        this.notify.showSuccess("Fees paid successfully");
        this.router.navigate(['/studentDashboard']);
      }
      else if(data === "Fees already paid")
      {
        this.notify.showError("Fees already paid");
      }
      else {
        this.notify.showError("StudentId doesn't exist");
      }
    });
  }

  onSubmit() {
    // console.log(this.fee);   //returns the fees object created
    this.payFees();
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
        console.log(this.allDetails);
        console.log(this.allDetails.email);
        console.log(this.allDetails.userID);

        this.payFeesForm.patchValue({
          studentName: this.allDetails.name || '',
          studentId: this.allDetails.userID || ''

        });

      }
    );
  }



}
