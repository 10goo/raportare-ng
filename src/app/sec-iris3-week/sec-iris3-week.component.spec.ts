import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecIris3WeekComponent } from './sec-iris3-week.component';

describe('SecIris3WeekComponent', () => {
  let component: SecIris3WeekComponent;
  let fixture: ComponentFixture<SecIris3WeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecIris3WeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecIris3WeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
