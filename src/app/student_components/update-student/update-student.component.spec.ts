import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudentComponent } from './update-student.component';
import { StudentService } from '../../_services/student.service';
import { of } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../_services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UpdateStudentComponent', () => {
  let component: UpdateStudentComponent;
  let fixture: ComponentFixture<UpdateStudentComponent>;
  let studentService: StudentService;

  const fakeActivatedRoute = {

  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [UpdateStudentComponent],
        providers: [HttpClient, HttpHandler, StudentService, MatSnackBar, NotificationService, {provide: ActivatedRoute, useValue: fakeActivatedRoute}],
        imports: [ToastrModule.forRoot(), FormsModule, ReactiveFormsModule],
    })
        .compileComponents();

    fixture = TestBed.createComponent(UpdateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    studentService = TestBed.inject(StudentService);
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should call updateStudent method with valid inputs', () => {

    const studentServiceSpy = jest.spyOn(studentService, 'updateStudent').mockReturnValue(of({success: true}));
    //set valid inputs

    const testStudentId = 'SMS002';
    // const testUpdateDetails = { name: 'Rupam Del', email: 'rup@g.co'};
    // component.student.id = 3;
    component.student.studentId = testStudentId;
    component.student.userName = "rup123";
    component.student.password = 'Rup@pass';
    component.student.name = 'Rupam Chakraborty';
    component.student.email = 'rup@gm.co';


    //trigger the function call
    component.updateStudent();

    //expect the addStudent method to be called with the expected parameters
    expect(studentServiceSpy).toHaveBeenCalledWith({
      // id: 3,
      studentId: 'SMS002',
      userName: 'rup123',
      password: 'Rup@pass',
      name: 'Rupam Chakraborty',
      email: 'rup@gm.co'
    });

    // expect(studentServiceSpy.addStudent).toHaveBeenCalledTimes(1);

  });

});
