import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeaveService } from '../../_services/leave.service';
import { NotificationService } from '../../_services/notification.service';
import { Leave } from '../../entities/leave';
import { StudentService } from 'src/app/_services/student.service';
import { Student } from 'src/app/entities/student';
import { UserService } from 'src/app/_services/user.service';
import { UserDetails } from 'src/app/entities/userDetails';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {

  leave: Leave = new Leave();
  student: Student;
  leaveForm: FormGroup;
  maxChars = 100;
  username: string;
  userDetails: UserDetails = new UserDetails();
  allDetails: User = new User();

  constructor(private fb: FormBuilder,
    private leaveService: LeaveService,
    private router: Router,
    private notify: NotificationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.getUserDetails();

    this.leaveForm = new FormGroup(
      {
        studentId: new FormControl('', [Validators.required, Validators.pattern('^[SMS]{3}[0-9]{3}$')]),
        studentName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{2}[a-zA-Z ]+')]),
        startDate: new FormControl(""),
        endDate: new FormControl(""),
        // reason: new FormControl("")
      },
      // [Validators.required, this.dateRangeValidator]
      [Validators.required]
      );
  }

  applyLeave() {
    this.leaveService.applyLeave(this.leave).subscribe(data => {
      // const stringData: string = JSON.stringify(data).toString();
      // console.log(JSON.parse(stringData)['404']);
      console.log(data);
      if (data === "EndDate must be greater than startDate") {
        this.notify.showError("EndDate must be greater than startDate");
      }
      else if (data === "Leave already applied for the same dates") {
        this.notify.showError("Leave already applied for the same dates");
      }
      else if (data === "Leave applied") {
        this.notify.showSuccess("Leave applied");
        this.router.navigate(['/studentDashboard']);
      }
      else {
        this.notify.showError("StudentId doesn't exist");
      }
    });
  }

  onSubmit() {
    // console.log(this.leave); //returns the leave object created
    this.applyLeave();
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

        this.leaveForm.patchValue({
          studentName: this.allDetails.name || '',
          studentId: this.allDetails.userID || ''

        });

      }
    );
  }


  
  private dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    let invalid = false;
    const startDate = this.leaveForm && this.leaveForm.get('startDate')?.value;
    const endDate = this.leaveForm && this.leaveForm.get('endDate')?.value;
    if (startDate && endDate) {
      invalid = new Date(startDate).valueOf() > new Date(endDate).valueOf();
    }
    return invalid ? { invalidRange: { startDate, endDate } } : null;
  };


}


  //   onSubmit() {
  //     const studentId = this.authService.getCurrentUser().id;
  //     const startDate = this.leaveForm.get('startDate').value;
  //     const endDate = this.leaveForm.get('endDate').value;
  //     const reason = this.leaveForm.get('reason').value;

  //     this.studentService.applyLeave(studentId, startDate, endDate, reason)
  //       .subscribe(() => {
  //         alert('Leave applied successfully!');
  //         this.router.navigate(['/dashboard']);
  //       }, error => {
  //         console.log(error);
  //         alert('Failed to apply leave!');
  //       });
  //   }