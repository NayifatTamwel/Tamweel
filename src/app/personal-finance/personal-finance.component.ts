import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationFormComponent } from '../application-form/application-form.component';
import { SeoService } from '../Services/Seo.Service';

@Component({
  selector: 'app-personal-finance',
  templateUrl: './personal-finance.component.html',
  styleUrls: ['./personal-finance.component.scss']
})
export class PersonalFinanceComponent {
    ngOnInit() {
    this.seoService.setSeoData();
  }

 constructor(
  private seoService: SeoService,
    private matIconRegistry: MatIconRegistry,
    private dialog: MatDialog,
    private domSanitizer: DomSanitizer
  ) {
    // Register WhatsApp icon
    this.matIconRegistry.addSvgIcon(
      'whatsapp',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/whatsapp.svg')
    );
  }

  openWhatsApp() {
    window.open('https://wa.me/+966598505540', '_blank');
  }

  makePhoneCall() {
    window.location.href = 'tel:+966598505540';
  }
  openApplicationForm() {
    this.dialog.open(ApplicationFormComponent, {
      width: '90%',
      maxWidth: '800px',
      panelClass: 'app-form-dialog',
      direction: 'rtl',
      disableClose: true,
      autoFocus: false
    });
  }
}
