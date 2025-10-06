import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import {
  RegisterasDev,
  getAllActivity,
  iprateMonitormodel,
  DevLogin,
  fakeapi,
  tracelayerlogin,
  limitsetter,
} from "./index.js";

const app = express();

const PORT = process.env.PORT || 5500;

app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://tracelayer.netlify.app/", 
    ],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use("/api/", RegisterasDev);
app.use("/api/", getAllActivity);
app.use("/api/protected", iprateMonitormodel);
app.use("/api/", DevLogin);
app.use("/api/protected", fakeapi);
app.use("/api", tracelayerlogin);
app.use("/tracelayer", limitsetter);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Hello from TraceLayer backend 🚀");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
