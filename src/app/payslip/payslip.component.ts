import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../Service/services.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { EncryptionserviceServiceService } from '../encryptionservice-service.service';
import numWords from "num-words"


@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})


export class PayslipComponent {
  title = "Pay Slip";
  // idData: number = 0;
  companyName: string = ""
  Address: string = ""
  date: any

  currentDate = formatDate(new Date(), 'dd-MM-yyyy', 'en');
  EmployeeName: string = ""
  employeeId: string = ""
  designation = ""
  departmentName = ""
  uan = ""
  pfno = ""
  esino = ""
  bankName = ""
  bankAcno = ""

  basicPay: number = 0;
  hra: number = 0;
  epf: number = 0;
  esi: number = 0;

  totalEarning: number = 0;
  totalDeduction: number = 0;
  netSalary: number = 0;

  data: any

  str: any;

  figure:any;
  words:any;
  capitalizedWords:any;

  constructor(private route: ActivatedRoute, private services: ServicesService, private encrypt: EncryptionserviceServiceService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      this.str = param['id'];

      this.str = this.encrypt.decryptUsingAES256(this.str)

      this.getDataByID(this.str)

      console.warn(this.capitalizedWords);

    });
  }

  getDataByID(id: any) {
    this.services.GetDataByID(id).subscribe((res: any) => {
      console.warn("res", res);
      this.companyName = res.companyName
      this.Address = res.companyAddress

      // this.date = res.doj
      this.date = formatDate(res.doj, 'dd/MM/yyyy', 'en-US')

      this.EmployeeName = res.employeeName
      this.employeeId = res.employeeId
      this.designation = res.postName
      this.departmentName = res.departmentName
      this.uan = res.uan
      this.pfno = res.pfno
      this.esino = res.esino
      this.bankName = res.bankName
      this.bankAcno = res.bankAcno

      this.bankAcno = "XXXXXX" + this.bankAcno.slice(6, this.bankAcno.length);
      this.basicPay = res.basicPay
      this.hra = res.hra

      this.epf = res.epf
      this.esi = res.esi

      this.totalEarning = this.basicPay + this.hra
      this.totalDeduction = this.epf + this.esi
      this.netSalary = this.totalEarning - this.totalDeduction

      console.warn(typeof(this.netSalary));
      
      this.figure = this.netSalary
      console.warn("fig", this.figure);
      this.words = numWords(this.figure);
      this.capitalizedWords = "Rupee " +   this.words.charAt(0).toUpperCase() + this.words.slice(1) + " only";  

      console.warn(this.words);
    })

  }

  public SavePDF(): void {

    let DATA: any = document.getElementById('content');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(`${this.EmployeeName}PaySlip.pdf`);
    });
  }
}
