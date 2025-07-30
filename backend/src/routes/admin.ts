
import { changePassword, getAdminById, getAdminList, updateAdmin } from "@/controller/admin";
import Auth from "@/middleware/auth-middleware";
import paraValidator from "@/utils/param-validator";
import express from "express";

import { validate } from "express-validation";

const router = express.Router();

/**
 * @openapi
 * /api/change-password:
 *   post:
 *     summary: Change admin password
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
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: oldpass123
 *               newPassword:
 *                 type: string
 *                 example: newpass456
 *     responses:
 *       200:
 *         description: Password changed successfully
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
 *                   example: Password changed
 *       400:
 *         description: Change failed
 */


router.route("/change-password").post(validate(paraValidator.changePass), Auth, changePassword);


/**
 * @openapi
 * /api/admin/get-admin-list:
 *   get:
 *     summary: Get list of all admins
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admins
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 66c84f58d8e154001e65cfb5
 *                       username:
 *                         type: string
 *                         example: admin01
 *                       email:
 *                         type: string
 *                         example: admin@example.com
 *                       fname:
 *                         type: string
 *                         example: John
 *                       lname:
 *                         type: string
 *                         example: Doe
 */


router.route("/get-admin-list").get(Auth, getAdminList);


/**
 * @openapi
 * /api/admin/get-admin-by-id/{adminId}:
 *   get:
 *     summary: Get admin details by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: adminId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the admin
 *     responses:
 *       200:
 *         description: Admin data retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
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
 *       404:
 *         description: Admin not found
 */


router.route("/get-admin-by-id/:adminId").get(validate(paraValidator.getAdminById), Auth, getAdminById);


/**
 * @openapi
 * /api/admin/update-admin:
 *   put:
 *     summary: Update admin details
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
 *               - email
 *               - fname
 *               - lname
 *               - imageData
 *               - ext
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               fname:
 *                 type: string
 *                 example: John
 *               lname:
 *                 type: string
 *                 example: Doe
 *               imageData:
 *                 type: string
 *                 example: base64EncodedImage
 *               ext:
 *                 type: string
 *                 example: .png
 *     responses:
 *       200:
 *         description: Admin updated
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
 *                   example: Update successful
 *       400:
 *         description: Validation error
 */


router.route("/update-admin").put(validate(paraValidator.updateAdmin), Auth, updateAdmin);

export default router;