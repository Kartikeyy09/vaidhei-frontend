"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { 
  createInquiryAsync, 
  selectManageInquiries,
  clearSuccess 
} from "../../features/adminSlice/ManageInquiries/ManageInquiriesSlice" // Make sure this path is correct
import { Link } from "react-router-dom"
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  ChatBubbleBottomCenterTextIcon,
  MapPinIcon,
  ClockIcon,
  DocumentTextIcon, // Icon for the new subject field
BuildingOffice2Icon,
ChevronRightIcon
} from "@heroicons/react/24/outline"

const ContactSection = () => {
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector(selectManageInquiries)

  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    subject: "", // New state for subject
    message: "" ,
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
      message: formData.message,
      phone: formData.phone,
      subject: formData.subject, // Get subject from form state
      company: formData.company
    };
    
    dispatch(createInquiryAsync(inquiryData))
  }
  
  useEffect(() => {
    return () => {
      dispatch(clearSuccess())
    }
  }, [dispatch])

  return (
    <section id="contact" className="py-5 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex items-center text-sm text-slate-500 px-2  pb-5 md:hidden ">
                   <Link to="/" className="hover:text-red-600">Home</Link>
                  <ChevronRightIcon className="w-4 h-4 mx-1" />
                  <Link to="/contact" className="hover:text-red-600">Contact</Link>
                  <ChevronRightIcon className="w-4 h-4 mx-1" />
               {/* <span className="font-medium text-slate-700">{project.title}</span> */}
              </div>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Let's Start a Conversation</h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Ready to amplify your brand's reach? Fill out the form or use the contact details below to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg border border-slate-200/50">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">Send us a Message</h3>
                <p className="text-slate-500 mb-6">We'll respond within 2 business hours.</p>

                <div className="relative">
                  <UserIcon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
                <div className="relative">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
                <div className="relative">
                  <PhoneIcon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
                <div className="relative">
                  <BuildingOffice2Icon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                  <input type="text" placeholder="Company / Organization" name="company" value={formData.company} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-red-500 outline-none " />
                </div>
                {/* New Input Field for Subject */}
                <div className="relative">
                  <DocumentTextIcon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
                <div className="relative">
                  <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Describe your message..." rows="4" required className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-red-500 outline-none"></textarea>
                </div>
                
                <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-red-600 to-pink-500 text-white py-3.5 rounded-lg font-semibold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? "Sending..." : "Send Inquiry"}
                </button>

                {error && <p className="text-sm text-red-600 text-center mt-2">{error}</p>}

              </form>
            ) : (
              <div className="text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Thank You!</h2>
                <p className="text-gray-600 max-w-sm">{success}</p>
              </div>
            )}
          </div>
          
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-900">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                  <MapPinIcon className="w-6 h-6"/>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-slate-900">Our Office</h4>
                  <p className="text-slate-600">123 Business District, Railway Plaza<br/>New Delhi - 110001, India</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                  <PhoneIcon className="w-6 h-6"/>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-slate-900">Phone</h4>
                  <a href="tel:+919876543210" className="text-slate-600 hover:text-red-600 transition-colors">+91 98765 43210</a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                  <EnvelopeIcon className="w-6 h-6"/>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-slate-900">Email</h4>
                  <a href="mailto:info@yaidehienterprises.com" className="text-slate-600 hover:text-red-600 transition-colors">info@yaidehienterprises.com</a>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200/50">
              <div className="flex items-center mb-4">
                 <ClockIcon className="w-6 h-6 text-red-600 mr-3"/>
                 <h4 className="font-semibold text-slate-900 text-lg">Business Hours</h4>
              </div>
              <div className="space-y-2 text-slate-600 border-t pt-4">
                <div className="flex justify-between"><span>Monday - Friday:</span> <span className="font-medium">9:00 AM - 6:00 PM</span></div>
                <div className="flex justify-between"><span>Saturday:</span> <span className="font-medium">9:00 AM - 2:00 PM</span></div>
                <div className="flex justify-between"><span>Sunday:</span> <span className="font-medium text-slate-400">Closed</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">Visit Our Office</h3>
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200/50">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.990470591539!2d77.2177332752933!3d28.63004387566589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d015%3A0xf6bee375962e240!2sConnaught%20Place!5e0!3m2!1sen!2sin!4v1691500000000!5m2!1sen!2sin" 
                    width="100%" 
                    height="450" 
                    style={{ border: 0 }}
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection