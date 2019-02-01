import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecIris3DetailComponent } from './sec-iris3-detail.component';

describe('SecIris3DetailComponent', () => {
  let component: SecIris3DetailComponent;
  let fixture: ComponentFixture<SecIris3DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecIris3DetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecIris3DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
