import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordAdditionFormComponent } from './word-addition-form.component';

describe('WordAdditionFormComponent', () => {
  let component: WordAdditionFormComponent;
  let fixture: ComponentFixture<WordAdditionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordAdditionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordAdditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
