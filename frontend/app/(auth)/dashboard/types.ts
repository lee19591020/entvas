export interface TableColumn {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface Users {
  lat: number;
  lng: number;
  userData: UserData;
  timestamp: number;
}

export interface UserData {
  name: string;
}

export type EventData = {
  eventType: string;
  timestamp: number;
  metadata: any;
};
