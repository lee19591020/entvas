/**
 * @openapi
 * /api/location:
 *   post:
 *     summary: Submit location
 *     tags:
 *       - Location
 *     security: []  # 👈 This disables auth for this route
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lat
 *               - lng
 *               - userData
 *             properties:
 *               lat:
 *                 type: number
 *                 example: 123.456
 *               lng:
 *                 type: number
 *                 example: 78.901
 *               userData:
 *                 type: object
 *                 required:
 *                   - name
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: John Doe
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 */



import express from "express";
import paraValidator from "../utils/param-validator";
import { validate } from "express-validation";
import { location } from "@/controller/location";
import { limiter } from "@/middleware/limiter";

const locationLimiter = limiter({ windowMs: 60_000, max: 10 });

const router = express.Router();

router.post('/',locationLimiter, validate(paraValidator.location), location);

export default router;
