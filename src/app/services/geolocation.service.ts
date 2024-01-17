import { Injectable } from '@angular/core';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Capacitor } from '@capacitor/core';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Injectable({ providedIn: 'root' })
export class GeolocationService {
	constructor() { }

	//* Check GPS permissions
	async checkGPSPermission(): Promise<boolean> {
		return await new Promise((resolve, reject) => {
			if (Capacitor.isNativePlatform) {
				AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
					.then((result) => {
						if (result.hasPermission) {
							resolve(true);
						} else {
							resolve(false);
						}
					}, error => {
						alert(error)
					});
			}
		});
	}

	//* Request Permission GPS
	async requestGPSPermission(): Promise<string> {
		return await new Promise((resolve, reject) => {
			LocationAccuracy.canRequest().then((canRequest: boolean) => {
				if (canRequest) {
					resolve('CAN_REQUEST');
				} else {
					AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
						.then(
							(result) => {
								if (result.hasPermission) {
									resolve('GOT_PERMISSION');
								} else {
									reject('DENIED_PERMISSION');
								}
							}, error => {
								alert(`Request permission error requesting location permission ${error}`);
							}
						);
				}
			});
		});
	}

	//* Request to turn on the GPS
	async askToTurnOnGPS(): Promise<boolean> {
		return await new Promise((resolve, reject) => {
			LocationAccuracy.canRequest().then((canRequest: boolean) => {
				if (canRequest) {
					LocationAccuracy.request((LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY))
						.then(() => {
							resolve(true);
						}, error => { resolve(false) });
				} else {
					resolve(false);
				}
			});
		});
	}
}