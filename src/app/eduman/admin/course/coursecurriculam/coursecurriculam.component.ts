import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/eduman/models/course';
import { Lesson } from 'src/app/eduman/models/lesson';

@Component({
  selector: 'app-coursecurriculam',
  templateUrl: './coursecurriculam.component.html',
  styleUrls: ['./coursecurriculam.component.scss']
})
export class CoursecurriculamComponent implements OnInit {
  @Input() lessons?: Lesson[] = [];
  panelOpenState = false;

  constructor() { }
  ngOnInit(): void { }

}
