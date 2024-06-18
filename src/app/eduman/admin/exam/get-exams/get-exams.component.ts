import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exam } from 'src/app/eduman/models/exam';
import { ExamService } from 'src/app/eduman/services/exam/exam.service';

@Component({
  selector: 'app-get-exams',
  templateUrl: './get-exams.component.html',
  styleUrls: ['./get-exams.component.scss']
})
export class GetExamsComponent {
  exams: Exam[] = []
  courseId: number = 0
  displayedColumns = ['id', 'title', 'start_date', 'end_date', 'duration', 'edit', 'delete', 'info'];
  constructor(private examService: ExamService,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.route.params
      .subscribe(
        (params) => {
          this.courseId = +params['id'];
          console.log(this.courseId);
          this.getCourceExams(this.courseId)
        }
      );
  }
  getCourceExams(id: number) {
    this.examService.getCourseExams(id).subscribe({
      next: (data) => {
        this.exams = data.result.exams
        console.log(this.exams)
      }
    })
  }
}
