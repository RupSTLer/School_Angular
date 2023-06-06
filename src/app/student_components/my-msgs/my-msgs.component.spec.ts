import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMsgsComponent } from './my-msgs.component';

describe('MyMsgsComponent', () => {
  let component: MyMsgsComponent;
  let fixture: ComponentFixture<MyMsgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMsgsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyMsgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
