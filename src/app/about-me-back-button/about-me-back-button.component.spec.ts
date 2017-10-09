import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeBackButtonComponent } from './about-me-back-button.component';

describe('AboutMeBackButtonComponent', () => {
  let component: AboutMeBackButtonComponent;
  let fixture: ComponentFixture<AboutMeBackButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutMeBackButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMeBackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
