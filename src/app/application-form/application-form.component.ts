import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { EmailService } from '../Services/EmailService';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent {
  applicationForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;

  @Output() formSubmitted = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService
  ) {
    this.applicationForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^5\d{8}$/)]],
      fullName: [''],
  nationalId: ['', [saudiNationalIdValidator]], // Saudi ID validator
      // monthlyIncome: ['', Validators.required],
      message: ['']
    });
  }

  async onSubmit() {
    if (this.applicationForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      try {
        const result = await this.emailService.sendApplicationEmail({
          phoneNumber: this.applicationForm.value.phoneNumber,
          fullName: this.applicationForm.value.fullName,
          nationalId: this.applicationForm.value.nationalId,
          additionalInfo: this.applicationForm.value.message
        });

        if (result.success) {
          this.isSubmitted = true;
          this.formSubmitted.emit(true);
          this.applicationForm.reset();
          // You can show a success message here
        } else {
          // Show error message
          console.error(result.message);
        }
      } catch (error) {
        console.error('Error sending email:', error);
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  onReset() {
    this.applicationForm.reset();
    this.isSubmitted = false;
  }
}

export function saudiNationalIdValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) return null;

  // Must be 10 digits
  if (!/^\d{10}$/.test(value)) {
    return { invalidFormat: true };
  }

  // // Must start with 1 (citizen) or 2 (resident)
  // if (!(value.startsWith('1') || value.startsWith('2'))) {
  //   return { invalidStart: true };
  // }

  // // Validate with Luhn algorithm
  // let sum = 0;
  // for (let i = 0; i < 9; i++) {
  //   let digit = +value[i];
  //   if (i % 2 === 0) {
  //     // Double every other digit
  //     digit *= 2;
  //     if (digit > 9) digit -= 9;
  //   }
  //   sum += digit;
  // }
  // const checkDigit = (10 - (sum % 10)) % 10;
  // if (checkDigit !== +value[9]) {
  //   return { invalidCheckDigit: true };
  // }

  return null;
}