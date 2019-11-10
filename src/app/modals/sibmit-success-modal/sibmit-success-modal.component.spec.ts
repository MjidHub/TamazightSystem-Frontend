import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SibmitSuccessModalComponent } from './sibmit-success-modal.component';

describe('SibmitSuccessModalComponent', () => {
  let component: SibmitSuccessModalComponent;
  let fixture: ComponentFixture<SibmitSuccessModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SibmitSuccessModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SibmitSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
