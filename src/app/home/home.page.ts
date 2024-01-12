import { Component, OnDestroy, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { GeolocationPosition } from 'src/models/geolocation.interface';
import { interval, Subscription } from 'rxjs';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, OnDestroy {
  
  geolocationPosition: GeolocationPosition;
  private positionSubscription: Subscription;
  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);

  ngOnInit(): void {
    this.getGeolocations();
    this.positionSubscription = interval(5000)
      .subscribe(() => {
        this.printCurrentPosition();
        this.addDoc();
      });
  }

  ngOnDestroy(): void {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }

  async addDoc() {
    try {
      if (this.geolocationPosition) {
        const { latitude, longitude } = this.geolocationPosition.coords;
        const docRef = await addDoc(collection(this.db, 'idGeolocation'), {
          latitude: latitude,
          longitude: longitude,
          timestamp: new Date(),
        });
        console.log('Document added with ID: ', docRef.id);
      }
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }

  async getGeolocations() {
    const coordinates = collection(this.db, 'idGeolocation');
    const coordinatesSnapshot = await getDocs(coordinates);
    const geolocationList = coordinatesSnapshot.docs.map(doc => doc.data());
    console.log(geolocationList);
  }

  printCurrentPosition = async (): Promise<void> => {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.geolocationPosition = coordinates;     
    } catch (error) {
      console.error('Error getting current position:', error);
    }
  };
}
