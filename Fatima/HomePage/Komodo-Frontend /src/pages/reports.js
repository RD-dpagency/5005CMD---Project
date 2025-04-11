import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2, Search, SlidersHorizontal, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SightingModal from "@/components/SightingModal";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSighting, setSelectedSighting] = useState(null);

  useEffect(() => {
    const fetchSightings = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sightings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Fetch failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("🐾 Sightings fetched:", data);
        setReports(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("❌ Error fetching reports:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSightings();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedSighting ? "hidden" : "auto";
  }, [selectedSighting]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setSelectedSighting(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 flex flex-col items-center py-16 px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-extrabold text-green-700 tracking-tight">
          Wildlife Sightings Reports
        </h1>
        <p className="text-lg text-gray-600 mt-3">
          Explore all reports submitted by the community to help monitor endangered species.
        </p>
      </div>

      <div className="flex items-center gap-2 mt-8 w-full max-w-xl">
        <div className="relative flex-grow">
          <Search className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search species or location..."
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          <SlidersHorizontal className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {loading ? (
        <Loader2 className="h-10 w-10 animate-spin text-green-600 mt-10" />
      ) : reports.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full max-w-6xl">
          {reports
            .filter((report) =>
              report.species?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              report.location?.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((report) => (
              <motion.div
                key={report._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-5 flex flex-col"
              >
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image
                    src={report.imageUrl || "/placeholder.jpg"}
                    alt="Sighting Thumbnail"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="mt-4 flex flex-col gap-1">
                  <h2 className="text-xl font-bold text-green-700">{report.species}</h2>
                  <p className="text-gray-600">📍 {report.location}</p>
                  <p className="text-sm text-gray-400">
                    🕒 {report.dateTime ? new Date(report.dateTime).toLocaleString() : "Unknown Date"}
                  </p>
                  <button
                    onClick={() => setSelectedSighting(report)}
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 font-medium transition"
                  >
                    <Eye className="h-5 w-5" /> View Details
                  </button>
                </div>
              </motion.div>
            ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-12">
          No sightings have been reported yet. Be the first to help protect wildlife 🐾
        </p>
      )}

      <AnimatePresence>
        {selectedSighting && (
          <SightingModal
            sighting={selectedSighting}
            onClose={() => setSelectedSighting(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
