import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageTeacherComponent } from './message-teacher.component';
import { StudentService } from '../../_services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/_services/notification.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('MessageTeacherComponent', () => {
  let component: MessageTeacherComponent;
  let fixture: ComponentFixture<MessageTeacherComponent>;
  let studentService: StudentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [MessageTeacherComponent],
        providers: [HttpClient, HttpHandler, StudentService, MatSnackBar, NotificationService],
        imports: [ToastrModule.forRoot()],
    })
        .compileComponents();

    fixture = TestBed.createComponent(MessageTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    studentService = TestBed.inject(StudentService);
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should save the message to the backend', () => {
    //mocking the student service method
    const studentServiceSpy = jest.spyOn(studentService, 'addMsg');

    const testMessage = "This is a test message";

    component.msg.message = testMessage;

    component.addMsg();

    expect(studentServiceSpy).toHaveBeenCalledWith(testMessage);

    // expect(component.success).toBeTruthy();

  });

});
