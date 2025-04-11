"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function KomodoNestPage() {
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
          🦎 Komodo Nesting Site Protection
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Preserving the future of Komodo dragons through active monitoring, community
          engagement, and modern tech.
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
          src="/conservation-hero.jpg"
          alt="Komodo Nest Protection"
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
          This ongoing initiative protects Komodo dragon nesting sites by monitoring hatching zones
          and reducing human interference. Rangers and volunteers patrol key areas and use
          GPS-tagged nests to gather data for future protection strategies.
        </p>
        <p>
          We collaborate with local communities to build sustainable protection systems, educate
          nearby schools, and empower eco-volunteers. Over{" "}
          <span className="font-bold text-green-600">30+ nests</span> have been safeguarded so far
          with active community involvement.
        </p>

        {/* Stat Counters */}
        <div className="grid md:grid-cols-3 gap-6 text-center mt-8">
          {[
            { number: "🌿 30+", label: "Nesting Sites Protected" },
            { number: "📍 12", label: "Active Ranger Zones" },
            { number: "🤝 100+", label: "Community Volunteers" },
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

        {/* Timeline Milestones */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-green-600 mb-2">📆 Progress Timeline</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="text-green-700 font-semibold">2023:</span> 10 nests protected and ranger training initiated.
            </li>
            <li>
              <span className="text-green-700 font-semibold">2024:</span> Introduced community education and drone tracking.
            </li>
            <li>
              <span className="text-green-700 font-semibold">2025:</span> Expanding to new habitats and scaling volunteer efforts.
            </li>
          </ul>
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-green-50 dark:bg-green-900/20 p-6 rounded-xl shadow text-center"
        >
          <p className="italic max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            “We’ve seen a massive reduction in nest disturbance since the program launched.
            Protecting Komodo dragons begins with protecting their future.” <br />
            <span className="mt-2 block font-semibold text-green-600">– Local Park Ranger</span>
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
