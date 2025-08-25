import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root' // This makes it available throughout the app
})
export class EmailService {
  private readonly serviceID = 'service_ncwr65t';
  private readonly templateID = 'template_x79vccp';
  private readonly userID = 'bnFh-G7BGK7XQDGz0'; // Public Key

  constructor() {
    // Initialize EmailJS with your User ID
    emailjs.init(this.userID);
  }

  async sendEmail(templateParams: any): Promise<{ success: boolean; message: string }> {
    try {
      const response = await emailjs.send(
        this.serviceID, 
        this.templateID, 
        templateParams
      );
      
      console.log('Email sent successfully:', response);
      return {
        success: true,
        message: 'تم إرسال البريد الإلكتروني بنجاح'
      };
    } catch (error) {
      console.error('Email sending failed:', error);
      return {
        success: false,
        message: 'فشل إرسال البريد الإلكتروني. يرجى المحاولة مرة أخرى.'
      };
    }
  }

  // Optional: Specific method for common email types
  async sendContactEmail(contactData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    const templateParams = {
      to_name: 'Admin', // Recipient name
      from_name: contactData.name,
      from_email: contactData.email,
      subject: contactData.subject,
      message: contactData.message,
      reply_to: contactData.email
    };

    return this.sendEmail(templateParams);
  }

  // Optional: Method for application submissions
  async sendApplicationEmail(applicationData: {
    phoneNumber: string;
    fullName: string;
    nationalId?: string;
    additionalInfo?: string;
  }): Promise<{ success: boolean; message: string }> {
    const templateParams = {
      to_name: 'Admin',
      from_name: applicationData.fullName || 'مستخدم',
      phone_number: applicationData.phoneNumber,
      nationalId: applicationData.nationalId || 'N/A',
      message: applicationData.additionalInfo || 'طلب تمويل جديد',
      reply_to: 'noreply@yourdomain.com' 
    };

    return this.sendEmail(templateParams);
  }
}