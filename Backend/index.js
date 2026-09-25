// require("dotenv").config({ path: "./backend/.env" });

require("dotenv").config();

const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();

const app = express();

const port = process.env.PORT || 5000;


//fro both local host and deployment
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

//for only deployement
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:3000",
//   }),
// );

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`NoteSpace backend listening at http://localhost:${port}`);
});
