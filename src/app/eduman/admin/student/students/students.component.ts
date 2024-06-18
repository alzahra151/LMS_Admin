import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'src/app/eduman/models/api-response';
import { Classe } from 'src/app/eduman/models/classe';
import { Student } from 'src/app/eduman/models/student';
import { StudentsService } from 'src/app/eduman/services/students/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  constructor(private studentService: StudentsService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  students: Student[] = []
  data: any
  dataSource = new MatTableDataSource<any>();
  pageSize = 10;
  totalItems: number = 0
  pageSizeOptions = [10, 50, 100];
  displayedColumns = ['id', 'first_name', 'last_name', 'mobile', 'class', 'edit', 'delete', 'info'];
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getSudents(0);
  }

  getSudents(currentPage: number): void {
    this.studentService.getStudents(currentPage, 10).subscribe({
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
    this.getSudents(event.pageIndex);
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
