require("dotenv").config(); // MUST be at the top

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Final CORS setup (allow local + Vercel)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
  "http://localhost:3004",
  "http://localhost:3005",
  "http://localhost:3006",
  "http://localhost:3007",
  "http://localhost:3008",
  "https://komodo-frontend.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ Handle preflight (OPTIONS) requests
app.options("*", cors()); // <-- THIS is the fix for preflight issues

app.use(express.json());

// MongoDB connection
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing in .env");
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Schema
const sightingSchema = new mongoose.Schema({
  species: { type: String, required: true },
  location: { type: String, required: true },
  dateTime: { type: Date, required: true },
  notes: String,
  imageUrl: String,
}, { timestamps: true });

const Sighting = mongoose.model("Sighting", sightingSchema);

// Routes
app.get("/sightings", async (req, res) => {
  try {
    const sightings = await Sighting.find().sort({ createdAt: -1 });
    res.setHeader("Access-Control-Allow-Origin", "*"); // fallback CORS header
    res.json(sightings);
  } catch (err) {
    res.status(500).json({ error: "Error fetching sightings" });
  }
});

app.post("/sightings", async (req, res) => {
  const { species, location, dateTime } = req.body;

  if (!species || !location || !dateTime) {
    return res.status(400).json({
      error: "Missing required fields: species, location, or dateTime"
    });
  }

  try {
    const newSighting = new Sighting(req.body);
    await newSighting.save();
    res.status(201).json({ message: "✅ Sighting added!", data: newSighting });
  } catch (err) {
    res.status(400).json({ error: "Error saving sighting" });
  }
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
