import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet'
import { Geolocation } from '@capacitor/geolocation'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {
  map: any;

  ngOnInit(): void {
    this.loadMap();
  }

  loadMap() {
    this.map = L.map('map').setView([0, 0], 2)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map)
  }
}
