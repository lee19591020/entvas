export interface User {
    lat: string;
    lng: string;
    timestamp?: number;
    userData: {
        name: string;
    }
}