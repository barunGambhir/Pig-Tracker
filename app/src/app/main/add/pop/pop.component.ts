import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.css']
})
export class PopComponent implements OnInit{

  name1:any;
  phone1:any;
  pid1:any;
  breed1:any;
  location1:any;
  extra1:any;
  status1:any;
  timeRep1:any

  constructor(@Inject(MAT_DIALOG_DATA) public data:any){
    this.name1 = data.name
    this.phone1 = data.phone
    this.pid1 = data.pid
    this.breed1 = data.breed
    this.location1 = data.location
    this.extra1 = data.extra
    this.status1 = data.status
    this.timeRep1 = data.timeRep
  }

  ngOnInit(): void {
      
  }
}
