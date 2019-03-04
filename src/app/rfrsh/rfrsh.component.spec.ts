import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfrshComponent } from './rfrsh.component';

describe('RfrshComponent', () => {
  let component: RfrshComponent;
  let fixture: ComponentFixture<RfrshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfrshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfrshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
