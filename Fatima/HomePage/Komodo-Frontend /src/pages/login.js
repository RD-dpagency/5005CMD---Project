"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 animate-fade-in">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">Welcome to Komodo Hub</h1>
          <p className="text-sm text-gray-600 mt-2">Enter your login details below to continue</p>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium">Email</label>
            <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="you@example.com" required />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium">Password</label>
            <input type="password" id="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="••••••••" required />
          </div>

          <div className="flex items-center">
            <input id="terms" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
              I agree to the <a href="#" className="text-green-600 underline">Terms</a> and <a href="#" className="text-green-600 underline">Privacy</a>
            </label>
          </div>

          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-300">Login</button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account? <Link href="#" className="text-green-600 font-medium hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
