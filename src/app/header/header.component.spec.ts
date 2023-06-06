import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from '../_services/notification.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('AppComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: NotificationService;
  // let service1: ToastrService;
  // let service2: UserService;
  // let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule   ,
        ToastrModule.forRoot(),
      ],
      declarations: [
        HeaderComponent
      ],
      providers: [ NotificationService,
      MatSnackBar]
    }).compileComponents();
    service=TestBed.inject(NotificationService);
    // service1=TestBed.inject(ToastrService);
    // service2=TestBed.inject(UserService);
    // httpMock=TestBed.get(HttpTestingController);
    // http=TestBed.inject(HttpClient);
  });

  it('service', () => {
    expect(service).toBeTruthy();
  });

  it('three plus two', () => {
    expect(3+2).toBe(5);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'headerapp'`, () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const header = fixture.componentInstance;
    expect(header.title).toEqual('headerapp');
  });

});
