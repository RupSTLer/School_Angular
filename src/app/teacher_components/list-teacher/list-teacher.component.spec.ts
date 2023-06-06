import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../_services/notification.service';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { ListTeacherComponent } from './list-teacher.component';
import { TeacherService } from '../../_services/teacher.service';


describe('ListTeacherComponent', () => {
    let component: ListTeacherComponent;
    let fixture: ComponentFixture<ListTeacherComponent>;
    let teacherService: TeacherService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListTeacherComponent],
            providers: [HttpClient, HttpHandler, TeacherService, MatSnackBar, NotificationService],
            imports: [ToastrModule.forRoot()],
        })
            .compileComponents();

        fixture = TestBed.createComponent(ListTeacherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        teacherService = TestBed.inject(TeacherService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch the mocked teacher list using listTeacher method', () => {
        //mocking the student service method
        const studentServiceSpy = jest
            .spyOn(teacherService, 'listAllTeachers')
            .mockReturnValue(of([
                {
                    teacherId: "SMT003",
                    userName:"ralph123",
                    password:"rup@pass",
                    name:"Ralph Del",
                    age: 14,
                    birthDate: "2010-12-08",
                    gender: "Male",
                    address: "Howrah",
                    phoneNo: "6345617893",
                    email:"ralph@g.co",
                    department: "SCIENCE"
                  },
                  {
                    teacherId: "SMT005",
                    userName:"ana123",
                    password:"ana@pass",
                    name:"Ana Del",
                    age: 14,
                    birthDate: "2010-12-08",
                    gender: "Male",
                    address: "kolkata",
                    phoneNo: "6345617893",
                    email:"ana@g.co",
                    department: "ARTS"
                  }
            ]));

        //triggering the ngOnInit lifecycle hook
        component.ngOnInit();

        //expecting the student service method to be called
        expect(studentServiceSpy).toHaveBeenCalledWith();

        //expecting the student list to be populated
        expect(component.teachers).toEqual(
            [
                {
                    teacherId: "SMT003",
                    userName:"ralph123",
                    password:"rup@pass",
                    name:"Ralph Del",
                    age: 14,
                    birthDate: "2010-12-08",
                    gender: "Male",
                    address: "Howrah",
                    phoneNo: "6345617893",
                    email:"ralph@g.co",
                    department: "SCIENCE"
                  },
                  {
                    teacherId: "SMT005",
                    userName:"ana123",
                    password:"ana@pass",
                    name:"Ana Del",
                    age: 14,
                    birthDate: "2010-12-08",
                    gender: "Male",
                    address: "kolkata",
                    phoneNo: "6345617893",
                    email:"ana@g.co",
                    department: "ARTS"
                  }
            ]
        );
    });

});
