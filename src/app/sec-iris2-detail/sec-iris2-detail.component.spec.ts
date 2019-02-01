import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecIris2DetailComponent } from './sec-iris2-detail.component';

describe('SecIris2DetailComponent', () => {
  let component: SecIris2DetailComponent;
  let fixture: ComponentFixture<SecIris2DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecIris2DetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecIris2DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
