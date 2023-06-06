import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../_services/notification.service';
import { ToastrModule } from 'ngx-toastr';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AddTeacherComponent } from './add-teacher.component';
import { TeacherService } from '../../_services/teacher.service';

describe('AddTeacherComponent', () => {
  let component: AddTeacherComponent;
  let fixture: ComponentFixture<AddTeacherComponent>;
  let teacherService: TeacherService;

  beforeEach(async () => {

    //a spy object for the teacherservice
    // const spy = {
    //   addTeacher: jest.fn()
    // };

    await TestBed.configureTestingModule({
      declarations: [AddTeacherComponent],
      providers: [HttpClient, HttpHandler, TeacherService, MatSnackBar, NotificationService],
      // imports: [FormsModule, HttpClientTestingModule, ToastrModule.forRoot(), ReactiveFormsModule], { provide: StudentService, useValue: spy}
      imports: [ToastrModule.forRoot(), FormsModule, ReactiveFormsModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    teacherService = TestBed.inject(TeacherService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call addTeacher method with valid inputs', () => {

    const teacherServiceSpy = jest.spyOn(teacherService, 'addTeacher');
    //set valid inputs
    component.teacher.userName = "rup123";
    component.teacher.password = 'Rup@pass';
    component.teacher.name = 'Rupam Chakraborty';
    component.teacher.email = 'rup@gm.co';

    //trigger the function call
    component.addTeacher();

    //expect the addStudent method to be called with the expected parameters
    expect(teacherServiceSpy).toHaveBeenCalledWith({
      userName: 'rup123',
      password: 'Rup@pass',
      name: 'Rupam Chakraborty',
      email: 'rup@gm.co'

    });

    // expect(studentServiceSpy.addStudent).toHaveBeenCalledTimes(1);

  });


  it('should not call addStudent method with invalid inputs', () => {

    const teacherServiceSpy = jest.spyOn(teacherService, 'addTeacher');
    //set valid inputs
    component.teacher.userName = "";
    component.teacher.password = 'Rup@pass';
    component.teacher.name = 'Rupam Chakraborty';
    component.teacher.email = 'rup@gm.co';

    //trigger the function call
    component.addTeacher();

    //expect the addStudent method not to be called
    expect(teacherServiceSpy).not.toHaveBeenCalledWith({

      userName: 'rup123',
      password: 'Rup@pass',
      name: 'Rupam Chakraborty',
      email: 'rup@gm.co'

    });

  });

});
