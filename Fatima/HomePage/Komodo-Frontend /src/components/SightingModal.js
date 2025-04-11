import React from "react";

export default function SightingModal({ sighting, onClose }) {
  if (!sighting) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <img
          src={sighting.imageUrl}
          alt={sighting.species}
          className="w-full h-64 object-cover rounded-xl mb-4"
        />
        <h2 className="text-2xl font-bold text-green-700">{sighting.species}</h2>
        <p className="text-gray-600 mb-2">📍 {sighting.location}</p>
        <p className="text-gray-500 mb-2">📅 {new Date(sighting.dateTime).toLocaleString()}</p>
        <p className="text-gray-700 whitespace-pre-wrap">{sighting.notes}</p>
      </div>
    </div>
  );
}
