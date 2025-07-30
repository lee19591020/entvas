import locationCollection from "@/model/location.model";
import { LocationPayload, LocationResult } from "@/types/location";

export async function keepLocation(
  location: LocationPayload
): Promise<LocationResult> {
  try {
    await locationCollection.create({
      lat: location.lat,
      lng: location.lng,
      userData: location.userData,
    });
    return {
      status: true,
      message: "keep location success",
    } as LocationResult;
  } catch (e: any) {
    return {
      status: false,
      message: e.message,
    } as LocationResult;
  }
}
