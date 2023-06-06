import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyLeaveComponent } from './apply-leave.component';
import { LeaveService } from '../../_services/leave.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../_services/notification.service';
import { ToastrModule } from 'ngx-toastr';

describe('ApplyLeaveComponent', () => {
  let component: ApplyLeaveComponent;
  let fixture: ComponentFixture<ApplyLeaveComponent>;
  let service: LeaveService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyLeaveComponent ],
      imports: [FormsModule, HttpClientTestingModule, ToastrModule.forRoot(), ReactiveFormsModule],
      providers: [LeaveService, MatSnackBar, NotificationService]
    })
    .compileComponents();
    service=TestBed.inject(LeaveService);

    fixture = TestBed.createComponent(ApplyLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the startDate field correctly', () => {
    const testStartDate = '2023-05-17';

    const inputElement = fixture.nativeElement.querySelector('#startDate');
    inputElement.value = testStartDate;
    inputElement.dispatchEvent(new Event('input'));
    expect(component.leave.startDate).toEqual(testStartDate);
  })

  it('should update the endDate field correctly', () => {
    const testEndDate = '2023-05-20';

    const inputElement = fixture.nativeElement.querySelector('#endDate');
    inputElement.value = testEndDate;
    inputElement.dispatchEvent(new Event('input'));
    expect(component.leave.endDate).toEqual(testEndDate);
  });

  it('should update the reason field correctly', () => {
    const testReason = 'vacation';

    const inputElement = fixture.nativeElement.querySelector('#reason');
    inputElement.value = testReason;
    inputElement.dispatchEvent(new Event('input'));
    expect(component.leave.reason).toEqual(testReason);
  });

  it('should submit the leave form', async () => {
    const testStartDate = '2023-05-17';
    const testEndDate = '2023-05-20';
    const testReason = 'vacation';

    component.leave.startDate = testStartDate;
    component.leave.endDate = testEndDate;
    component.leave.reason = testReason;

    jest.spyOn(component, 'onSubmit');

    const submitButton = fixture.nativeElement.querySelector('button');
    submitButton.click();

    // expect(component.onSubmit).toHaveBeenCalled();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
    expect(component.onSubmit).toHaveBeenCalledWith({
      startDate: testStartDate,
      endDate: testEndDate,
      reason: testReason
    });
  });

  

  it('valid leave application submission', ()=> {
    const leaveForm = fixture.nativeElement.querySelector('form');
    const startDateInput = fixture.nativeElement.querySelector('#startDate');
    const endDateInput = fixture.nativeElement.querySelector('#endDate');

    startDateInput.value = '2023-05-17';
    endDateInput.value = '2023-05-19';

    startDateInput.dispatchEvent(new Event('input'));
    endDateInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    leaveForm.dispatchEvent(new Event('submit'));
    fixture.detectChanges();


  });

  it('Invalid leave application submission for invalid date range', ()=> {

    const leaveForm = fixture.nativeElement.querySelector('form');
    const startDateInput = fixture.nativeElement.querySelector('#startDate');
    const endDateInput = fixture.nativeElement.querySelector('#endDate');

    startDateInput.value = '2023-05-17';
    endDateInput.value = '2023-05-15';

    startDateInput.dispatchEvent(new Event('input'));
    endDateInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    leaveForm.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.nativeElement.querySelector('p');
    expect(errorMessage?.textContent).toContain('Please add a valid date range');

    expect(startDateInput.value).not.toBe('');
    expect(endDateInput.value).not.toBe('');
  });

});
