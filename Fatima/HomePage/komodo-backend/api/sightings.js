import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const SightingSchema = new mongoose.Schema({
  location: String,
  dateTime: String,
  species: String,
  notes: String,
  imageUrl: String,
}, { timestamps: true });

const Sighting = mongoose.models.Sighting || mongoose.model("Sighting", SightingSchema);

async function connectDB() {
  if (mongoose.connections[0].readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const data = await Sighting.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data });
  }

  if (req.method === "POST") {
    try {
      const sighting = await Sighting.create(req.body);
      return res.status(201).json({ success: true, data: sighting });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
