import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveChoiceModalComponent } from './remove-choice-modal.component';

describe('RemoveChoiceModalComponent', () => {
  let component: RemoveChoiceModalComponent;
  let fixture: ComponentFixture<RemoveChoiceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveChoiceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveChoiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
