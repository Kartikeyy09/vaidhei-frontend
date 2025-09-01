"use client"

import { useState } from "react"
import {
  EnvelopeIcon,
  UserIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline"

const GetQuotePage = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {!submitted ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Left Side: Info */}
          <div className="p-8 bg-slate-50 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What Your Quote Includes:
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="w-5 h-5 mr-2 text-red-500">✔</span>
                Detailed Cost Breakdown
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 mr-2 text-red-500">✔</span>
                Campaign Timeline Estimation
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 mr-2 text-red-500">✔</span>
                Access to Prime Locations
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 mr-2 text-red-500">✔</span>
                Dedicated Expert Support
              </li>
            </ul>
          </div>

          {/* Right Side: Form */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Request a Quote
            </h2>
            <p className="text-gray-600 mb-6">
              Fill your details and we'll reply within 24 hours.
            </p>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="relative">
                <UserIcon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>
              <div className="relative">
                <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>
              <div className="relative">
                <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                <textarea
                  placeholder="Your requirements..."
                  rows="3"
                  className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-red-500 outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-pink-500 text-white py-3 rounded-lg font-semibold text-lg hover:-translate-y-0.5 transition-transform duration-300"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl shadow-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5 mx-auto">
            <svg
              className="w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Quote Request Sent!
          </h2>
          <p className="text-gray-600">
            Our team will get back to you shortly. Thank you for your interest!
          </p>
        </div>
      )}
    </div>
  )
}

export default GetQuotePage
