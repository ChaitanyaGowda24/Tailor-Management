import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';

@Component({
selector: 'app-map',
templateUrl: './map.component.html',
styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
@Input() initialLocation: [number, number] = [51.505, -0.09]; // Default location (London)
@Input() isEditing: boolean = false;
@Output() locationChanged = new EventEmitter<[number, number]>();

private map: L.Map | undefined;
private marker: L.Marker | undefined;

constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Initialize the map
    this.map = L.map('map').setView(this.initialLocation, 13);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    // Add a marker
    this.marker = L.marker(this.initialLocation, { draggable: this.isEditing }).addTo(
      this.map
    );

    // Emit location changes when the marker is dragged
    this.marker.on('dragend', () => {
      const newLocation = this.marker!.getLatLng();
      this.locationChanged.emit([newLocation.lat, newLocation.lng]);
    });
  }

  // Method to update the map location
  updateLocation(newLocation: [number, number]) {
    if (this.map && this.marker) {
      this.map.setView(newLocation, 13); // Set the map view to the new location
      this.marker.setLatLng(newLocation); // Move the marker to the new location
    }
  }
}
