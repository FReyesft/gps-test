interface GeolocationCoordinates {
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number;
  longitude: number;
  speed: number | null;
}

export interface GeolocationPosition {
  coords: GeolocationCoordinates;
  timestamp: number;
}