"use client"

import { useEffect } from 'react'; // ✅ Import useEffect
import { useDispatch, useSelector } from 'react-redux'; // ✅ Import Redux hooks
import { Link } from "react-router-dom"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa"
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
// ✅ Import Redux actions and selectors
import { fetchManageServicesAsync, selectManageServices } from '../../features/adminSlice/ManageServices/ManageServicesSlice';


const Footer = () => {
  // ✅ Get data from Redux store
  const dispatch = useDispatch();
  const { data: services } = useSelector(selectManageServices);

  // ✅ Fetch services when the component mounts
  useEffect(() => {
    // Only fetch if the services array is empty
    if (services.length === 0) {
      dispatch(fetchManageServicesAsync());
    }
  }, [dispatch, services.length]);

  // ✅ Create a limited list of featured services (e.g., the first 5)
  const featuredServices = services.slice(0, 5);

  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      {/* Subtle background glow effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: About & Socials */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img src="/logo-removebg-preview.png" alt="Vaidehi Enterprises" className="h-12 w-auto bg-white" />
            </Link>
            <p className="text-slate-300 mb-6 text-sm leading-relaxed">
              India's trusted partner for securing and executing public sector tenders with 15+ years of excellence.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all duration-300"><FaFacebookF /></a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all duration-300"><FaTwitter /></a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all duration-300"><FaLinkedinIn /></a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all duration-300"><FaInstagram /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-slate-300 hover:text-red-400 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/services" className="text-slate-300 hover:text-red-400 transition-colors text-sm">Services</Link></li>
              <li><Link to="/projects" className="text-slate-300 hover:text-red-400 transition-colors text-sm">Projects</Link></li>
              <li><Link to="/gallery" className="text-slate-300 hover:text-red-400 transition-colors text-sm">Gallery</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-red-400 transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* ✅ Column 3: Featured Services (Dynamic) */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Featured Services</h3>
            <ul className="space-y-3">
              {featuredServices.map(service => (
                <li key={service._id}>
                  <Link 
                    to={`/services/${service.slug}`} 
                    className="text-slate-300 hover:text-red-400 transition-colors text-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              {/* ✅ Add a "View All" link if there are services */}
              {services.length > 0 && (
                <li className="pt-2">
                    <Link to="/services" className="group text-red-400 hover:text-red-300 font-semibold inline-flex items-center text-sm">
                        View All Services
                        <ArrowRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPinIcon className="w-5 h-5 text-red-400 mt-1 flex-shrink-0"/>
                <span className="text-slate-300 text-sm">123 Business District, Railway Plaza, New Delhi - 110001</span>
              </li>
              <li className="flex items-start space-x-3">
                <PhoneIcon className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0"/>
                <a href="tel:+919876543210" className="text-slate-300 hover:text-red-400 transition-colors text-sm">+91 98765 43210</a>
              </li>
               <li className="flex items-start space-x-3">
                <EnvelopeIcon className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0"/>
                <a href="mailto:info@vaidehienterprises.com" className="text-slate-300 hover:text-red-400 transition-colors text-sm">info@vaidehienterprises.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-slate-400 text-xs text-center md:text-left mb-4 md:mb-0">
              © {new Date().getFullYear()} Vaidehi Enterprises. All Rights Reserved. | <Link to="/privacy-policy" className="hover:text-red-400 transition">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;