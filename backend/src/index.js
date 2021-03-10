import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import movies from "./routes/movies.js";

const app = express();

app.use(cors());

app.options("*", cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/movies", movies());

app.listen(8000, () => {
  console.log(`Server is listening on port: ${8000}`);
});
