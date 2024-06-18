import { Component } from '@angular/core';
import { Course } from 'src/app/eduman/models/course';
import { CoursesServiceService } from 'src/app/eduman/services/courses/courses-service.service';
// import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses: Course[] = []
  constructor(private courrseService: CoursesServiceService) { }

  ngOnInit(): void {
    this.getCourses()

  }
  getCourses() {
    this.courrseService.getAllCousres().subscribe({
      next: (response) => {
        this.courses = response.result.courses;
        console.log(this.courses)
      }, error: (error) => {
        console.log(error)
      }
    })
  }
}
