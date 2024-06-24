import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// import { HomeonemainComponent } from './homeone/homeonemain/homeonemain.component';
// import { CourseonemainComponent } from './course/courseone/courseonemain/courseonemain.component';
// import { HeroComponent } from './homeone/hero/hero.component';
// import { AdminHomeComponent } from './homeone/admin-home/admin-home.component';
import { HomeComponent } from './admin/home/home.component';
import { AddstudentComponent } from './admin/student/addstudent/addstudent.component';
import { StudentsComponent } from './admin/student/students/students.component';
import { AddCourseComponent } from './admin/course/add-course/add-course.component';
import { CoursesComponent } from './admin/course/courses/courses.component';
import { AddExamComponent } from './admin/exam/add-exam/add-exam.component';
import { CoursedetailsmainComponent } from './admin/course/coursedetailsmain/coursedetailsmain.component';
import { SigninmainComponent } from './admin/signinmain/signinmain.component';
import { AddLessonComponent } from './admin/course/add-lesson/add-lesson.component';
import { GetExamsComponent } from './admin/exam/get-exams/get-exams.component';
import { ExamDetailsComponent } from './admin/exam/exam-details/exam-details.component';
import { ExamStudentsComponent } from './admin/exam/exam-students/exam-students.component';
import { UnauthorizedComponent } from './admin/unauthorized/unauthorized.component';
import { roleGuard } from './guards/role.guard';
import { UserComponent } from './admin/users/user/user.component';
// import {util} from 'util'


const routes: Routes = [
  // {
  //   path: '', component: HomeonemainComponent,
  //   children: [
  //     { path: '', component: HeroComponent },
  //     { path: 'course', component: CourseonemainComponent },
  //   ],
  // },
  { path: '', component: SigninmainComponent },
  {
    path: 'admin', component: HomeComponent,
    // pathMatch: 'full',
    children: [
      { path: '', component: AddstudentComponent },
      {
        path: 'add-student', component: AddstudentComponent,
        // canActivate: [roleGuard], data: {
        //   requiredRole: 'super_admin'  }
      },
      { path: 'students', component: StudentsComponent },
      // { path: 'teacher-courses', component: CourseonemainComponent },
      { path: 'add-course', component: AddCourseComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'add-exam', component: AddExamComponent },
      { path: 'corse-details/:id/exam', component: GetExamsComponent },
      { path: 'corse-details/:id/exam/:id/students', component: ExamStudentsComponent },
      { path: 'exam/:id', component: ExamDetailsComponent },
      { path: 'add-lesson', component: AddLessonComponent },
      { path: 'corse-details/:id', component: CoursedetailsmainComponent },
      { path: 'unauthorized', component: UnauthorizedComponent },
      { path: 'add-user', component: UserComponent, },


    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdumaRoutingModule { }
