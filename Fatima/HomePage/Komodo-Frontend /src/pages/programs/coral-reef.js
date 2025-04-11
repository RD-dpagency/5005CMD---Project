"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CoralReefPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6 py-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-green-600 flex items-center justify-center gap-2"
        >
          🌊 Coral Reef Restoration
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Restoring marine biodiversity through coral planting, local diver training, and coastal community collaboration.
        </motion.p>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-5xl mx-auto shadow-xl rounded-xl overflow-hidden mb-12"
      >
        <Image
          src="/coral-reef.jpg"
          alt="Coral Reef Restoration"
          width={1200}
          height={600}
          className="object-cover w-full max-h-[400px]"
        />
      </motion.div>

      {/* Description Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-4xl mx-auto text-lg space-y-6 text-gray-700 dark:text-gray-300"
      >
        <p>
          Coral reefs are vital ecosystems that support a vast array of marine life. This ongoing program aims to revitalize damaged reef areas by planting resilient coral species and reducing local stressors.
        </p>
        <p>
          Local divers are trained in coral grafting techniques, and coastal communities are engaged in reef-friendly practices. So far, we've restored{" "}
          <span className="font-bold text-green-600">500+ coral patches</span> and trained over{" "}
          <span className="font-bold text-green-600">75 community divers</span>.
        </p>

        {/* Stat Counters */}
        <div className="grid md:grid-cols-3 gap-6 text-center mt-8">
          {[
            { number: "500+", label: "Coral Patches Restored" },
            { number: "75", label: "Community Divers Trained" },
            { number: "8", label: "Active Coastal Zones" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow transition"
            >
              <h2 className="text-3xl font-bold text-green-600">{stat.number}</h2>
              <p className="text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl shadow text-center"
        >
          <p className="italic max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            “Since we started planting coral here, we’ve seen a huge return in fish populations and
            reef health. It’s not just restoration — it’s rebirth.” <br />
            <span className="mt-2 block font-semibold text-green-600">– Local Diver</span>
          </p>
        </motion.div>
      </motion.div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-16"
      >
        <Link href="/programs">
          <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
            ← Back to Programs
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
