// application-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmailService } from '../Services/EmailService';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent {
  applicationForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
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
      
      const templateParams = {
  name: this.applicationForm.value.fullName,
  email: '',
  from_name: this.applicationForm.value.fullName,
  message: 'new application from phone number ',
  phonenumber: this.applicationForm.value.phoneNumber,
};

this.emailService.sendEmail(templateParams).then((response) => {


}).catch((error) => {

  console.error('Email sending error:', error);
}).finally(()=>{
 this.isSubmitting = false;
        this.dialogRef.close(true);
});
    //   setTimeout(() => {
    //     // this.applicationService.submitApplication(this.applicationForm.value)
    //     //   .subscribe({
    //     //     next: (response) => {
    //     //       this.isSubmitting = false;
    //     //       this.dialogRef.close(true); // Pass true to indicate success
    //     //     },
    //     //     error: (error) => {
    //     //       this.isSubmitting = false;
    //     //       // Show error message
    //     //     }
    //     //   });
        
    //     // For demo purposes, close after 2 seconds
    //     this.isSubmitting = false;
    //     this.dialogRef.close(true);
    //   }, 2000);
    }
  }

  onClose(): void {
    if (!this.isSubmitting) {
      this.dialogRef.close(false); // Pass false to indicate cancellation
    }
  }

  // Optional: Handle escape key and backdrop click
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && !this.isSubmitting) {
      this.onClose();
    }
  }
}