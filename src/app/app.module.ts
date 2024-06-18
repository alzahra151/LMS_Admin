import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { EdumanModule } from './eduman/eduman.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
// import { HeaderoneComponent } from './eduman/common/header/headerone/headerone.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { EditorModule } from 'primeng/editor'
import { NgxEditorModule } from 'ngx-editor';
import { CoursedetailsmainComponent } from './eduman/admin/course/coursedetailsmain/coursedetailsmain.component';
// import { CoursereviewComponent } from './coursereview/coursereview.component';
// import { CoursevideoComponent } from './coursevideo/coursevideo.component';
// import { StudentfeedbackComponent } from './studentfeedback/studentfeedback.component';
// import { CoursecurriculamComponent } from './coursecurriculam/coursecurriculam.component';
// import { CourseinstructorComponent } from './courseinstructor/courseinstructor.component';
import { RouterModule } from '@angular/router';
import { CoursereviewComponent } from './eduman/admin/course/coursereview/coursereview.component';
import { CoursevideoComponent } from './eduman/admin/course/coursevideo/coursevideo.component';
import { StudentfeedbackComponent } from './eduman/admin/course/studentfeedback/studentfeedback.component';
import { CoursecurriculamComponent } from './eduman/admin/course/coursecurriculam/coursecurriculam.component';
import { CourseinstructorComponent } from './eduman/admin/course/courseinstructor/courseinstructor.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';





@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatIconModule,
    EditorModule,
    NgxEditorModule,
    EdumanModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    // MatTableModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  declarations: [
    AppComponent,
    CoursedetailsmainComponent,
    CoursereviewComponent,
    CoursevideoComponent,
    StudentfeedbackComponent,
    CoursecurriculamComponent,
    CourseinstructorComponent,

    // SidebarComponent

  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
