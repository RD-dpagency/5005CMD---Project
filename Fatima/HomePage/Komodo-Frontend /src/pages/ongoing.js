"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProgramsPage() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Hero Section with Background Image */}
      <section
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/conservation-hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold drop-shadow-lg"
          >
            🐾 Conservation Programs
          </motion.h1>
          <p className="mt-4 text-lg md:text-xl drop-shadow-sm max-w-2xl mx-auto">
            Discover ongoing and upcoming initiatives dedicated to preserving Indonesia's biodiversity and empowering communities.
          </p>
          <Link href="#explore">
            <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition">
              Explore Programs
            </button>
          </Link>
        </div>
      </section>

      {/* Programs Grid */}
      <section id="explore" className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-green-600 mb-10 text-center">Programs at a Glance</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              title: "🦎 Komodo Nesting Site Protection",
              status: "Ongoing",
              desc: "Guarding Komodo dragon nests in remote islands to ensure safe hatching zones.",
              link: "/programs/komodo-nest"
            },
            {
              title: "🌊 Coral Reef Restoration",
              status: "Ongoing",
              desc: "Planting coral with local divers to protect marine biodiversity.",
              link: "/programs/coral-reef"
            },
            {
              title: "📚 EcoSchool Ambassadors",
              status: "Upcoming",
              desc: "Training school students to be future eco-leaders in their communities.",
              link: "/programs/ecoschool"
            },
            {
              title: "📡 Community Data Patrols",
              status: "Ongoing",
              desc: "Equipping local rangers with digital tools for wildlife tracking.",
              link: "/programs/data-patrols"
            }
          ].map((program, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <div className="mb-4">
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    program.status === "Ongoing"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {program.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-green-600 mb-2">{program.title}</h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">{program.desc}</p>
              <Link href={program.link}>
                <button className="text-sm font-semibold text-green-600 hover:underline">
                  Learn More →
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-green-600 text-white">
        <h2 className="text-3xl font-bold mb-4">Want to Get Involved?</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Join our efforts to conserve nature, empower communities, and make a real difference today.
        </p>
        <Link href="/report-sighting">
          <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
            🦎 Report a Sighting
          </button>
        </Link>
      </section>
    </div>
  );
}
