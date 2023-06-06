import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentComponent } from './add-student.component';
import { StudentService } from '../../_services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../_services/notification.service';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AddStudentComponent', () => {
  let component: AddStudentComponent;
  let fixture: ComponentFixture<AddStudentComponent>;
  // let studentServiceSpy: jest.Mocked<StudentService>;
  let studentService: StudentService;

  beforeEach(async () => {

    //a spy object for the studentservice
    // const spy = {
    //   addStudent: jest.fn()
    // };

    await TestBed.configureTestingModule({
      declarations: [AddStudentComponent],
      providers: [HttpClient, HttpHandler, StudentService, MatSnackBar, NotificationService],
      // imports: [FormsModule, HttpClientTestingModule, ToastrModule.forRoot(), ReactiveFormsModule], { provide: StudentService, useValue: spy}
      imports: [ToastrModule.forRoot(), FormsModule, ReactiveFormsModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // studentServiceSpy = TestBed.inject(StudentService) as jest.Mocked<StudentService>;
    studentService = TestBed.inject(StudentService);

    //mock the service method to return a dummy observable
    // studentServiceSpy.addStudent.mockReturnValue(of({}));

    // call ngOnInit to initialize the component and set the fields value
    // component.ngOnInit();
    // Object.defineProperty(component, 'userName', {writable: true});
    // component.userName = 'rup123';

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call addStudent method with valid inputs', () => {

    const studentServiceSpy = jest.spyOn(studentService, 'addStudent');
    //set valid inputs
    component.student.userName = "rup123";
    component.student.password = 'Rup@pass';
    component.student.name = 'Rupam Chakraborty';
    component.student.email = 'rup@gm.co';

    //trigger the function call
    component.addStudent();

    //expect the addStudent method to be called with the expected parameters
    expect(studentServiceSpy).toHaveBeenCalledWith({
      userName: 'rup123',
      password: 'Rup@pass',
      name: 'Rupam Chakraborty',
      email: 'rup@gm.co'

    });

    // expect(studentServiceSpy.addStudent).toHaveBeenCalledTimes(1);

  });


  it('should not call addStudent method with invalid inputs', () => {

    const studentServiceSpy = jest.spyOn(studentService, 'addStudent');
    //set valid inputs
    component.student.userName = '';
    component.student.password = 'Rup@pass';
    component.student.name = 'Rupam Chakraborty';
    component.student.email = 'rup@gm.co';

    //trigger the function call
    component.addStudent();

    //expect the addStudent method not to be called
    expect(studentServiceSpy).not.toHaveBeenCalledWith({

      userName: 'rup123',
      password: 'Rup@pass',
      name: 'Rupam Chakraborty',
      email: 'rup@gm.co'

    });

  });

});
