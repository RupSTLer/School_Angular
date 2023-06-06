import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentComponent } from './list-student.component';
import { StudentService } from '../../_services/student.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../_services/notification.service';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';


describe('ListStudentComponent', () => {
    let component: ListStudentComponent;
    let fixture: ComponentFixture<ListStudentComponent>;
    let studentService: StudentService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListStudentComponent],
            providers: [HttpClient, HttpHandler, StudentService, MatSnackBar, NotificationService],
            imports: [ToastrModule.forRoot()],
        })
            .compileComponents();

        fixture = TestBed.createComponent(ListStudentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        studentService = TestBed.inject(StudentService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch the mocked student list using listStudent method', () => {
        //mocking the student service method
        const studentServiceSpy = jest
            .spyOn(studentService, 'listAllStudents')
            .mockReturnValue(of([
                {
                    studentId: "SMS002",
                    userName:"ralph123",
                    password:"rup@pass",
                    name:"Ralph Del",
                    age: 14,
                    birthDate: "2010-12-08",
                    gender: "Male",
                    address: "Howrah",
                    phoneNo: "6345617893",
                    email:"ralph@g.co",
                    classe: "seven",
                    section: "A",
                },

                {
                    studentId: "SMS002",
                    userName:"ani123",
                    password:"ana@pass",
                    name:"Ana Del",
                    age: 14,
                    birthDate: "2010-12-08",
                    gender: "Male",
                    address: "Kolkata",
                    phoneNo: "6345617893",
                    email:"ana@g.co",
                    classe: "seven",
                    section: "B",
                }
            ]));

        //triggering the ngOnInit lifecycle hook
        component.ngOnInit();

        //expecting the student service method to be called
        expect(studentServiceSpy).toHaveBeenCalledWith();

        //expecting the student list to be populated
        expect(component.students).toEqual(
            [
                {
                    studentId: "SMS002",
                    userName:"ralph123",
                    password:"rup@pass",
                    name:"Ralph Del",
                    age: 14,
                    birthDate: "2010-12-08",
                    gender: "Male",
                    address: "Howrah",
                    phoneNo: "6345617893",
                    email:"ralph@g.co",
                    classe: "seven",
                    section: "A",
                },

                {
                    studentId: "SMS002",
                    userName:"ani123",
                    password:"ana@pass",
                    name:"Ana Del",
                    age: 14,
                    birthDate: "2010-12-08",
                    gender: "Male",
                    address: "Kolkata",
                    phoneNo: "6345617893",
                    email:"ana@g.co",
                    classe: "seven",
                    section: "B",
                }
            ]
        );
    });

    

    
    // it('should handle error when fetching the student list', () => {
    //     const error = new Error('Failed to fetch student list');
    //     const studentServiceSpy = jest.spyOn(studentService, 'listAllStudents').mockReturnValue(throwError(error));

    //     //triggering the ngOnInit lifecycle hook
    //     component.ngOnInit();

    //     //expecting the student service method to be called
    //     expect(studentServiceSpy).toHaveBeenCalledWith();

    //     expect(component.error).toEqual('Failed to fetch student list');
    //     expect(component.students).toEqual([]);
    // });


});
