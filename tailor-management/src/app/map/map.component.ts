import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
selector: 'app-map',
templateUrl: './map.component.html',
styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
private map: L.Map | undefined;

constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Set the initial map view to a specific location and zoom level
    this.map = L.map('map').setView([51.505, -0.09], 13);

    // Add a tile layer (you can use OpenStreetMap or other providers)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add a marker (optional)
    L.marker([51.505, -0.09]).addTo(this.map)
      .bindPopup('A sample location.')
      .openPopup();
  }
}
