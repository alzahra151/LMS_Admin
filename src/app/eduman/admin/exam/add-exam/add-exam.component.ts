import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormArray } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, MatStepperModule } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoursesServiceService } from 'src/app/eduman/services/courses/courses-service.service';
import { Course, CourseRespone } from 'src/app/eduman/models/course';
import { ClassesService } from 'src/app/eduman/services/classes/classes.service';
import { Classe } from 'src/app/eduman/models/classe';
import { Lesson } from 'src/app/eduman/models/lesson';

import Quill from 'quill';
import { QuillEditorComponent } from 'ngx-quill';

import ImageResize from 'quill-image-resize-module';

Quill.register('modules/imageResize', ImageResize)

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss']
})
export class AddExamComponent implements OnInit {
  @ViewChild('editor') editor!: QuillEditorComponent;
  modules = {}
  stepperOrientation: Observable<StepperOrientation>;
  addExamGroup: FormGroup
  addQuestionsGroup: FormGroup
  courses: Course[] = []
  classes: Classe[] = []
  editorData = ''
  chosenCourse?: Course = {}
  exam = {}
  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private courrseService: CoursesServiceService,
    private classService: ClassesService,
  ) {
    this.modules = {
      imageResize: {},
      syntax: true,
    }
    // stepper groups
    this.addExamGroup = this._formBuilder.group({
      title: ['', Validators.required],
      alt_title: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      duration: [null,],
      lesson_ids: this._formBuilder.array([]),
      course_id: [null, Validators.required],
      class_id: [null, Validators.required],

    });
    this.addQuestionsGroup = this._formBuilder.group({
      questions: this._formBuilder.array([]),
    });
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    // exam from 
    // this.addQuestionsGroup = this._formBuilder.group({


    // });

  }
  ngOnInit() {
    this.getCourses()
    this.getClasses()
    this.addQuestion()
    // this.getLessonsByCourse()
  }
  get questionsArray() {
    return this.addQuestionsGroup.get('questions') as FormArray;
  }
  get lessonsArray() {
    return this.addQuestionsGroup.get('lesson_ids') as FormArray;
  }
  addQuestion() {
    const question = this._formBuilder.group({
      title: ['', Validators.required],
      duration: [0, Validators.min(0)],
      degree: [0, Validators.min(0)],
      answers: this._formBuilder.array([]),
    });

    this.questionsArray.push(question);
  }

  getAnswersArray(questionIndex: number) {
    return this.questionsArray.at(questionIndex).get('answers') as FormArray;
  }

  addAnswer(questionIndex: number) {
    const answer = this._formBuilder.group({
      title: [this.editorData, Validators.required],
      is_correct: [false],
    });

    this.getAnswersArray(questionIndex).push(answer);
    this.clearEditor(this.editor)
  }

  removeQuestion(questionIndex: number) {
    this.questionsArray.removeAt(questionIndex);
  }

  removeAnswer(questionIndex: number, answerIndex: number) {
    this.getAnswersArray(questionIndex).removeAt(answerIndex);
  }
  getEditorAnswerValue(ev: any) {
    this.editorData = ev.html
  }
  clearEditor(editor: QuillEditorComponent) {
    editor.writeValue(''); // or editor.setContent('')
  }
  activateRTL(editor) {
    editor.format('align', 'right')
    editor.format('direction', 'rtl')
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
  getClasses() {
    this.classService.getClasses().subscribe({
      next: (response) => {
        this.classes = response.result.classes;
        console.log(this.classes)
      }, error: (error) => {
        console.log(error)
      }
    })
  }
  async getLessonsByCourse() {
    // Watch for changes in the 'course_id' control and fetch lessons dynamically
    await this.addExamGroup.get('course_id')?.valueChanges.subscribe(courseId => {
      if (courseId) {
        console.log(courseId)
        // this.courseService.getLessonsByCourseId(courseId).subscribe(lessons => {
        //   this.lessons = lessons;
        //   this.updateLessonIdsFormArray();
        // });
        this.chosenCourse = this.courses.find((course) => {
          return courseId === course.id;
        });

        console.log(courseId, this.chosenCourse);

      }
      this.chosenCourse?.lessons?.forEach((lesson) => {
        console.log(lesson)
        this.lessonsArray.push(lesson)

      })


    });
  }
  // addExam() {
  //   this.exam = { ...this.addExamGroup.value, ...this.addQuestionsGroup.value }
  //   this.
  // }

}
