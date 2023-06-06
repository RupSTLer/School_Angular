import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../_services/notification.service';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { ListFeesComponent } from './list-fees.component';
import { FeeService } from '../../_services/fee.service';


describe('ListFeesComponent', () => {
  let component: ListFeesComponent;
  let fixture: ComponentFixture<ListFeesComponent>;
  let feeService: FeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListFeesComponent],
      providers: [HttpClient, HttpHandler, FeeService, MatSnackBar, NotificationService],
      imports: [ToastrModule.forRoot()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    feeService = TestBed.inject(FeeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the mocked fees list using listFees method', () => {
    //mocking the fee service method
    const feeServiceSpy = jest
      .spyOn(feeService, 'listFees')
      .mockReturnValue(of([
        {
          id: 3,
          studentId: "SMS001",
          studentName: "Rupam paul",
          amount: 3333,
          feeType: "Monthly",
          paymentType: "Cash",
          time: "30-05-2023 02:09"
        },

        {
          id: 4,
          studentId: "SMS002",
          studentName: "Ritam paul",
          amount: 6666,
          feeType: "Quaterly",
          paymentType: "Cash",
          time: "30-05-2023 02:09"
        }
      ]));

    //triggering the ngOnInit lifecycle hook
    component.ngOnInit();

    //expecting the fee service method to be called
    expect(feeServiceSpy).toHaveBeenCalledWith();

    //expecting the fee list to be populated
    expect(component.fees).toEqual(
      [
        {
          id: 3,
          studentId: "SMS001",
          studentName: "Rupam paul",
          amount: 3333,
          feeType: "Monthly",
          paymentType: "Cash",
          time: "30-05-2023 02:09"
        },

        {
          id: 4,
          studentId: "SMS002",
          studentName: "Ritam paul",
          amount: 6666,
          feeType: "Quaterly",
          paymentType: "Cash",
          time: "30-05-2023 02:09"
        }
      ]
    );
  });

});
