/** @format */

import express from "express";
import dotenv from "dotenv";
import AppRouter from "./routes/router.js";
dotenv.config();
const app = express();
app.use(express.json());
const PORT = Number(process.env.PORT) || 8001;

app.use("/", AppRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Server! ");
});

app.listen(PORT, () => {
  console.log(`server is listening to port: ${PORT}`);
});
