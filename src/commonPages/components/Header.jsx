"use client"

import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom" 
import { useDispatch, useSelector } from "react-redux" // Redux hooks
import { 
  createInquiryAsync, 
  selectManageInquiries,
  clearSuccess 
} from "../../features/adminSlice/ManageInquiries/ManageInquiriesSlice" // Make sure this path is correct
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
  PhotoIcon,
  DocumentTextIcon

} from "@heroicons/react/24/outline"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Redux state integration
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector(selectManageInquiries)

  // Local state for the modal form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  })

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
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
    { name: "Tenders", path: "/tenders", icon: DocumentTextIcon },
    { name: "Gallery", path: "/gallery", icon: PhotoIcon },
    { name: "Contact", path: "/contact", icon: PhoneIcon },
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const openModal = () => {
    setIsMenuOpen(false);
    // Reset form and Redux state every time modal opens
    setFormData({ name: "", email: "", phone: "", company: "", message: "" , subject: "" });
    dispatch(clearSuccess());
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(clearSuccess()); // Clear success/error state on close
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const inquiryData = {
      ...formData,
       // Add a default subject
    };
    dispatch(createInquiryAsync(inquiryData));
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
      
      {/* Mobile Menu */}
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

      {/* "Get Quote" Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
              <XMarkIcon className="w-7 h-7" />
            </button>
            {!success ? (
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
                      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-red-500 outline-none" required />
                    </div>
                    <div className="relative">
                      <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-red-500 outline-none" required />
                    </div>
                    <div className="relative">
                      <PhoneIcon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-red-500 outline-none" required />
                    </div>
                     <div className="relative">
                      <BuildingOffice2Icon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                      <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company / Organization (Optional)" className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-red-500 outline-none" />
                    </div>
                     <div className="relative">
                        <DocumentTextIcon className="w-5 h-5 text-gray-400 absolute top-1/2 left-4 -translate-y-1/2" />
                        <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject of Inquiry" className="w-full border border-slate-300 rounded-lg p-4 pl-12 focus:ring-2 focus:ring-red-500 outline-none " required/>
                      </div>
                    <div className="relative">
                      <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                      <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your requirements..." rows="3" className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-red-500 outline-none"></textarea>
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-red-600 to-pink-500 text-white py-3 rounded-lg font-semibold text-lg hover:-translate-y-0.5 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                      {loading ? "Submitting..." : "Submit Request"}
                    </button>
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                  </form>
                </div>
              </div>
            ) : (
                <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
                    <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Sent!</h2>
                  <p className="text-gray-600">{success}</p>
                </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Header