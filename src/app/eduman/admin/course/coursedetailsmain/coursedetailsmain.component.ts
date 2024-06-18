import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/eduman/models/course';
import { CoursesServiceService } from 'src/app/eduman/services/courses/courses-service.service';

@Component({
  selector: 'app-coursedetailsmain',
  templateUrl: './coursedetailsmain.component.html',
  styleUrls: ['./coursedetailsmain.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoursedetailsmainComponent implements OnInit {
  writeReviewActive: boolean = false;
  course: Course = {}
  courserId: number = 0
  writeReview() {
    if (this.writeReviewActive == false) {
      this.writeReviewActive = true;
    }
    else {
      this.writeReviewActive = false;
    }
  }
  constructor(
    private courrseService: CoursesServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courserId = params['id'];
      if (this.courserId) {
        this.getCourseById();
      } else {
        console.log('id undefiund')
      }
    })
  }
  getCourseById() {
    this.courrseService.getCousreById(this.courserId).subscribe({
      next: (response) => {
        this.course = response.result.course;
        console.log(this.course)
      }, error: (error) => {
        console.log(error)
      }
    })
  }
}
