/**
 * @openapi
 * /api/register:
 *   post:
 *     summary: Register a new admin
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - fname
 *               - lname
 *               - email
 *               - imageData
 *               - ext
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin01
 *               password:
 *                 type: string
 *                 example: secret123
 *               fname:
 *                 type: string
 *                 example: John
 *               lname:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               imageData:
 *                 type: string
 *                 example: base64EncodedStringHere
 *               ext:
 *                 type: string
 *                 example: .png
 *     responses:
 *       200:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Registration complete
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - "\"email\" is required"
 */



import express from "express";
import paraValidator from "@/utils/param-validator";
import { validate } from "express-validation";
import { Register } from "@/controller/register";
import Auth from "@/middleware/auth-middleware";

const router = express.Router();


router.route("/register").post(validate(paraValidator.register), Auth, Register);

export default router;
