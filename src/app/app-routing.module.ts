import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { PersonalFinanceComponent } from './personal-finance/personal-finance.component';
import { ApplicationFormComponent } from './application-form/application-form.component';


const routes: Routes = [

  { 
    path: 'personal-finance', 
    component: PersonalFinanceComponent 
  },{ 
    path: 'application-form', 
    component: ApplicationFormComponent 
  },
  { 
    path: '**', 
    component: PersonalFinanceComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
