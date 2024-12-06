import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import populationData from "../src/routes/populationRoute";
import countriesData from "../src/routes/countriesRoute";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', populationData, countriesData);

app.get("/", (req: Request, res: Response) => {
  res.json({ test: "Ok" });
});

connectDB()
const PORT = 5000;
app.listen(PORT, () => {
  console.log("server has started on port");
  console.log("http://localhost:" + PORT);
});