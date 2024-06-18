import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Validators } from 'ngx-editor';
import { Course } from 'src/app/eduman/models/course';
import { CoursesServiceService } from 'src/app/eduman/services/courses/courses-service.service';
import { LeasonsServicesService } from 'src/app/eduman/services/leasons/leasons-services.service';
import { UploadVideoService } from 'src/app/eduman/services/upload-video/upload-video.service';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss']
})
export class AddLessonComponent {
  lessonForm: FormGroup;
  courses: Course[] = []
  selectedFile: any
  uploadProgress: any = 0
  showProgress: boolean = false
  constructor(private fb: FormBuilder,
    private courseService: CoursesServiceService,
    private lessonService: LeasonsServicesService,
    private videoUploadService: UploadVideoService,
    private snackBar: MatSnackBar,
    private ngZone: NgZone
  ) {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      alt_title: [null],
      description: ['', Validators.required],
      alt_description: [null],
      course_id: [, Validators.required],
      duration: [, Validators.required],
      is_free: [false],
      video_url: []
    });
  }

  // Getters for individual form controls
  get titleControl() {
    return this.lessonForm.get('title');
  }

  get altTitleControl() {
    return this.lessonForm.get('alt_title');
  }

  get descriptionControl() {
    return this.lessonForm.get('description');
  }

  get altDescriptionControl() {
    return this.lessonForm.get('alt_description');
  }

  get courseIdControl() {
    return this.lessonForm.get('course_id');
  }
  get isFreeControl() {
    return this.lessonForm.get('is_free');
  }
  get durationControl() {
    return this.lessonForm.get('duration');
  }
  get video_urlControl() {
    return this.lessonForm.get('video_url');

  }

  ngOnInit() {
    this.getCourses()
  }
  getCourses() {
    this.courseService.getAllCousres().subscribe({
      next: (response) => {
        this.courses = response.result.courses;
        console.log(this.courses)
      }, error: (error) => {
        console.log(error)
      }
    })
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }
  onUpload() {
    const lessonData = new FormData();
    console.log(this.selectedFile)
    lessonData.append('video_url', this.selectedFile);
    lessonData.append('title', this.titleControl?.value);
    lessonData.append('alt_title', this.altTitleControl?.value);
    lessonData.append('description', this.descriptionControl?.value);
    lessonData.append('alt_description', this.altDescriptionControl?.value);
    lessonData.append('is_free', this.isFreeControl?.value);
    lessonData.append('course_id', this.courseIdControl?.value);
    lessonData.append('duration', this.durationControl?.value);

    lessonData.forEach((value, key) => {
      console.log(key, value);
    });
    // Make POST request to upload endpoint
    this.lessonService.addLeasson(lessonData).subscribe({
      next: (response) => {

        console.log('Upload successful. Vimeo URL:', response);
        // Open SSE connection to get progress updates
        const eventSource = new EventSource('/api/admin/lessons/events');
        this.showProgress = true
        eventSource.onmessage = (event) => {
          this.ngZone.run(() => { // Run this within Angular's zone
            this.uploadProgress = parseInt(event.data, 10);
            console.log("test", this.uploadProgress);
            if (this.uploadProgress == 100) {
              this.showProgress = false
              this.showSuccess("تمت الاضافة بنجاج")
            }
          });
        }

      }, error: (error) => {
        console.log(error.error.message)
      }
    });
  }
  private getSnackBarConfig(panelClass: string, duration: number): MatSnackBarConfig {
    return {
      duration: duration,
      panelClass: [panelClass],
      horizontalPosition: 'end',  // Adjust as needed: 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'top'        // Adjust as needed: 'top' | 'bottom'
    };
  }
  showSuccess(message: string, duration: number = 3000) {
    const config = this.getSnackBarConfig('success-snackbar', duration);
    this.snackBar.open(message, 'Close', config);
  }
}
