"use client";

import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CloudUploadIcon, CheckCircleIcon } from "@heroicons/react/solid";

export default function ReportSighting() {
  const [formData, setFormData] = useState({
    location: "",
    dateTime: new Date(),
    species: "",
    notes: "",
    image: null,
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prevData) => ({ ...prevData, image: file }));

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", "komodo_unsigned");
    formDataUpload.append("folder", "komodo_sightings");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dpv6gim8a/image/upload", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await res.json();
      setFormData((prevData) => ({ ...prevData, imageUrl: data.secure_url }));
      console.log("🌤️ Uploaded image URL:", data.secure_url);
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      setError("Failed to upload image. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.location || !formData.dateTime || !formData.species || !formData.imageUrl) {
      setError("Please fill in all required fields and upload an image.");
      return;
    }

    setLoading(true);

    console.log("📤 Submitting report with data:", {
      species: formData.species,
      location: formData.location,
      dateTime: formData.dateTime.toISOString(),
      notes: formData.notes,
      imageUrl: formData.imageUrl,
    });

    try {
        const response = await fetch("http://localhost:8080/sightings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            species: formData.species,
            location: formData.location,
            dateTime: formData.dateTime.toISOString(),
            notes: formData.notes,
            imageUrl: formData.imageUrl, // 🔥 this must not be empty
          }),
        });
      
      

      if (!response.ok) {
        throw new Error("Failed to submit sighting");
      }

      const data = await response.json();
      console.log("✅ Sighting submitted:", data);
      setSubmissionSuccess(true);
      setFormData({
        location: "",
        dateTime: new Date(),
        species: "",
        notes: "",
        image: null,
        imageUrl: "",
      });
    } catch (error) {
      console.error("❌ Error submitting sighting:", error);
      setError("Failed to submit sighting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <div className="w-full h-64 relative flex items-center px-8">
        <Image 
          src="/report-sighting-banner.jpg"
          alt="Wildlife Sighting"
          fill
          className="rounded-lg object-cover"
        />
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <Image src="/logo.png" alt="Komodo Hub Logo" width={40} height={40} />
          <h1 className="text-2xl font-bold text-white bg-green-700/80 backdrop-blur px-3 py-1 rounded-lg shadow-lg">KOMODO HUB</h1>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-green-600 mt-8 animate-fadeIn">Report a Wildlife Sighting</h1>
      <p className="text-lg text-gray-600 mt-2">Help us track and protect endangered species by reporting sightings!</p>

      <div className="mt-6 relative w-44 h-56">
        <Image 
          src="/komodo-dragon.jpg"
          alt="Komodo Dragon"
          width={150}
          height={150}
          className="rounded-full border-4 border-green-600 shadow-lg hover:scale-105 transition-transform"
        />
      </div>

      <form className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-6 w-full max-w-lg mt-6" onSubmit={handleSubmit}>
        <label className="block text-gray-700 font-semibold">📍 Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:border-green-500 focus:ring focus:ring-green-100 transition mb-4"
          required
        />

        <label className="block text-gray-700 font-semibold">📅 Date & Time</label>
        <DatePicker
          selected={formData.dateTime}
          onChange={(date) => setFormData((prevData) => ({ ...prevData, dateTime: date }))}
          showTimeSelect
          dateFormat="Pp"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:border-green-500 focus:ring focus:ring-green-100 transition mb-4"
          required
        />

        <label className="block text-gray-700 font-semibold">🦎 Species Observed</label>
        <input
          type="text"
          name="species"
          value={formData.species}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:border-green-500 focus:ring focus:ring-green-100 transition mb-4"
          required
        />

        <label htmlFor="fileUpload" className="flex items-center gap-2 cursor-pointer p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition mb-4 text-green-700 font-medium">
          <CloudUploadIcon className="h-5 w-5" />
          📸 Upload Image
        </label>
        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {formData.imageUrl && (
          <div className="mb-4">
            <Image
              src={formData.imageUrl}
              alt="Preview"
              width={300}
              height={200}
              className="rounded-lg shadow"
            />
          </div>
        )}

        <label className="block text-gray-700 font-semibold">📝 Additional Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:border-green-500 focus:ring focus:ring-green-100 transition mb-4"
          rows="4"
        ></textarea>

        {error && <p className="text-red-500 text-sm">⚠️ {error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition active:scale-95 flex items-center justify-center"
          disabled={loading || !formData.imageUrl}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            "Submit Report"
          )}
        </button>
      </form>

      {submissionSuccess && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-slideUp">
            <CheckCircleIcon className="h-10 w-10 text-green-600 mx-auto" />
            <h2 className="text-2xl font-bold text-green-600">✅ Report Submitted!</h2>
            <p className="text-gray-700 mt-2">Thank you for helping protect wildlife.</p>
            <button onClick={() => setSubmissionSuccess(false)} className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
