import { NextFunction, Request, Response } from "express";

type Entry = { count: number; start: number };
const clients = new Map<string, Entry>();

export function limiter(opts: { windowMs: number; max: number }) {
  const { windowMs, max } = opts;
  return (req: Request, res: Response, next: NextFunction) => {
    const key =
      req.ip
      || (Array.isArray(req.headers['x-forwarded-for'])
            ? req.headers['x-forwarded-for'][0]
            : req.headers['x-forwarded-for'] as string)
      || req.socket.remoteAddress
      || 'unknown';
    const now = Date.now();
    const entry = clients.get(key);

    if (entry) {
      if (now - entry.start < windowMs) {
        entry.count++;
        if (entry.count > max) {
          return res.status(429).json({ error: 'Too many requests.' });
        }
      } else {
        entry.count = 1;
        entry.start = now;
      }
    } else {
      clients.set(key, { count: 1, start: now });
    }
    next();
  };
}