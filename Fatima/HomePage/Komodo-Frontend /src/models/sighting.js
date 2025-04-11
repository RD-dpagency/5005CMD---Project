// models/Sighting.js
import mongoose from "mongoose";

const SightingSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    dateTime: { type: Date, required: true },
    species: { type: String, required: true },
    notes: { type: String, default: "" },
    imageUrl: { type: String, default: "" }, // Optional but important
  },
  {
    timestamps: true, // Adds createdAt & updatedAt
  }
);

// Prevent model overwrite error in development (important for Next.js)
export default mongoose.models.Sighting || mongoose.model("Sighting", SightingSchema);

