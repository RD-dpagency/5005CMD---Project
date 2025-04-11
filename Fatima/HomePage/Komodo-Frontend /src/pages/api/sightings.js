// pages/api/sightings.js

import dbConnect from "../../utils/dbConnect";
import Sighting from "../../models/sighting";

export default async function handler(req, res) {
  //  CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  //  Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    await dbConnect();

    if (req.method === "POST") {
      const { location, dateTime, species, notes, imageUrl } = req.body;

      // Validate required fields
      if (!location || !dateTime || !species || !imageUrl) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: location, dateTime, species, or imageUrl",
        });
      }

      const sighting = await Sighting.create({
        location,
        dateTime,
        species,
        notes,
        imageUrl,
      });

      return res.status(201).json({ success: true, data: sighting });
    }

    if (req.method === "GET") {
      const sightings = await Sighting.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: sightings });
    }

    // If not GET or POST
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });

  } catch (error) {
    console.error("❌ API Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}
