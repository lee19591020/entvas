/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Login as an admin
 *     tags:
 *       - Auth
 *     security: []  # 👈 Public endpoint (no bearer token required)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin01
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *                 admin:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 66c84f58d8e154001e65cfb5
 *                     username:
 *                       type: string
 *                       example: admin01
 *                     email:
 *                       type: string
 *                       example: admin@example.com
 *                     fname:
 *                       type: string
 *                       example: John
 *                     lname:
 *                       type: string
 *                       example: Doe
 *       400:
 *         description: Login failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Login failed
 */


import { Login } from "@/controller/authentication";
import paraValidator from "@/utils/param-validator";
import express from "express";

import { validate } from "express-validation";

const router = express.Router();

router.route("/login").post(validate(paraValidator.login), Login);

export default router;
