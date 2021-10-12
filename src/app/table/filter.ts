import { rowElmentWithKey } from './../rowElmentWithKey';
import { DataServiceService } from './../data-service.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource,} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { row } from '../row';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  displayedColumns: string[] = ['key', 'open', 'high', 'low','close','benfit'];
  public myData: {};
  public dataSource : rowElmentWithKey[];
  public dataSourceForTable : row[]=[]
  public arrOfStrDate: string[] = [];
  selected:string=""
  constructor(private data: DataServiceService) {
    this.dataSource  = [];
    this.myData = {};
    this.arrOfStrDate = [];
    this.arrOfStrDate = this.getDatesByStr();
  }
  //get the json data from web and transforming it arrey
  getData(): void {
    let i = 0;
    this.data.getData().subscribe((res) => {
      
      while (i < 20) {
        let str = this.arrOfStrDate[i];
        let row: rowElmentWithKey = {...res['Time Series (Daily)'][str],key: str};
        i++;
        this.dataSource .push(row);
      }
      for(let i=0;i<20;i++)
      {
        let row:row={
          open: this.dataSource[i]["1. open"],
          high: this.dataSource[i]["2. high"],
          low: this.dataSource[i]["3. low"],
          close :this.dataSource[i]["4. close"],
          key: this.dataSource[i]["key"]}
          this.dataSourceForTable.push(row)
      }
      console.log(this.dataSourceForTable)
      this.dataSourceForTable.shift()
     }  );
  }
  ngOnInit(): void {
    this.getData();
  }
  ngAfterViewInit() {}
  checkFridayOrStarday(date: Date): boolean {
    if (date.getDay() == 0 || date.getDay() == 6) {
      return false;
    } else {
      return true;
    }
  }
  //return date as "yy-mm-day"
  dateTostr(d: Date): string {
    let year: string = d.getFullYear().toString();
    let month = d.getMonth() + 1;
    let strMonth: string;
    if (month < 10) {
      strMonth = '0' + month;
    } else {
      strMonth = month.toString();
    }
    let day: string = '';
    if (d.getDate() < 10) {
      day = '0' + d.getDate().toString();
    } else {
      day = d.getDate().toString();
    }
    let str: string = year + '-' + strMonth + '-' + day;
    return str;
  }
  //return arr of key for the json
  getDatesByStr(): string[] {
    let arr = [];
    let date = new Date();
    date.setHours(date.getHours() - 7);
    let counter = 0;
    while (counter < 30) {
      if (this.checkFridayOrStarday(date)) {
        arr.push(this.dateTostr(date));
        date.setDate(date.getDate() - 1);
      } else {
        date.setDate(date.getDate() - 1);
      }
      counter++;
    }
    return arr;
  }
}
