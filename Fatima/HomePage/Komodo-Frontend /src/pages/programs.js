"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProgramsPage() {
  const router = useRouter();

  // TEMP: Allow page to load by default (remove redirect)
  const isAuthenticated = true;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-black px-6 py-16 text-gray-800 dark:text-gray-100">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center text-green-700 mb-6"
      >
        Our Conservation Programs
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-xl text-center max-w-3xl mx-auto mb-12"
      >
        Dive into the heart of conservation. Explore ongoing missions, discover upcoming initiatives,
        and see how communities and tech are uniting to protect Indonesia's incredible wildlife.
      </motion.p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Ongoing Programs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-2xl font-bold text-green-600 mb-3">🟢 Ongoing Programs</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            These are our current boots-on-the-ground efforts — live, active, and in motion.
          </p>
          <ul className="list-disc list-inside text-sm space-y-2">
            <li>
              <Link href="/programs/komodo-nest" className="text-green-600 hover:underline">
                Komodo Nesting Site Protection Program
              </Link>
            </li>
            <li>
              <Link href="/programs/coral-reef" className="text-green-600 hover:underline">
                Coral Reef Restoration – East Nusa Tenggara
              </Link>
            </li>
            <li>
              <Link href="/programs/eco-ambassadors" className="text-green-600 hover:underline">
                EcoSchool Wildlife Ambassador Initiative
              </Link>
            </li>
          </ul>
          <Link href="/programs/ongoing">
            <button className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              View All Active Programs
            </button>
          </Link>
        </motion.div>

        {/* Upcoming Programs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-3">🔮 Upcoming Programs</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            We’re always evolving. Here’s a sneak peek at the next wave of conservation missions.
          </p>
          <ul className="list-disc list-inside text-sm space-y-2">
            <li>Wildlife Documentary Internship Program</li>
            <li>Green Youth Hackathon 2025</li>
            <li>Tech for Rangers Innovation Series</li>
          </ul>
        </motion.div>

        {/* Past Programs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-3">📜 Past Programs</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            These efforts paved the way for Komodo Hub. See where we’ve been to understand where we’re going.
          </p>
          <ul className="list-disc list-inside text-sm space-y-2">
            <li>Forest Watch Pilot 2023</li>
            <li>Digital Tracking with Local Villages</li>
            <li>Junior Conservation Camp</li>
          </ul>
        </motion.div>

        {/* Quiz Game */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-2xl font-bold text-purple-600 mb-3">🎮 Quiz Game</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Test your knowledge of wildlife conservation with this fun, interactive quiz game. Challenge yourself and see how much you know!
          </p>
          <Link href="https://quiz-game-six-chi.vercel.app">
            <button className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Play the Quiz Game
            </button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center mt-16"
      >
        <Link href="/report-sighting">
          <button className="px-7 py-4 bg-green-600 text-white text-lg font-bold rounded-xl hover:bg-green-700 shadow-md">
            Join the Mission — Report a Sighting
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
