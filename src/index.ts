import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import populationData from "../src/routes/populationRoute";
import countriesData from "../src/routes/countriesRoute";
import userAuth from "../src/routes/userRoute";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use('/api/v1', populationData, countriesData, userAuth);

app.get("/", (req: Request, res: Response) => {
  res.json({ test: "Ok" });
});

connectDB()
const PORT = 5000;
app.listen(PORT, () => {
  console.log("server has started on port");
  console.log("http://localhost:" + PORT);
});