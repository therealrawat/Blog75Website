import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule  } from '@angular/material/button';
import {  MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule }  from '@angular/material/snack-bar';
import { MatStepperModule }  from '@angular/material/stepper';
import { MatSelectModule }  from '@angular/material/select'
import { MatSortModule }  from '@angular/material/sort'


import { NavbarComponent } from './navbar/navbar.component';
import { DatalistComponent } from './datalist/datalist.component';
import { HomeComponent } from './home/home.component'
import { HttpClientModule } from '@angular/common/http';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PayslipComponent } from './payslip/payslip.component';
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DatalistComponent,
    HomeComponent,
    AddEditComponent,
    PayslipComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, HttpClientModule, ReactiveFormsModule,
    MatStepperModule, MatSelectModule,MatSortModule,
    MatToolbarModule, MatButtonModule, MatIconModule,MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
