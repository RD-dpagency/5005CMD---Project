"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/about-hero-komodo.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">About Komodo Hub</h1>
          <p className="mt-4 text-lg md:text-xl drop-shadow-sm">
            Empowering communities through conservation and education.
          </p>
        </div>
      </div>

      {/* About & Video */}
      <section className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-green-600 mb-4">What is Komodo Hub?</h2>
          <p className="text-lg">
            Komodo Hub is a digital platform dedicated to wildlife conservation, education,
            and community engagement in Indonesia. Our mission is to protect endangered
            species by fostering collaboration among local communities, schools, and
            conservation organizations.
          </p>
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/vVek2l9IH_o"
            title="Komodo Hub Conservation Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white dark:bg-gray-800 py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-600 mb-2">🌍 Our Mission</h2>
          <p className="text-lg max-w-3xl mx-auto">
            We aim to create a national standard conservation tool that offers:
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { icon: "📚", title: "Education", desc: "Deliver environmental education to schools and communities." },
            { icon: "🥎", title: "Species Protection", desc: "Support endangered species monitoring." },
            { icon: "🤝", title: "Community", desc: "Foster collaboration among stakeholders." },
            { icon: "📍", title: "Reporting", desc: "Provide a platform to report real-time wildlife sightings." },
          ].map((item, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-green-600 mb-2">👥 Meet the Team
        </h2>
        <p className="mb-8 text-lg max-w-2xl">
          Komodo Hub is proudly developed by a passionate team of conservationists and technologists.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left – Team List */}
          <div>
            <ul className="space-y-4 text-lg">
              {[
                "Fatima Mohammed",
                "Parsa Nanavazadeh",
                "Rahman Diallo",
                "Jhivan Tayar",
                "Bawr Shuker",
                "Isaac Oladipo",
              ].map((name, i) => (
                <li key={i}>
                  <span className="text-green-600 font-semibold">• {name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right – Visual Showcase */}
          <div>
            <h3 className="text-xl font-bold text-green-600 mb-4">Wildlife & Nature in Focus</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { src: "/komodo-dragons.jpg", alt: "Komodo Dragons" },
                { src: "/coral-reef.jpg", alt: "Coral Reef" },
                { src: "/bamboo-forest.jpg", alt: "Bamboo Forest" },
                { src: "/sustainability-education.jpg", alt: "Children Learning Sustainability" },
              ].map((image, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={500}
                    height={300}
                    className="w-full h-40 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 bg-green-600 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
        <p className="mb-6">
          Report your wildlife sightings and help conserve Komodo species.
        </p>
        <Link href="/report-sighting">
          <button className="bg-white text-green-600 px-6 py-3 rounded-xl text-lg font-semibold hover:scale-105 transition">
            🥎 Report a Sighting
          </button>
        </Link>
      </section>
    </div>
  );
}
