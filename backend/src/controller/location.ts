import { keepLocation } from "@/repository/location/location.repository";
import { LocationPayload } from "@/types/location";
import { broadcast } from "@/utils/sse";
import { Request, Response } from "express";

export async function location(req: Request, res: Response) {
  try {
    const payload = req.body as LocationPayload;

    const { status, message } = await keepLocation(payload);

    if (!status) {
      return res.status(400).json({ status: false, message });
    }

    broadcast("location", {
      eventType: "location",
      userId: 'unknown',
      timestamp: Date.now(),
      metadata: {
        page: req.originalUrl,
        browser: req.headers["user-agent"],
        location: {
          lat: payload.lat,
          lng: payload.lng,
        },
        timestamp: Date.now(),
        userData: {
          name: payload.userData.name
        },
      },
    });

    return res.status(200).json({ status: true, message: null });

  } catch (error: any) {
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}
