"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram } from "lucide-react";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/meoazbyq", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        toast.success("Message sent successfully!", { duration: 4000 });
        form.reset();
      } else {
        toast.error("Something went wrong. Try again later.");
      }
    } catch (err) {
      toast.error("Error submitting form.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/contact-bg.jpg')",
          filter: "brightness(0.6)",
        }}
      ></div>

      {/* Content Overlay */}
      <div className="relative z-10 px-4 sm:px-6 md:px-10 py-10 text-gray-800 dark:text-gray-100">
        <Link href="/">
          <button className="mb-10 px-5 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-lg">
            ← Back to Home
          </button>
        </Link>

        <h1 className="text-5xl font-extrabold text-green-200 mb-4">Get in Touch</h1>
        <p className="text-xl mb-12 max-w-3xl leading-relaxed text-white">
          Whether you have a question, feedback, or just want to say hi — we’d love to hear from you. Our team is here to support you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-8 text-lg bg-white/90 dark:bg-gray-800/90 p-8 rounded-2xl shadow-md backdrop-blur-md">
            <div className="flex items-start gap-4">
              <MapPin className="text-green-600 mt-1 w-6 h-6" />
              <div>
                <h2 className="text-2xl font-semibold text-green-600 mb-1">Location</h2>
                <p>Coventry University,<br />Priory Street,<br />Coventry, CV1 5FB</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-green-600 mt-1 w-6 h-6" />
              <div>
                <h2 className="text-2xl font-semibold text-green-600 mb-1">Email</h2>
                <a href="mailto:mohamm170@coventry.ac.uk" className="text-green-600 hover:underline">
                  mohamm170@coventry.ac.uk
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-green-600 mt-1 w-6 h-6" />
              <div>
                <h2 className="text-2xl font-semibold text-green-600 mb-1">Phone</h2>
                <p>+44 07546 086528</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-green-600 mt-1 w-6 h-6">
                <span className="sr-only">Social</span> 🌐
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-green-600 mb-3">Follow Us</h2>
                <div className="flex gap-4 text-green-600 text-xl">
                  <a href="#" className="hover:text-green-700 transition-transform hover:scale-110" aria-label="Facebook"><Facebook /></a>
                  <a href="#" className="hover:text-green-700 transition-transform hover:scale-110" aria-label="Twitter"><Twitter /></a>
                  <a href="#" className="hover:text-green-700 transition-transform hover:scale-110" aria-label="Instagram"><Instagram /></a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-2xl shadow-2xl space-y-6 backdrop-blur-md"
          >
            <div>
              <label htmlFor="name" className="block text-lg font-semibold mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-900"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-semibold mb-2">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-900"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-lg font-semibold mb-2">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Write your message here"
                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-900"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-green-600 text-white text-lg font-bold rounded-xl hover:bg-green-700 transition duration-300 shadow-md disabled:opacity-50"
            >
              {submitting ? <span className="animate-pulse">Sending...</span> : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


