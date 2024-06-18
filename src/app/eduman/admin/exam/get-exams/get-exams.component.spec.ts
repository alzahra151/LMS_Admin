import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetExamsComponent } from './get-exams.component';

describe('GetExamsComponent', () => {
  let component: GetExamsComponent;
  let fixture: ComponentFixture<GetExamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetExamsComponent]
    });
    fixture = TestBed.createComponent(GetExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
