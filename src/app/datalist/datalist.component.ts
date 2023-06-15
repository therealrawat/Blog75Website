import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../Service/services.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { formatDate } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EncryptionserviceServiceService } from '../encryptionservice-service.service';

@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.css']
})
export class DatalistComponent implements OnInit {
  
  title = "Employee List"
  displayedColumns = ['employeeId', 'employeeName','companyName', 'designation', 'doj', 'action'];
  today = new Date();
  // deleteTime = '';
  dataSource:any;
  value:any;

  constructor(private services: ServicesService, private router:Router, private _snackBar:MatSnackBar, private encrypt:EncryptionserviceServiceService) { 
    // this.deleteTime = formatDate(this.today, 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }

  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatSort) private sort!: MatSort;


  ngOnInit(): void {
    this.FetchEmployeeData();
  }

  FetchEmployeeData() {
    this.services.GetActiveEmployee().subscribe((result) => {
      this.value = result
      console.warn(this.value);

      this.dataSource = new MatTableDataSource<any>(this.value)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort

    })
  }

  toAdd()
  {
    this.router.navigate(['addedit']) // to be change
  }

  editData(id: number) {
    // this.router.navigate(['addedit'], { queryParams: { id: id } });
    this.router.navigate(['addedit'], { queryParams: { id: this.encrypt.encryptUsingAES256(id) }})
  }

  search(event:Event)
  {
    const filterVal = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterVal;
  }

  salarySlip(id: number) {
    this.router.navigate(['payslip'], { queryParams: { id: this.encrypt.encryptUsingAES256(id) } });
  }

  delete(index: any) {

    if (confirm("Confirm delete Employee?")) {
      console.warn("index deleted: ", index);
      this.services.DeleteEmployee(index).subscribe((result) => {
        console.warn(result);
        this.FetchEmployeeData(); // for quick reload
        this._snackBar.open("Employee deleted successfully.", "close", { duration: 2500, horizontalPosition: 'right', verticalPosition: 'top' });
      });
    }
    else {
      this._snackBar.open("Employee not deleted.", "close", { duration: 2500, horizontalPosition: 'right', verticalPosition: 'top' });

    }
  }

  

}
