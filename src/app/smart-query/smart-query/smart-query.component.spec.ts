import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartQueryComponent } from './smart-query.component';

describe('SmartQueryComponent', () => {
  let component: SmartQueryComponent;
  let fixture: ComponentFixture<SmartQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
