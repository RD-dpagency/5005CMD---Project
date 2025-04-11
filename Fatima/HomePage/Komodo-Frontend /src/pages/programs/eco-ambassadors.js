"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function EcoAmbassadorsPage() {
  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6 py-16">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-green-700 mb-4"
      >
        🧑‍🎓 EcoSchool Ambassador Initiative
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg text-center max-w-2xl mx-auto mb-12"
      >
        Empowering students to lead conservation efforts through education, collaboration, and tech. 🌱
      </motion.p>

      {/* Image or Visual */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-4xl mx-auto mb-12 shadow-xl rounded-xl overflow-hidden"
      >
        <Image
          src="/eco-coming-soon.jpg" // ✅ Put this image in /public
          alt="EcoSchool Ambassador Initiative Coming Soon"
          width={1200}
          height={600}
          className="w-full object-cover h-[400px]"
        />
      </motion.div>

      {/* Coming Soon Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 max-w-3xl mx-auto p-8 rounded-xl shadow-md text-center"
      >
        <h2 className="text-3xl font-bold text-green-600 mb-2">🚧 Coming Soon!</h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          We’re crafting something amazing. This program will engage students nationwide to become
          wildlife champions. Stay tuned for its official launch!
        </p>

        {/* Optional Notify Button */}
        <div className="mt-6">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Notify Me When It Launches
          </button>
        </div>
      </motion.div>

      {/* Back Link */}
      <div className="text-center mt-12">
        <Link href="/programs">
          <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition">
            ← Back to Programs
          </button>
        </Link>
      </div>
    </div>
  );
}
