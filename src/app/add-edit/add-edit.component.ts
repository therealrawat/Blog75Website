import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../Service/services.service';
import { EncryptionserviceServiceService } from '../encryptionservice-service.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent {

  title = "Add New Employee"

  myForm!: FormGroup;
  constructor(private encrypt: EncryptionserviceServiceService, private _snackBar: MatSnackBar, private services: ServicesService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  isEditable = false;
  idData: number = 0;
  str: any
  posts: any = [];
  department: any = [];
  ngOnInit() {

    this.route.queryParams.subscribe(param => {
      this.str = param['id'];
      // this.idData = param['id']
      // id decrypted
      this.str = this.encrypt.decryptUsingAES256(this.str)
      this.idData = parseInt(this.str)
      console.log(typeof (this.idData))
      console.warn("id comimg from home:", this.idData);

    });
    this.myForm = this.formBuilder.group({
      employeeId: new FormControl('', [
        Validators.required,
        Validators.maxLength(10)
      ]),
      employeeName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20)
      ]),
      companyName: new FormControl('', [
        Validators.required,
      ]),
      companyAddress: new FormControl('', [
        Validators.required,
        Validators.maxLength(16)
      ]),
      designation: new FormControl('', [
        Validators.required
      ]),
      departmentId: new FormControl('', [
        Validators.required
      ]),
      uan: new FormControl('', [
        Validators.required,
        // Validators.minLength(12),
        Validators.maxLength(12)
      ]),
      pfno: new FormControl('', [
        Validators.required,
        // Validators.minLength(12),
        Validators.maxLength(12)
      ]),
      esino: new FormControl('', [
        Validators.required,
        // Validators.minLength(12),
        Validators.maxLength(12)
      ]),
      bankName: new FormControl('', [
        Validators.required
      ]),
      bankAcno: new FormControl('', [
        Validators.required,
        // Validators.minLength(12),
        Validators.maxLength(12),
        Validators.pattern("^(0|[1-9][0-9]*)$")
      ]),

      // month: new FormControl('', [
      //   Validators.required
      // ]),
      // year: new FormControl('', [
      //   Validators.required
      // ]),

      basicPay: new FormControl('',
        [
          Validators.required,
          Validators.pattern("^(0|[1-9][0-9]*)$")
        ]),
      hra: new FormControl('', [
        Validators.required,
        Validators.pattern("^(0|[1-9][0-9]*)$")
      ])
    })

    this.GetDesignation();
    // this.GetDepartmentList();
    this.getById(this.idData);

    if (this.idData > 0) {
      this.title = "Update Employee"
    }
  }

  get employeeId() {
    return this.myForm.get('employeeId')
  }
  get employeeName() {
    return this.myForm.get('employeeName')
  }
  get companyName() {
    return this.myForm.get('companyName')
  }
  get companyAddress() {
    return this.myForm.get('companyAddress')
  }
  get designation() {
    return this.myForm.get('designation')
  }
  get departmentId() {
    return this.myForm.get('departmentId')
  }
  get uan() {
    return this.myForm.get('uan')
  } get pfno() {
    return this.myForm.get('pfno')
  } get esino() {
    return this.myForm.get('esino')
  } get bankName() {
    return this.myForm.get('bankName')
  }

  // get month() {
  //   return this.myForm.get('month')
  // }
  // get year() {
  //   return this.myForm.get('year')
  // }

  get basicPay() {
    return this.myForm.get('basicPay')
  }
  get hra() {
    return this.myForm.get('hra')
  }
  get bankAcno() {
    return this.myForm.get('bankAcno')
  }



  getById(id: number) {
    console.warn("ouside function", id);
    this.services.GetDataByID(id).subscribe((res: any) => {
      this.myForm.patchValue(res)
      this.myForm.patchValue({ departmentId: res.departmentId })
      console.warn(res);

    })
  }

  UpdateData(data: any) {
    data.Id = this.idData;
    console.log(data.Id, this.idData)
    this.services.AddEditEmployee(data).subscribe((result) => {
      console.warn(result);


      if (result && data.Id > 0) {
        this._snackBar.open(data.employeeName + "'s details have been updated.", "close", { duration: 2500, horizontalPosition: 'center', verticalPosition: 'top' });
        this.router.navigate(['datalist'])
      }

      else if (!data.Id) {
        console.warn("add working");
        
        this._snackBar.open("A new employee has been added.", "close", { duration: 2500, horizontalPosition: 'center', verticalPosition: 'top' });
        this.router.navigate(['datalist'])
      }
      else {
        this._snackBar.open("Error", "close", { duration: 2500 });
      }
    })

  }

  Year: any[] = [
    { value: 2023, viewValue: '2023' },
    { value: 2022, viewValue: '2022' },
    { value: 2021, viewValue: '2021' },
    { value: 2020, viewValue: '2020' }
  ];


  GetDesignation() {
    this.services.GetDesignationList().subscribe((res: any) => {
      console.warn(res);
      this.posts = res;
    })
  }

  // GetDepartmentList() {
  //   this.services.GetDepartmentList().subscribe((res: any) => {
  //     console.warn("department:", res);
  //     this.department = res;
  //     console.warn(res.departmentId);

  //   })
  // }

  Department: any[] = [
    { departmentId: 1, departmentName: 'Microsoft' },
    { departmentId: 2, departmentName: 'Big Data' },
    { departmentId: 3, departmentName: 'Human Resource' },
    { departmentId: 4, departmentName: 'Networking' },
    { departmentId: 5, departmentName: 'Accounting' },
    { departmentId: 6, departmentName: 'R&D' },
    { departmentId: 7, departmentName: 'Designing' },
    { departmentId: 8, departmentName: 'Marketing' },
    { departmentId: 9, departmentName: 'Other' }
  ];
}
