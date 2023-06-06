import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../_services/notification.service';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { FeeService } from '../../_services/fee.service';
import { ListMsgsComponent } from './list-msgs.component';
import { MessageService } from '../../_services/message.service';


describe('ListMsgsComponent', () => {
  let component: ListMsgsComponent;
  let fixture: ComponentFixture<ListMsgsComponent>;
  let msgService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListMsgsComponent],
      providers: [HttpClient, HttpHandler, FeeService, MatSnackBar, NotificationService],
      imports: [ToastrModule.forRoot()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListMsgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    msgService = TestBed.inject(MessageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the mocked message list using getMessages method', () => {
    //mocking the fee service method
    const msgServiceSpy = jest
      .spyOn(msgService, 'getMessages')
      .mockReturnValue(of([
        {
          id: 3,
          senderId: "SMS003",
          receiverId: "SMT005",
          message: "query on microservices",
          time: "23-05-2023 17:30"
        },

        {
          id: 2,
          senderId: "SMS001",
          receiverId: "SMT003",
          message: "query on DBMS",
          time: "27-05-2023 13:30"
        }
      ]));

    //triggering the ngOnInit lifecycle hook
    component.ngOnInit();

    //expecting the fee service method to be called
    expect(msgServiceSpy).toHaveBeenCalledWith();

    //expecting the fee list to be populated
    expect(component.allMsgs).toEqual(
      [
        {
          id: 3,
          receiverId: 2,
          message: "query on microservices",
          time: "23-05-2023 17:30"
        },

        {
          id: 2,
          receiverId: 3,
          message: "query on DBMS",
          time: "27-05-2023 13:30"
        }
      ]
    );
  });

});
