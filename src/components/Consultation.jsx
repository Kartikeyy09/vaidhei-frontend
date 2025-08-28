import React, { useState } from "react"
import {
  UserIcon,
  EnvelopeIcon,
  BuildingOffice2Icon,
  ChatBubbleBottomCenterTextIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"


const Consultation = () => {
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would handle form submission here (e.g., API call)
    setSubmitted(true)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-red-50 via-white to-blue-50 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

      {/* Main Card */}
      <div className="relative z-10 max-w-5xl w-full bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* --- Left Side: Reassurance & Benefits --- */}
          <div className="p-8 sm:p-12 bg-slate-50/50 hidden lg:flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Let's Build Your Next Big Campaign
            </h2>
            <p className="text-gray-600 mb-8">
              One of our railway advertising specialists will partner with you to:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span><strong>Analyze Your Brand's Goals</strong> to create a tailored advertising strategy.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span><strong>Identify High-Impact Locations</strong> across the PAN India railway network for maximum reach.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Provide a <strong>Transparent, No-Obligation Quote</strong> with competitive pricing.</span>
              </li>
            </ul>
            <div className="mt-12 pt-8 border-t border-slate-200">
               <p className="text-sm font-semibold text-gray-500">TRUSTED BY INDIA'S LEADING BRANDS</p>
               {/* Replace with actual client logos if available */}
               <div className="flex items-center space-x-6 mt-4 opacity-50">
                  <p className="font-bold text-lg">Brand A</p>
                  <p className="font-bold text-lg">Brand B</p>
                  <p className="font-bold text-lg">Brand C</p>
               </div>
            </div>
          </div>

          {/* --- Right Side: The Form --- */}
          <div className="p-8 sm:p-12">
            {!submitted ? (
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Get Your Free Consultation
                </h1>
                <p className="text-gray-600 mb-8">
                  Fill the form and we'll connect with you shortly.
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Custom Input Fields with Icons */}
                  <div className="relative">
                    <UserIcon className="w-6 h-6 text-gray-400 absolute top-1/2 left-4 -translate-y-1/2" />
                    <input type="text" placeholder="Your Name" className="w-full border border-slate-300 rounded-lg p-4 pl-12 focus:ring-2 focus:ring-red-500 outline-none transition-all" required />
                  </div>
                  <div className="relative">
                    <EnvelopeIcon className="w-6 h-6 text-gray-400 absolute top-1/2 left-4 -translate-y-1/2" />
                    <input type="email" placeholder="Your Email" className="w-full border border-slate-300 rounded-lg p-4 pl-12 focus:ring-2 focus:ring-red-500 outline-none transition-all" required />
                  </div>
                   <div className="relative">
                    <PhoneIcon className="w-6 h-6 text-gray-400 absolute top-1/2 left-4 -translate-y-1/2" />
                    <input type="tel" placeholder="Phone Number" className="w-full border border-slate-300 rounded-lg p-4 pl-12 focus:ring-2 focus:ring-red-500 outline-none transition-all" required />
                  </div>
                  <div className="relative">
                    <BuildingOffice2Icon className="w-6 h-6 text-gray-400 absolute top-1/2 left-4 -translate-y-1/2" />
                    <input type="text" placeholder="Company / Organization" className="w-full border border-slate-300 rounded-lg p-4 pl-12 focus:ring-2 focus:ring-red-500 outline-none transition-all" />
                  </div>
                  <div className="relative">
                     <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-gray-400 absolute top-5 left-4" />
                     <textarea placeholder="Tell us about your project..." rows="4" className="w-full border border-slate-300 rounded-lg p-4 pl-12 focus:ring-2 focus:ring-red-500 outline-none transition-all" required></textarea>
                  </div>
                  
                  <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-pink-500 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    Request My Consultation
                  </button>
                </form>
              </>
            ) : (
              // --- Enhanced "Thank You" Message ---
              <div className="text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Thank You!</h2>
                <p className="text-gray-600 mb-8 max-w-sm">
                  Your request has been sent successfully. Our team will get back to you within 24 hours.
                </p>
                <p to="/" className="bg-slate-200 text-slate-800 font-semibold px-6 py-3 rounded-lg hover:bg-slate-300 transition-colors"
                onClick={() => navigate("/")}>
                    Back to Home
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Consultation