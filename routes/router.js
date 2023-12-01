/** @format */

import express from "express";
import roomsRouter from "./room.js";

const router = express.Router();

router.use("/room", roomsRouter);

export default router;
