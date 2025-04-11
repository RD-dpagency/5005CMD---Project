"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { ChartBarIcon, BookOpenIcon, GlobeAltIcon } from "@heroicons/react/outline";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Navbar - Sticky with Mobile Menu */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex items-center p-6">
        <div className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Komodo Hub Logo" width={40} height={40} className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-green-600">KOMODO HUB</h1>
        </div>

        <div className="flex justify-end flex-grow items-center space-x-6">
          <ul className="hidden md:flex space-x-6 text-gray-700">
            <li className="hover:text-green-600 cursor-pointer"><Link href="/">Home</Link></li>
            <li className="hover:text-green-600 cursor-pointer"><Link href="/programs">Programs</Link></li>
            <li className="hover:text-green-600 cursor-pointer"><Link href="/report-sighting">Report Sighting</Link></li>
            <li className="hover:text-green-600 cursor-pointer"><Link href="/digital-library">Digital Library</Link></li>
            <li className="hover:text-green-600 cursor-pointer"><Link href="/about">About</Link></li>
            <li className="hover:text-green-600 cursor-pointer"><Link href="/contact">Contact</Link></li>
            <li className="hover:text-green-600 cursor-pointer"><Link href="/reports">Reports</Link></li>
          </ul>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden px-4 py-2 bg-green-600 text-white rounded">
            {isMenuOpen ? "Close" : "Menu"}
          </button>

          <Link href="/login">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full h-[80vh] flex items-center justify-center text-center mt-16">
        <Image
          src="/hero-image.jpg"
          alt="Wildlife Conservation"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-5xl font-bold drop-shadow-lg">Explore and Discover</h1>
          <p className="text-lg mt-4 drop-shadow-md">Join us in conserving and learning about the beauty of wildlife.</p>
          <Link href="/login">
            <button className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 hover:scale-105 transition transform duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Discover Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-8">🔍 Discover Komodo Hub</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[{
            title: "22 Reports",
            desc: "Latest wildlife sightings submitted.",
            icon: <ChartBarIcon className="h-10 w-10 text-green-600 mx-auto mb-2" />, 
            link: "/reports"
          }, {
            title: "Digital Library",
            desc: "Access vast conservation resources.",
            icon: <BookOpenIcon className="h-10 w-10 text-green-600 mx-auto mb-2" />, 
            link: "/digital-library"
          }, {
            title: "Ongoing Programs",
            desc: "Join active projects to protect wildlife.",
            icon: <GlobeAltIcon className="h-10 w-10 text-green-600 mx-auto mb-2" />, 
            link: "/ongoing"
          }].map((item, index) => (
            <Link key={index} href={item.link || "#"} className="block">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105">
                {item.icon}
                <h2 className="text-xl font-bold text-green-600 dark:text-green-400">{item.title}</h2>
                <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-8">🎯 Get Involved</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[{
            title: "Report Sighting",
            desc: "Help us track and protect endangered species.",
            btn: "Report Now",
            img: "/report-sighting.jpg",
            link: "/report-sighting"
          }, {
            title: "Digital Library",
            desc: "Browse our extensive collection of wildlife research.",
            btn: "Explore Now",
            img: "/digital-library.jpg",
            link: "/digital-library"
          }, {
            title: "Programs",
            desc: "Participate in hands-on projects for conservation.",
            btn: "Learn More",
            img: "/programs.jpg",
            link: "/programs"
          }].map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105 transition transform duration-300 flex flex-col h-[500px]">
              <Image src={item.img} alt={item.title} width={400} height={250} className="w-full h-56 object-cover rounded-md mb-4" />
              <h2 className="text-xl font-bold text-green-600 dark:text-green-400">{item.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 flex-grow">{item.desc}</p>
              <Link href={item.link}>
                <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 hover:scale-110 transition transform duration-300">
                  {item.btn}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-white dark:bg-gray-800 py-8">
        <p className="text-center italic text-gray-700 dark:text-gray-300 max-w-xl mx-auto px-6">
          🌟 “Thanks to Komodo Hub, my school now actively monitors Komodo sightings!” – Local Student
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <Image src="/logo.png" alt="Komodo Hub Logo" width={30} height={30} className="mb-2" />
            <p className="font-bold text-green-600">Komodo Hub</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Links</h4>
            <ul className="space-y-1">
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Social</h4>
            <ul className="space-y-1">
              <li><Link href="#">Facebook</Link></li>
              <li><Link href="#">Twitter</Link></li>
              <li><Link href="#">Instagram</Link></li>
            </ul>
          </div>
          <div className="flex items-end justify-end">
            <Link href="#top">
              <button className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
                ↑ Back to Top
              </button>
            </Link>
          </div>
        </div>
        <p className="text-center text-sm mt-8">&copy; 2025 Komodo Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}
