import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsciiViewComponent } from './ascii-view.component';

describe('AsciiViewComponent', () => {
  let component: AsciiViewComponent;
  let fixture: ComponentFixture<AsciiViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsciiViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsciiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
