import { row } from './../row';
import { DataServiceService } from './../data-service.service';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource,} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['key', 'open', 'high', 'low','close','benfit'];
  tableDB: MatTableDataSource<any> = new MatTableDataSource<any[]>()
  @ViewChild(MatSort ,{ static: false }) sort!: MatSort;
  @Input() dataSource?: row[];
   row:row[]=[{open: "900",
    high: "800",
    low: "500",
    close :"350",
    key: "720"}]
  
  constructor(private data: DataServiceService) {
    
    this.getData();
  }
  
  getData(): void {
      //  console.log(this.dataSource?.values)
      
      this.tableDB=new MatTableDataSource<row>(this.dataSource)
      this.tableDB.sort=this.sort
  }
  ngOnInit(): void {
    //this.getData();
  }
  ngAfterContentInit(){
    this.getData();
  }
  refresh() {
    
  }
  
  

  
  
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
