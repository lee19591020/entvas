export interface LocationPayload {
  lat: string;
  lng: string;
  userData: UserData;
}

export interface UserData {
  name: string;
}

export interface LocationHistory {
  lat: string;
  lng: string;
}

export interface LocationResult {
  status: boolean;
  message: string;
}
