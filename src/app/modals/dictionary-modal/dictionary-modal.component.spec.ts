import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryModalComponent } from './dictionary-modal.component';

describe('DictionaryModalComponent', () => {
  let component: DictionaryModalComponent;
  let fixture: ComponentFixture<DictionaryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionaryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
