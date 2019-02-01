import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecIris2WeekComponent } from './sec-iris2-week.component';

describe('SecIris2WeekComponent', () => {
  let component: SecIris2WeekComponent;
  let fixture: ComponentFixture<SecIris2WeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecIris2WeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecIris2WeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
