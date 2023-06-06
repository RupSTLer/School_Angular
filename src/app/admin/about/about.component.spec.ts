import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: any;
  // let fixture: ComponentFixture<AboutComponent>;
  let fixture: any;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutComponent
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test: Component', () => {
    it('shoule be initialized', () => {
      expect(fixture).toBeTruthy();
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const h1 = compiled.querySelector('h1');
      expect(h1.textContent).toContain('Admin');
      const p = compiled.querySelector('p');
      expect(p.textContent).toContain('this page contains the details of Admin');
    });
  });

});
