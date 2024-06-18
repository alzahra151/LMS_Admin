import { Component, ViewChild } from '@angular/core';
import { ExamService } from '../../../services/exam/exam.service';
// import { ExamStudent } from '../../models/exam-student';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../../models/student';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-students',
  templateUrl: './exam-students.component.html',
  styleUrls: ['./exam-students.component.scss'],

})
export class ExamStudentsComponent {
  constructor(private examService: ExamService,
    private route: ActivatedRoute
  ) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  students: Student[] = []
  data: any
  dataSource = new MatTableDataSource<any>();
  pageSize = 10;
  totalItems: number = 0
  pageSizeOptions = [10, 50, 100];
  displayedColumns = ['id', 'first_name', 'last_name', 'degree'];
  examId: number = 0
  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params) => {
          this.examId = +params['id'];
          console.log(this.examId);
          this.dataSource.paginator = this.paginator;
          this.getSudents(this.examId, 0);
        }
      );
  }

  getSudents(id: number, currentPage: number): void {
    this.examService.getExamStudents(id, currentPage, 10).subscribe({
      next: (data) => {
        this.data = data
        console.log(data)
        this.students = this.data.result.rows
        this.dataSource.data = this.students
        this.totalItems = this.data.result.totalItems
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  handlePageChange(event: any) {
    console.log(event.pageIndex)
    this.getSudents(this.examId, event.pageIndex);
  }
  // handlePageSizeChange(event: any) {
  //   // Update the page size and reload data
  //   this.pageSize = event.pageSize;
  //   this.getSudents(this.currentPage);
  // }

  // handlePageSizeOptionsChange(event: any) {
  //   // Handle changes in available page size options (if needed)
  //   // You can update this.pageSizeOptions and reload data if needed
  // }
}
