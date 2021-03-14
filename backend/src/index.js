import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import movies from "./routes/movies.js";
import statistics from "./routes/statistics.js";

const app = express();

app.use(cors());

app.options("*", cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/movies", movies());
app.use("/api/statistics", statistics());
app.get("*", function(req, res){
  res.status(404).send("page not found");
});
app.listen(8000, () => {
  console.log(`Server is listening on port: ${8000}`);
});
