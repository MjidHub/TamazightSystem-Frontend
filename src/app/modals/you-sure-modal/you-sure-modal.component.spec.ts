import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YouSureModalComponent } from './you-sure-modal.component';

describe('YouSureModalComponent', () => {
  let component: YouSureModalComponent;
  let fixture: ComponentFixture<YouSureModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YouSureModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YouSureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
