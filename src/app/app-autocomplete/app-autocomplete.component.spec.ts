import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAutocompleteComponent } from './app-autocomplete.component';

describe('AppAutocompleteComponent', () => {
  let component: AppAutocompleteComponent;
  let fixture: ComponentFixture<AppAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
