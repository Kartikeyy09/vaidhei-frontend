"use client"

import { Link } from "react-router-dom"
// --- YEH CHANGE HAI: Framer Motion ko hata diya gaya hai ---
// import { motion } from "framer-motion" 
import { services } from "../data/services"

const ServicesSection = () => {
  // --- YEH CHANGE HAI: Animation variants ki ab zaroorat nahi ---
  // const containerVariants = { ... }
  // const cardVariants = { ... }

  return (
    <section id="services" className="py-10 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Our Spectrum of Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            From high-impact digital campaigns to nationwide train branding, we provide end-to-end solutions for the public sector.
          </p>
        </div>

        {/* --- YEH CHANGE HAI: motion.div ko simple div se replace kiya gaya hai --- */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              // --- YEH CHANGE HAI: motion.div ko simple div se replace kiya gaya hai ---
              <div key={index}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden block h-full flex flex-col
                             transform hover:-translate-y-2 ring-1 ring-transparent hover:ring-red-500
                             transition-all duration-300 ease-in-out"
                >
                  {/* Image Section */}
                  <div className="relative h-56">
                    <img 
                      src={service.details.coverImage} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* <div className="absolute top-4 right-4 w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-md">
                       <Icon className="w-8 h-8 text-white" />
                    </div> */}
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-800 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed line-clamp-3 flex-grow">
                      {service.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-slate-200/50">
                        <span className="inline-flex items-center text-red-600 font-semibold">
                            Learn More
                            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </span>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default ServicesSection