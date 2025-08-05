// application-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent {
  applicationForm: FormGroup;
  isSubmitting = false;
  cities = ['الرياض', 'جدة', 'مكة', 'الدمام', 'الخبر', 'المدينة المنورة'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ApplicationFormComponent>,
    // private applicationService: ApplicationService
  ) {
    this.applicationForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^5\d{8}$/)]],
      fullName: [''],
      // city: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.applicationForm.valid) {
      this.isSubmitting = true;
      
      // this.applicationService.submitApplication(this.applicationForm.value)
      //   .subscribe({
      //     next: (response) => {
      //       this.isSubmitting = false;
      //       this.dialogRef.close();
      //       // Show success message
      //     },
      //     error: (error) => {
      //       this.isSubmitting = false;
      //       // Show error message
      //     }
      //   });
    }
  }
}