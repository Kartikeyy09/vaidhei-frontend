import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { 
  createInquiryAsync, 
  selectManageInquiries,
  clearSuccess 
} from "../../features/adminSlice/ManageInquiries/ManageInquiriesSlice" // Make sure this path is correct
import {
  UserIcon,
  EnvelopeIcon,
  DocumentTextIcon, // Changed from BuildingOffice2Icon
  ChatBubbleBottomCenterTextIcon,
  PhoneIcon,
  BuildingOffice2Icon,
  ChevronRightIcon
} from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const Consultation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  // Get state from Redux store
  const { loading, error, success } = useSelector(selectManageInquiries)

  // Local state for the form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "", // Changed from 'company'
    message: "",
    company: ""
    
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const inquiryData = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      phone: formData.phone,
      company: formData.company
    }
    
    dispatch(createInquiryAsync(inquiryData))
  }

  // Cleanup success/error state on component unmount
  useEffect(() => {
    return () => {
      dispatch(clearSuccess())
    }
  }, [dispatch])

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
               <div className="flex items-center space-x-6 mt-4 opacity-50">
                  <p className="font-bold text-lg">Brand A</p>
                  <p className="font-bold text-lg">Brand B</p>
                  <p className="font-bold text-lg">Brand C</p>
               </div>
            </div>
          </div>

          {/* --- Right Side: The Form --- */}
          <div className="p-8 sm:p-12">
            {!success ? (
              <>
              <div className="flex items-center text-sm text-slate-500  pb-5 md:hidden ">
                  <Link to="/" className="hover:text-red-600">Home</Link>
                  <ChevronRightIcon className="w-4 h-4 mx-1" />
                  <Link to="/consultation" className="hover:text-red-600">Consultation</Link>
                  <ChevronRightIcon className="w-4 h-4 mx-1" />
                  {/* <span className="font-medium text-slate-700">{title}</span> */}
              </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Get Your Free Consultation
                </h1>
                <p className="text-gray-600 mb-8">
                  Fill the form and we'll connect with you shortly.
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative">
                    <UserIcon className="w-6 h-6 text-gray-400 absolute top-1/2 left-4 -translate-y-1/2" />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="w-full border border-slate-300 rounded-lg p-4 pl-12 focus:ring-2 focus:ring-red-500 outline-none transition-all" required />
                  </div>
                  <div className="relative">
                    <EnvelopeIcon className="w-6 h-6 text-gray-400 absolute top-1/2 left-4 -translate-y-1/2" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" className="w-full border border-slate-300 rounded-lg p-4 pl-12 focus:ring-2 focus:ring-red-500 outline-none transition-all" required />
                  </div>
                   <div className="relative">
                    <PhoneIcon className="w-6 h-6 text-gray-400 absolute top-1/2 left-4 -translate-y-1/2" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full border border-slate-300 rounded-lg p-4 pl-12 focus:ring-2 focus:ring-red-500 outline-none transition-all" required />
                  </div>
                   <div className="relative">
                    <BuildingOffice2Icon className="w-6 h-6 text-gray-400 absolute top-1/2 left-4 -translate-y-1/2" />
                    <input type="text" placeholder="Company / Organization" name="company" value={formData.company} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-4 pl-12 focus:ring-2 focus:ring-red-500 outline-none transition-all" />
                  </div>
                  <div className="relative">
                    <DocumentTextIcon className="w-6 h-6 text-gray-400 absolute top-1/2 left-4 -translate-y-1/2" />
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject of Inquiry" className="w-full border border-slate-300 rounded-lg p-4 pl-12 focus:ring-2 focus:ring-red-500 outline-none transition-all" required/>
                  </div>
                  <div className="relative">
                     <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-gray-400 absolute top-5 left-4" />
                     <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." rows="4" className="w-full border border-slate-300 rounded-lg p-4 pl-12 focus:ring-2 focus:ring-red-500 outline-none transition-all" required></textarea>
                  </div>
                  
                  <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-red-600 to-pink-500 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? "Sending..." : "Request My Consultation"}
                  </button>

                  {error && <p className="text-sm text-red-600 text-center mt-2">{error}</p>}
                </form>
              </>
            ) : (
              <div className="text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Thank You!</h2>
                <p className="text-gray-600 mb-8 max-w-sm">
                  {success}
                </p>
                <button onClick={() => navigate("/")} className="bg-slate-200 text-slate-800 font-semibold px-6 py-3 rounded-lg hover:bg-slate-300 transition-colors">
                    Back to Home
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Consultation