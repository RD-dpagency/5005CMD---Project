import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function ReportDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sightings/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReport(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load report:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-green-600" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Report not found or failed to load.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-12 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Sighting Details</h1>

      <div className="max-w-xl w-full bg-gray-100 rounded-xl shadow-md overflow-hidden">
        <div className="relative h-64 w-full">
          {report.imageUrl ? (
            <Image
              src={report.imageUrl}
              alt="Sighting Image"
              fill
              className="object-cover"
            />
          ) : (
            <Image
              src="/placeholder.jpg"
              alt="No image available"
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-2">{report.species}</h2>
          <p className="text-gray-600 mb-2">📍 Location: {report.location}</p>
          <p className="text-gray-600 mb-2">
            🕒 Date: {(report.dateTime || report.date)
              ? new Date(report.dateTime || report.date).toLocaleString()
              : "Unknown Date"}
          </p>
          {report.notes && (
            <p className="text-gray-700 mt-4">📝 Notes: {report.notes}</p>
          )}
        </div>
      </div>
    </div>
  );
}

