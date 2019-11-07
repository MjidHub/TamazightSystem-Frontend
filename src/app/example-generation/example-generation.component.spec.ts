import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleGenerationComponent } from './example-generation.component';

describe('ExampleGenerationComponent', () => {
  let component: ExampleGenerationComponent;
  let fixture: ComponentFixture<ExampleGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
