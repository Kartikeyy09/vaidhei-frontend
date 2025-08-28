"use client"

import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom" 
import { 
  XMarkIcon, 
  Bars3Icon, 
  EnvelopeIcon, 
  UserIcon, 
  ChatBubbleBottomCenterTextIcon,
  PhoneIcon,
  BuildingOffice2Icon,
  HomeIcon,
  InformationCircleIcon,
  BriefcaseIcon,
  FolderIcon,
  PhotoIcon
} from "@heroicons/react/24/outline"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isModalOpen || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen, isMenuOpen]);

  const navItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "About", path: "/about", icon: InformationCircleIcon },
    { name: "Services", path: "/services", icon: BriefcaseIcon },
    { name: "Projects", path: "/projects", icon: FolderIcon },
    { name: "Gallery", path: "/gallery", icon: PhotoIcon },
    { name: "Contact", path: "/contact", icon: PhoneIcon },
  ]

  const openModal = () => {
    setIsMenuOpen(false);
    setSubmitted(false);
    setIsModalOpen(true);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-gradient-to-br from-red-50 via-white to-blue-50">
        <div 
          className={`absolute inset-0 bg-white shadow-md transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <NavLink to="/" className="flex-shrink-0">
              <img src="/logo.png" alt="Vaidehi Enterprises" className="h-12 w-auto" />
            </NavLink>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/"} 
                  className="relative font-medium text-slate-700 hover:text-red-600 transition-colors group [&.active]:text-red-600"
                >
                  <p>{item.name}</p>
                  <span 
                    className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center group-[.active]:scale-x-100" 
                  />
                </NavLink>
              ))}
            </nav>

            <div className="hidden md:flex items-center">
              <button
                onClick={openModal}
                className="bg-gradient-to-r from-red-600 to-pink-500 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Quote
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-700">
                {isMenuOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 flex flex-col h-full">
            <nav className="flex flex-col space-y-2 mt-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center p-3 rounded-lg text-slate-700 hover:text-red-600 hover:bg-red-50 text-lg font-medium transition-all [&.active]:text-red-600 [&.active]:font-bold [&.active]:bg-red-50"
                  >
                    <Icon className="w-6 h-6 mr-4 flex-shrink-0" />
                    <span>{item.name}</span>
                  </NavLink>
                )
              })}
            </nav>
            <button
              onClick={openModal}
              className="mt-auto w-full bg-gradient-to-r from-red-600 to-pink-500 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 shadow-md"
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
              <XMarkIcon className="w-7 h-7" />
            </button>
            {!submitted ? (
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 bg-slate-50 hidden md:flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">What Your Quote Includes:</h2>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center"><svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Detailed Cost Breakdown</li>
                    <li className="flex items-center"><svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Campaign Timeline Estimation</li>
                    <li className="flex items-center"><svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Access to Prime Locations</li>
                    <li className="flex items-center"><svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Dedicated Expert Support</li>
                  </ul>
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Request a Quote</h2>
                  <p className="text-gray-600 mb-6">Fill your details and we'll reply within 24 hours.</p>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="relative">
                      <UserIcon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                      <input type="text" placeholder="Your Name" className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-red-500 outline-none" required />
                    </div>
                    <div className="relative">
                      <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                      <input type="email" placeholder="Email" className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-red-500 outline-none" required />
                    </div>
                    <div className="relative">
                      <PhoneIcon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                      <input type="tel" placeholder="Phone Number" className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-red-500 outline-none" required />
                    </div>
                     <div className="relative">
                      <BuildingOffice2Icon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                      <input type="text" placeholder="Company / Organization (Optional)" className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-red-500 outline-none" />
                    </div>
                    <div className="relative">
                      <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                      <textarea placeholder="Your requirements..." rows="3" className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-red-500 outline-none"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-pink-500 text-white py-3 rounded-lg font-semibold text-lg hover:-translate-y-0.5 transition-transform duration-300">Submit Request</button>
                  </form>
                </div>
              </div>
            ) : (
                <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
                    <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Sent!</h2>
                  <p className="text-gray-600">Our team will get back to you shortly. Thank you for your interest!</p>
                </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Header