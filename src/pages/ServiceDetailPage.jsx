"use client"

import { useParams, Link } from "react-router-dom"
import { services } from "../data/services" // Apne data ko import karein
import { CheckCircleIcon } from "@heroicons/react/24/solid"

const ServiceDetailPage = () => {
  const { slug } = useParams() // URL se 'slug' ko nikaalein
  const service = services.find((s) => s.slug === slug) // Sahi service ko dhoondein

  if (!service) {
    return (
      <div className="text-center py-24">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <p className="text-lg text-slate-600 mb-8">The service you are looking for does not exist.</p>
        <Link to="/services" className="text-red-600 font-semibold">
          ← Back to All Services
        </Link>
      </div>
    )
  }

  const { title, details } = service;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-slate-800">
        <img src={details.coverImage} alt={title} className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <span className="bg-red-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Our Services
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold">{title}</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Overview */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Service Overview</h2>
            <p className="text-lg text-slate-600 leading-relaxed">{details.overview}</p>
          </div>
          {/* Right: Key Features & Best For */}
          <div className="space-y-8">
            <div className="bg-slate-50 p-6 rounded-xl border">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Key Features</h3>
              <ul className="space-y-3">
                {details.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
             <div className="bg-red-50 p-6 rounded-xl border border-red-200">
              <h3 className="text-xl font-bold text-black mb-2">Best For</h3>
              <p className="text-slate-900">{details.bestFor}</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16 pt-12 border-t">
            <Link to="/services" className="inline-block bg-slate-100 text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors">
                ← Back to Services
            </Link>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetailPage