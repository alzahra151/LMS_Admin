import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Discount } from 'src/app/eduman/models/discount';
import { CoursesServiceService } from 'src/app/eduman/services/courses/courses-service.service';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export const MY_FORMATS = {
  parse: {
    dateInput: "YYYY-MM-DD HH:mm:ss"
  },
  display: {
    dateInput: "YYYY-MM-DD HH:mm:ss",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "YYYY-MM-DD HH:mm:ss",
    monthYearA11yLabel: "MMMM YYYY"
  }
};
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ]
})
export class AddCourseComponent {
  courseForm: FormGroup;
  discount: Discount = Discount.fixed
  discountTypes: Discount[] = [Discount.fixed, Discount.percentage]
  posterSrc: string = ''
  constructor(private fb: FormBuilder, private courseService: CoursesServiceService, private snackBar: MatSnackBar) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      alt_title: [null],
      description: ['', Validators.required],
      alt_description: [null],
      start_date: ['', Validators.required],
      end_date: [null],
      is_free: [false],
      price: [null],
      discount: [null],
      discount_type: [null],
      status: ['pending'],
      total: [null],
      poster: ['']
    });

  }

  // Getters for individual form controls
  get titleControl() {
    return this.courseForm.get('title');
  }
  get posterControl() {
    return this.courseForm.get('poster');
  }
  get altTitleControl() {
    return this.courseForm.get('alt_title');
  }

  get descriptionControl() {
    return this.courseForm.get('description');
  }

  get altDescriptionControl() {
    return this.courseForm.get('alt_description');
  }

  get startDateControl() {
    return this.courseForm.get('start_date');
  }

  get endDateControl() {
    return this.courseForm.get('end_date');
  }

  get isFreeControl() {
    return this.courseForm.get('is_free');
  }

  get priceControl() {
    return this.courseForm.get('price');
  }

  get discountControl() {
    return this.courseForm.get('discount');
  }

  get discountTypeControl() {
    return this.courseForm.get('discount_type');
  }

  get statusControl() {
    return this.courseForm.get('status');
  }

  get totalControl() {
    return this.courseForm.get('total');
  }

  ngOnInit() {
    this.getDiscount()
    this.checkFree()
  }
  calculateFinalPrice() {
    const price = this.courseForm.get('price')?.value || 0;
    const discount = this.courseForm.get('discount')?.value || 0;
    const discountType = this.courseForm.get('discount_type')?.value || '';

    if (discountType === 'percentage') {
      // Calculate the final price with percentage discount
      const newPrice = price - (price * (discount / 100));
      this.totalControl?.setValue(newPrice)
      console.log(this.priceControl?.value)
    } else if (discountType === 'fixed') {
      // Calculate the final price with fixed discount
      const newPrice = price - discount;
      this.totalControl?.setValue(newPrice)
      console.log(this.priceControl?.value)
    }
  }
  getDiscount() {
    this.courseForm.get('discount_type')?.valueChanges.subscribe((value) => {
      const discountValueControl = this.courseForm.get('discount');
      if (value === 'percentage' || value === 'fixed') {
        discountValueControl?.setValidators([Validators.required]);

      } else {
        discountValueControl?.clearValidators();
      }
      discountValueControl?.updateValueAndValidity();
    });
  }
  checkFree() {
    this.isFreeControl?.valueChanges.subscribe((isFree) => {
      // If "Is Free" is checked, set the price to null
      if (isFree) {
        this.priceControl?.setValue(null);
        this.discountControl?.setValue(null);
      }
    })
  }
  async addCourse() {
    const courserData = new FormData();
    if (this.discountControl) await this.calculateFinalPrice() //calculate price with discount
    Object.keys(this.courseForm.controls).forEach(key => {
      const control = this.courseForm.get(key);
      console.log(control)
      courserData.append(key, control?.value);
      console.log(courserData[key])
    });
    this.courseService.addCourse(courserData).subscribe({
      next: (data) => {
        console.log('add sussfuly')
        this.showSuccess('تمت الاضافة بنجاح')
      },
      error: (error) => {
        console.log(error.error.message)
        // this.showSuccess('تمت الاضافة بنجاح')
      }
    })
  }
  setFileData(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.posterSrc = reader.result as string;
      });
      reader.readAsDataURL(file);
      this.posterControl?.patchValue(file);
      console.log(this.posterControl?.value)
    }
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
