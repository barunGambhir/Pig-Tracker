import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

import { icon, Marker } from 'leaflet';
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


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{
  private map: L.Map | L.LayerGroup<any> | undefined;
  title: any;
  
  constructor(){ }

  ngAfterViewInit(): void {
      this.map = L.map('mapid').setView([49.2, -123], 11);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY21wdDI3Mm1hcCIsImEiOiJjbGIydTUzd2MwODN3M3Bxbmt0MXl4NTduIn0.lLB-Ok1BrMTtAsqSSGzZwQ', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
      }).addTo(this.map);
  
      L.marker([49.2276, -123.0076]).addTo(this.map)
      .bindPopup("<b>Metrotown</b><br />cases reported.").openPopup();
  
      L.marker([49.1867, -122.8490]).addTo(this.map)
      .bindPopup("<b>SFU Surrey</b><br />cases reported.").openPopup();
  
    }

}
