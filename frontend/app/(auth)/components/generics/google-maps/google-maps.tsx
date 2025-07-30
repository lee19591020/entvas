import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { FC, useEffect, useState } from "react";

import { InfoWindow } from "./info-window";
import { PulseMarker } from "./pulse-marker";
import { Users } from "@/(auth)/dashboard/types";

interface GmApsProps {
  users?: Users[];
}

export const GoogleMaps: FC<GmApsProps> = ({ users }) => {
  const [userLocations, setUserLocations] = useState<Users[]>([]);

  useEffect(() => {
    if (!users || users.length === 0) return;
    setUserLocations(users);
  }, [users]);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY ?? ""}>
      <Map
        style={{ width: "83vw", height: "65vh" }}
        defaultCenter={{ lat: 10.3157, lng: 123.8854 }} // Cebu as default
        defaultZoom={5}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        {userLocations.map((user, i) => (
          <PulseMarker
            key={`marker-${user.userData.name}-${i}`}
            position={{ lat: user.lat, lng: user.lng }}
            info={<InfoWindow user={user} />}
            emergency={false}
          />
        ))}
      </Map>
    </APIProvider>
  );
};
