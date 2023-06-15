import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {


  constructor(private http: HttpClient) { }

  getUrl = "http://localhost:5196/api/BankEmp/GetEmployeeDetails";
  postUrl = "http://localhost:5196/api/BankEmp/AddUpdateEmployeeDetails";

  GetActiveEmployee() {
    return this.http.get(this.getUrl);
  }

  GetDataByID(id: any) {
    return this.http.get(`http://localhost:5196/api/BankEmp/GetEmployeebyID?id=${id}`)
  }

  DeleteEmployee(id: any) {
    return this.http.delete(`http://localhost:5196/api/BankEmp/DeleteEmployeeDetails?id=${id}`)
  }

  AddEditEmployee(data: any) {
    console.warn(data);
    return this.http.post(this.postUrl, data);
    
  }

  GetDesignationList() {
    return this.http.get('http://localhost:5196/api/BankEmp/GetDegisnationList')
  }

}
