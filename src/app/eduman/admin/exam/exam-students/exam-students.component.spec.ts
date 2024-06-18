import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStudentsComponent } from './exam-students.component';

describe('ExamStudentsComponent', () => {
  let component: ExamStudentsComponent;
  let fixture: ComponentFixture<ExamStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamStudentsComponent]
    });
    fixture = TestBed.createComponent(ExamStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
