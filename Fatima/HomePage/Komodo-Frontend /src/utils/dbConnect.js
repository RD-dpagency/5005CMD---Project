import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

// ✅ Use global cache only in development
let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn; // ✅ Return existing connection if already connected

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  console.log("✅ MongoDB Connected Successfully");
  return cached.conn;
}

// ✅ Store cache globally in development mode only
if (process.env.NODE_ENV === "development") {
  global.mongoose = cached;
}

export default dbConnect;


