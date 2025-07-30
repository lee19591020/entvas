import { Box,  Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { EventData, Users } from "../types";

import TerminalLog from "@/(auth)/components/generics/terminal/TerminalLog";
import RequestsGraph from "@/(auth)/components/generics/request-graph/request-graph";
import { GoogleMaps } from "@/(auth)/components/generics/google-maps";

export const Dashboard = () => {

  const [events, setEvents] = useState<EventData[]>([]);
  const [userLocations, setUserLocations] = useState<Users[]>([]);

  useEffect(() => {
    const evt = new EventSource(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/events`);
    const handler = (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data) as EventData;
        setEvents((evts) => [
          ...new Map(
            [data, ...evts].reverse().map((item) => [item.timestamp, item])
          ).values(),
        ]);
      } catch (err) {
        console.error("Failed to parse SSE data", err);
      }
    };

    evt.addEventListener("pageView", handler);
    evt.addEventListener("location", locationHandler);
    evt.onmessage = handler;

    return () => {
      evt.close();
    };
  }, []);

    const locationHandler = (e: MessageEvent) => {
    try {

      const data = JSON.parse(e.data) as EventData;
      if (data.eventType === "location" && data.metadata) {
        const loc = data.metadata.location;
        const name = data.metadata.userData.name;
        const userLoc: Users = {
          lat: loc.lat,
          lng: loc.lng,
          timestamp: data.metadata.timestamp,
          userData: {
           name,
          },
        };
        // Optional: prevent duplicates
        setUserLocations((prev) => {
          const exists = prev.find(
            (u) => u.lat === userLoc.lat && u.lng === userLoc.lng && u.userData.name === userLoc.userData.name
          );
          return exists ? prev : [userLoc, ...prev];
        });
      }

      // Still log to terminal
      setEvents((evts) => [
        ...new Map(
          [data, ...evts].reverse().map((item) => [item.timestamp, item])
        ).values(),
      ]);
    } catch (err) {
      console.error("Failed to parse location SSE data", err);
    }
  };

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Box sx={{ mt: "12px", width: "100%" }}>
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Live API Events
          </Typography>
          <TerminalLog logs={events} />
        </Box>
        <Box sx={{ mt: "12px", width: "100%" }}>
          <RequestsGraph logs={events} />
        </Box>
        <Box sx={{ mt: "50px", width: "100%" }}>
          <GoogleMaps users={userLocations} />
        </Box>
      </Box>
    </Box>
  );
};
