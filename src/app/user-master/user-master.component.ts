import { HttpClient } from '@angular/common/http';
import { asNativeElements, Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { DecimalPipe } from '@angular/common';
Chart.register(...registerables);

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css']
})
export class UserMasterComponent implements OnInit {

  pageTitle = 'Employee Worked';

  // private Url = 'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==';

  userList: any [] = []

  userDataSource: any [] = []

  percentSum: any [] = []
  
  TotalTime: any;

  // addition : any [] = [];
  // sub : any [] = [];

  // chData : any [] = [];

  // chDataTables : any [] = [];
  
  constructor(private httpClient : HttpClient){
    this.getEmployee();
    // this.percentDiff();
  }

  // var name :string = this.getEmployee();
  

  ctx : any;
  config : any;
  chartData:any[] = [this.userDataSource];
  chartDatatables : any [] = [this.userDataSource];

  

  ngOnInit(): void {    
    this.chartData.push('74.5');
    this.chartData.push('33');
    this.chartData.push('66.5');
    this.chartData.push('83.5');
    this.chartData.push('61.5');
    this.chartData.push('76');
    this.chartData.push('64.5');
    this.chartData.push('43');
    this.chartData.push('37');
    this.chartData.push('80');
    this.chartData.push('11.5');

    this.chartDatatables.push('Abhay Singh');
    this.chartDatatables.push('Tamoy Smith');
    this.chartDatatables.push('Mary Poppins');
    this.chartDatatables.push('Patrick Huthinson');
    this.chartDatatables.push('Kavvay Verma');
    this.chartDatatables.push('Jhon Black');
    this.chartDatatables.push('Tim Perkinson');
    this.chartDatatables.push('Rita Alley');
    this.chartDatatables.push('Raju Sunuwar');
    this.chartDatatables.push('Stewart Malachi');
    this.chartDatatables.push('Anonumous');

    this.ctx = document.getElementById('myChart');
    this.config = {
      type : 'pie',
      options: {},
      data : {
        labels : this.chartDatatables,
        datasets: [{
          label:'Chart Data',
          data: this.chartData,
        }],
      }
    }

    console.log('this.ctx',this.ctx);
    
    const myChart = new Chart(this.ctx, this.config);
   }

//  Adding the Hours in the 
sumObj(){
  let newArr : any [] = [];

  console.log('userList',this.userList);

  this.userList.forEach((obj:any) => {

    if(obj.EmployeeName in newArr){
      let totalHours = this.dateDiff(obj);
      newArr[obj.EmployeeName] += totalHours;
    }else{
      let totalHours = this.dateDiff(obj);
      newArr[obj.EmployeeName] = totalHours;
    }
  });
  for(var prop in newArr){
    // if(prop!=='null'){
    //     // return 'Anonumous';
    //   this.userDataSource.push({EmployeeName:prop, TotalTime: newArr[prop]});
    //   }else if(prop==='null'){
    //     return 'null';
    //   }
    this.userDataSource.push({EmployeeName: prop, TotalTime: newArr[prop]});
  }

  // this.percentDiff();
  return this.userDataSource;
}

 // Importing the data from the json server link
  getEmployee(){
    this.httpClient
    .get('https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==')
    // .get(this.Url)
    .subscribe((result : any) => {
      this.userList = result;
      this.sumObj();
    });
  }
// To find the difference between two timeStamp
  dateDiff(dataDate:any){
    const dateS = new Date(dataDate.StarTimeUtc);
    dateS.toLocaleString();
    const dateE = new Date(dataDate.EndTimeUtc);
    dateE.toLocaleString();

    var duration = moment.duration(moment(dateE, 'DD/MM/YYYY HH:mm:ss').diff( moment(dateS, 'DD/MM/YYYY HH:mm:ss')));

    var hours = duration.hours();
    return hours;
  }

percentDiff(){

// let value = this.TotalTime.length;
// for(let num = 0;num>=value;num++){
//   // console.log(num);
//   let num2 = this.TotalTime;
//   console.log(num2/200*100);
// }

// let add = this.TotalTime.values() ;
//   // this.TotalTime.values()
//   var arr = add;
//   console.log(arr);
  
// let value = this.TotalTime/200*100;
// return value;

this.userDataSource.forEach((data:any) =>{
 
console.log('TotalTime',data.TotalTime);


});

// for(var pre in this.addition ){
//     // this.sub.push({TotalTime:obj, })

// // this.sum.push[{EmployeeName}]

// }

}

}
