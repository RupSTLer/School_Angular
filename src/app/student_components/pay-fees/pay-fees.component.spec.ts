import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayFeesComponent } from './pay-fees.component';
import { StudentService } from '../../_services/student.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../_services/notification.service';
import { Fee } from 'src/app/entities/fee';

describe('PayFeesComponent', () => {
  let component: PayFeesComponent;
  let fixture: ComponentFixture<PayFeesComponent>;
  let studentService: StudentService;

  beforeEach(async () => {

    const spy = {
      payFees: jest.fn()
    };

    await TestBed.configureTestingModule({
        declarations: [PayFeesComponent],
        providers: [HttpClient, HttpHandler, StudentService, MatSnackBar, NotificationService],
        imports: [ToastrModule.forRoot()],
    })
        .compileComponents();

    fixture = TestBed.createComponent(PayFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    studentService = TestBed.inject(StudentService);
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save the payment details to backend', () => {

  //  const payFees: any[] = [];
    const studentServiceSpy = jest.spyOn(studentService, 'payFees');
    //set valid inputs
    component.fee.id = 3;
    component.fee.studentId = "SMS001";
    component.fee.studentName = "Rupam";
    component.fee.amount = 7890;
    component.fee.feeType = "Monthly";
    component.fee.paymentType = "Cash";
    component.fee.time = "01-05-2023 18:55";

    //trigger the function call
    component.payFees();

    //expect the addStudent method to be called with the expected parameters
    expect(studentServiceSpy).toHaveBeenCalledWith({
      id: 3,
      studentId: "SMS001",
      studentName: "Rupam",
      amount: 7890,
      feeType: "Monthly",
      paymentType: "Cash",
      time: "01-05-2023 18:55"

    });

    // expect(studentServiceSpy.addStudent).toHaveBeenCalledTimes(1);

  });
});
