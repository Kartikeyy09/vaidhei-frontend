"use client"

// --- YEH CHANGE HAI: useNavigate ko wapas import karein ---
import { useNavigate } from "react-router-dom"
import {
  ClipboardDocumentCheckIcon, ShieldCheckIcon, GlobeAltIcon,
  TagIcon, ClockIcon, TrophyIcon,
} from "@heroicons/react/24/outline"

const WhyChooseSection = () => {
  // --- YEH CHANGE HAI: useNavigate ko wapas use karein ---
  const navigate = useNavigate()

  const reasons = [
    { title: "Direct Tender Rights Holder", description: "We hold direct tender rights, eliminating middlemen and ensuring competitive pricing for our clients.", icon: ClipboardDocumentCheckIcon },
    { title: "100% Railway Rules Compliance", description: "Complete adherence to railway advertising guidelines and regulations for hassle-free campaigns.", icon: ShieldCheckIcon },
    { title: "PAN India Execution Team", description: "Dedicated teams across major cities ensuring seamless execution and monitoring nationwide.", icon: GlobeAltIcon },
    { title: "Affordable Packages for Brands", description: "Cost-effective advertising solutions tailored to fit budgets of all sizes without compromising quality.", icon: TagIcon },
    { title: "24×7 Monitoring & Maintenance", description: "Round-the-clock monitoring and maintenance to ensure optimal campaign performance and uptime.", icon: ClockIcon },
    { title: "15+ Years of Experience", description: "Extensive experience in railway advertising with deep understanding of the industry dynamics.", icon: TrophyIcon },
  ]

  return (
    <section className="py-24 relative bg-slate-50 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Why Choose Vaidehi Enterprises?</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">We stand out as India's most trusted partner with unmatched expertise and comprehensive service offerings.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <div key={index} className="relative group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
                <div className="p-8">
                  <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-blue-100 group-hover:bg-gradient-to-br group-hover:from-red-500 group-hover:to-pink-500 transition-all duration-300 ease-in-out">
                    <Icon className="w-8 h-8 text-red-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-pink-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"/>
              </div>
            )
          })}
        </div>

        <div className="mt-24 bg-gradient-to-r from-red-600 to-pink-500 text-white p-12 rounded-3xl text-center shadow-xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Campaign?</h3>
          <p className="text-lg md:text-xl mb-8 opacity-90">Join 500+ satisfied clients who trust us.</p>
          
          {/* --- YEH CHANGE HAI: onClick ab wapas navigate karega --- */}
          <button
            onClick={() => navigate("/consultation")}
            className="bg-white text-red-600 font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
          >
            Get Free Consultation
          </button>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseSection