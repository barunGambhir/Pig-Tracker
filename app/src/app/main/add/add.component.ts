import { Component, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DataService } from 'src/app/data.service';

import { DatePipe } from '@angular/common';

import { v4 as uuidv4 } from 'uuid';



import {MatSortModule, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


import * as L from 'leaflet';

import { icon, Marker } from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import { PopComponent } from './pop/pop.component';
const iconRetinaUrl = 'assets/marker-icon-2x.png'
const iconUrl = 'assets/marker-icon.png'
const shadowUrl = 'assets/marker-shadow.png'
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [24, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

Marker.prototype.options.icon = iconDefault;

@Injectable()


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit, AfterViewInit {

  //form/table
  userForm: FormGroup;
  listData:any;

  //map
  private map: L.Map | L.LayerGroup<any> | undefined | any;
  title: any;

  //server
  //people:any;


  //moreInfo

  moreInfo(){
    (document.getElementById('showInfo')as HTMLDivElement).style.display="block";
  }



  constructor(private fb:FormBuilder, private http: HttpClient, private dialogRef: MatDialog){
    this.listData=[];

    //this.people = []

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      phoneNo: ['', Validators.required],
      breed: ['', Validators.required],
      pid: ['', Validators.required],
      lName: ['', Validators.required],
      longitude: [Number, Validators.required],
      timeRep: new Date().getTime(),
      latitude: [Number, Validators.required],
      eNotes: ['', Validators.required],
      uniqueKey: uuidv4(),
      status: ['Ready For Pickup', Validators.required]
    })
  }

  openDialog(element:any){
    this.dialogRef.open(PopComponent, {
      data:{
        name: element.name,
        phone: element.phoneNo,
        pid: element.pid,
        breed: element.breed,
        location: element.lName,
        extra: element.eNotes,
        status: (document.getElementById('status') as HTMLButtonElement).innerHTML,
        time: element.timeRep
      }
    });
  }


  public addItem() : void{


    this.listData.push(this.userForm.value);

    console.log(this.listData.latitude);
    console.log(this.listData.longitude);

    this.http.post('https://272.selfip.net/apps/dPPLLNqLSt/collections/people/documents/',
    {"key":this.userForm.value.uniqueKey, "data":this.userForm.value}
    ).subscribe((data:any)=>{
      console.log(data)
    })
    this.userForm.value.uuid = uuidv4();
    this.userForm.reset();
    (document.getElementById('addForm') as HTMLFormElement).style.display = 'none';
    window.location.reload();
    //map


  }

  //mapentries:



  reset(){
    this.userForm.reset();
  }

  removeItem(element: any, key:string){

    let password: String|null = prompt("If you wish to delete the report of this pig, enter password and click OK. Else, press Cancel");
      
    if(password == "OINK!!"){
      console.log(element);
      this.http.delete('https://272.selfip.net/apps/dPPLLNqLSt/collections/people/documents/' + key)
      .subscribe((data:any) => {
        console.log(data);
        window.location.reload();
      });
      this.listData.forEach((value: any, index: any) => {
        if(value==element){
          this.listData.splice(index, 1);
        }
      });
      console.log(this.listData);
    }
    else if(password == null || password == ""){
    }
    else{
      alert("Password is incorrect. Action cancelled");
    }
  }


  statusChange(){
    let password: String|null = prompt("If you wish to change the status of this pig, enter password and click OK. Else, press Cancel");
    
    if(password == "OINK!!"){
      (document.getElementById('status') as HTMLButtonElement).innerHTML = "RETRIEVED";
    }
    else if(password == null || password == ""){

    }
    else{
      alert("Password is incorrect. Action cancelled");
    }

  }

  revealForm(){
    if((document.getElementById('addForm') as HTMLFormElement).style.display = 'block'){
      (document.getElementById('addForm') as HTMLFormElement).style.display = 'none';
    }
    (document.getElementById('addForm') as HTMLFormElement).style.display = 'block';
  }


  closeResult: string | undefined;



  sortData(sort: Sort) {
    const data = this.listData.slice();
    if (!sort.active || sort.direction === '') {
      this.listData = data;
      return;
    }

    this.listData = data.sort((a: any, b:any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'location':
          return this.helper(a.data.location, b.data.location, isAsc);
        case 'name':
          return this.helper(a.data.name, b.data.name, isAsc);
          case 'dt':
            return this.helper(a.data.dt, b.data.dt, isAsc);
        default:
          return 0;
      }
    });
    //console.log(this.listData);
  }
  
  public helper(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngOnInit(): void {

    this.http.get<Object>('https://272.selfip.net/apps/dPPLLNqLSt/collections/people/documents/')
      .subscribe((data:any)=>{
        this.listData = data
        //console.log(this.people)
        // this should go in the peopleService component
      })

  }

  coordinates_map:any;

  testMap:Map<string, number> = new Map<string, number>();

  ngAfterViewInit() {
    this.map = L.map('mapid').setView([49.2, -123], 11);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY21wdDI3Mm1hcCIsImEiOiJjbGIydTUzd2MwODN3M3Bxbmt0MXl4NTduIn0.lLB-Ok1BrMTtAsqSSGzZwQ', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
      }).addTo(this.map);

      //console.log(this.userForm.value.latitude);
      //console.log(this.listData.longitude);

      

      this.http.get<Object>('https://272.selfip.net/apps/dPPLLNqLSt/collections/people/documents/')
      .subscribe((data:any)=>{
        this.coordinates_map = data;
        for(let i=0; i<this.coordinates_map.length; i++){
          // let key:string = this.coordinates_map[i].data.latitude + this.coordinates_map[i].data.longitude
          // if(this.testMap.has(key)){
          //   this.map.set(key, this.map.get(key)+1);
          // }
          // else{
          //   this.map.set(key, 1);
          // }
          L.marker([ parseFloat(this.coordinates_map[i].data.latitude), parseFloat(this.coordinates_map[i].data.longitude) ]).addTo(this.map)
      .bindPopup("<b>"+ this.coordinates_map[i].data.lName +"</b><br />" + 1 +" cases reported.").openPopup();
        }

      })
  
      /*L.marker([49.2276, -123.0076]).addTo(this.map)
      .bindPopup("<b>Metrotown</b><br />cases reported.").openPopup();
  
      L.marker([49.1867, -122.8490]).addTo(this.map)
      .bindPopup("<b>SFU Surrey</b><br />cases reported.").openPopup();
  */
  }

  
}
