"use client"

import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { CheckBadgeIcon, ShieldCheckIcon, GlobeAltIcon, TrophyIcon } from "@heroicons/react/24/solid"
import { services } from "../data/services" // Ensure this path is correct
import { projects } from "../data/projects" // Ensure this path is correct

// Import child components if they exist, otherwise their logic is integrated here
// For this example, we integrate their logic directly.
import HeroSection from "../components/HeroSection"
import TestimonialsSection from "../components/TestimonialsSection"
import WhyChooseSection from "../components/WhyChooseSection"

// Data for integrated sections
const whyChooseReasons = [
  { title: "Direct Tender Rights", icon: CheckBadgeIcon, description: "Eliminating middlemen for competitive pricing." },
  { title: "100% Gov. Compliance", icon: ShieldCheckIcon, description: "Ensuring hassle-free campaign execution." },
  { title: "PAN India Team", icon: GlobeAltIcon, description: "Seamless monitoring and execution nationwide." },
  { title: "15+ Years Experience", icon: TrophyIcon, description: "Deep industry understanding and expertise." },
];
const featuredServices = services.slice(0, 3);
const featuredProjects = projects.slice(0, 2);

const Home = () => {
  const navigate = useNavigate()

  // Animation Variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  }

  return (
    // --- 1. UNIFIED BACKGROUND ---
    <div className="bg-gradient-to-br from-red-50 via-white to-blue-50">
      
      <HeroSection />

      {/* --- THE VAIDEHI EDGE (Why Choose Us, Refined) --- */}
      {/* <motion.section 
        className="py-24" 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.3 }} 
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <span className="text-sm font-bold text-red-600 tracking-wider uppercase">The Vaidehi Edge</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">Why Partner With Us?</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {whyChooseReasons.map(reason => {
                    const Icon = reason.icon;
                    return (
                        <div key={reason.title} className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50 text-center transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                               <Icon className="w-8 h-8 text-red-600"/>
                            </div>
                            <h3 className="font-bold text-lg text-slate-800">{reason.title}</h3>
                            <p className="text-sm text-slate-500 mt-1">{reason.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
      </motion.section> */}
      <WhyChooseSection/>

      {/* --- OUR SOLUTIONS (Services) --- */}
      <motion.section 
        className="py-4" 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }} 
        variants={sectionVariants}
      >
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">A Spectrum of Solutions</h2>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">We offer end-to-end solutions for a diverse range of public sector projects.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                {featuredServices.map(service => (
                    <Link key={service.slug} to={`/services/${service.slug}`} className="group bg-white rounded-2xl shadow-lg overflow-hidden block transform hover:-translate-y-2 transition-all duration-300">
                        <div className="relative h-56"><img src={service.details.coverImage} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/></div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{service.title}</h3>
                            <p className="text-slate-600 text-sm line-clamp-2 mb-4">{service.description}</p>
                            <span className="inline-flex items-center text-red-600 font-semibold">Learn More <span className="ml-2 transition-transform group-hover:translate-x-1">→</span></span>
                        </div>
                    </Link>
                ))}
            </div>
             <div className="text-center bg-red-50 p-6 mt-12"><Link to="/services" className="font-semibold text-red-600 hover:text-red-800 transition">View All Services →</Link></div>
         </div>
      </motion.section>
      
      {/* --- IMPACT SHOWCASE (Projects + Integrated Testimonial) --- */}
      <motion.section 
        className="py-4" 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }} 
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Our Impact in Action</h2>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">We don't just win tenders; we deliver results that make a difference.</p>
            </div>
            <div className="space-y-10">
                {featuredProjects.map((project, index) => (
                    <div key={project.slug} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className={`group relative rounded-xl overflow-hidden ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                            <img src={project.image} alt={project.title} className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"/>
                        </div>
                        <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                            <span className="inline-block bg-red-100 text-red-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">📍 {project.location}</span>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{project.title}</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">{project.description}</p>
                            <Link to={`/projects/${project.slug}`} className="inline-flex items-center text-red-600 font-semibold group">View Case Study <span className="ml-2 transition-transform group-hover:translate-x-1">→</span></Link>
                        </div>
                    </div>
                ))}

            </div>
            {/* Integrated Testimonial */}
            
             <div className="text-center bg-red-50 p-6 rounded-2xl mt-12"><Link to="/projects" className="font-semibold text-red-600 hover:text-red-800 transition">View All Projects →</Link></div>
         
        </div>
      </motion.section>
      <TestimonialsSection/>
      
      {/* --- FINAL CTA --- */}
      <motion.section 
        className="py-24 text-center" 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.5 }} 
        variants={sectionVariants}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Ready to Start Your Next Project?</h2>
            <p className="mt-4 text-lg text-slate-600">Let's discuss how our expertise can help you achieve your goals. Our team is ready to provide a free, no-obligation consultation.</p>
            <div className="mt-8">
                <button onClick={() => navigate("/contact")} className="inline-block bg-red-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-lg">Get a Free Consultation</button>
            </div>
        </div>
      </motion.section>

    </div>
  )
}

export default Home;