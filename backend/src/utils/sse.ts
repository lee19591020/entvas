import { Request, Response, NextFunction } from "express";


export type EventData = {
  eventType: string;
  userId: string;
  timestamp: string;
  metadata: MetaData
}
export type MetaData = {
  page: string;
  browser: string;
  location?: {
    lat: string;
    lng: string;
  },
  userData: {
    fname: string;
    lname: string;
  }
}

export const clients: Response[] = [];

export function broadcast(eventType: string, payload: any) {
  const data = { ...payload };
;  const sseFormatted = (
    `event: ${eventType}\n` +
    `data: ${JSON.stringify(data)}\n\n`
  );
  clients.forEach(c => c.write(sseFormatted));
}

export function eventMiddleware(
  eventType: string,
  buildMetadata: (req: Request, res: Response) => any
) {
  return function (req: Request, res: Response, next: NextFunction) {
    res.on("finish", () => {
      try {
        const metadata = buildMetadata(req, res);
        const event = {
          eventType: eventType.replace(/([A-Z])/g, "_$1").toLowerCase(),
          userId: req.admin?._id,
          timestamp: Date.now(),
          metadata,
        };
        broadcast(eventType, event);
      } catch (err) {
        console.error("Error building event data:", err);
      }
    });
    next();
  };
}
