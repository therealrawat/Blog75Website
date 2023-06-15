import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatalistComponent } from './datalist/datalist.component';
import { HomeComponent } from './home/home.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { PayslipComponent } from './payslip/payslip.component';

const routes: Routes = [
  {
    path: 'datalist',
    component: DatalistComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'addedit',
    component: AddEditComponent
  },
  {
    path:'payslip',
    component: PayslipComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
