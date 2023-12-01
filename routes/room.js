/** @format */

import express from "express";
import roomController from "../controllers/roomController.js";
const router = express.Router();

router.post("/createRoom", roomController.createRoom);
router.post("/bookRoom", roomController.bookRoom);
router.get("/allBookedRoom", roomController.getAllBookedRoom);
router.get("/listCustomers", roomController.getAllCustomerData);
router.get("/customerBookingHistory/:customerName", roomController.bookedCount);

export default router;
