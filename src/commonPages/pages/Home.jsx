// ✅ FILE: src/pages/Home.js (Updated with Redux)
"use client"

import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux"; // 1. Import Redux hooks

// 2. Import Redux actions and selectors for BOTH services and projects
import { fetchManageServicesAsync, selectManageServices } from "../../features/adminSlice/ManageServices/ManageServicesSlice"; // Adjust path
import { fetchProjectsAsync, selectManageProjects } from "../../features/adminSlice/ManageProjects/ManageProjectsSlice"; // Adjust path

// Child components
import HeroSection from "../components/HeroSection";
import TestimonialsSection from "./TestimonialsSection";
import WhyChooseSection from "../components/WhyChooseSection";

const SERVER_URL = "https://vaidhei-backend.onrender.com";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // --- 3. CONNECT TO REDUX STORE for both slices ---
  const { data: services, loading: servicesLoading, error: servicesError } = useSelector(selectManageServices);
  const { data: projects, loading: projectsLoading, error: projectsError } = useSelector(selectManageProjects);

  // --- 4. FETCH DATA on component mount ---
  useEffect(() => {
    // Fetch only if the data isn't already in the store
    if (services.length === 0) {
      dispatch(fetchManageServicesAsync());
    }
    if (projects.length === 0) {
      dispatch(fetchProjectsAsync());
    }
  }, [dispatch, services.length, projects.length]);

  // --- 5. CREATE FEATURED LISTS from Redux data ---
  const featuredServices = services.slice(0, 3);
  const featuredProjects = projects.slice(0, 2);
  
  // Animation Variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  // --- 6. HANDLE LOADING AND ERROR STATES ---
  // You can create a more sophisticated skeleton loader here if desired
  if ((servicesLoading && services.length === 0) || (projectsLoading && projects.length === 0)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-slate-700">Loading Content...</h2>
      </div>
    );
  }

  if (servicesError || projectsError) {
    return (
      <div className="flex items-center justify-center h-screen text-center text-red-600">
        <div>
            <h2 className="text-2xl font-bold">Oops! Something went wrong.</h2>
            <p>{servicesError || projectsError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-blue-50">
      <HeroSection />
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
                    // ✅ FIX: Use _id for key and construct full image URL
                    <Link key={service._id} to={`/services/${service.slug}`} className="group bg-white rounded-2xl shadow-lg overflow-hidden block transform hover:-translate-y-2 transition-all duration-300">
                        <div className="relative h-56">
                          <img src={`${SERVER_URL}${service.details.coverImage}`} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                        </div>
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
      
      {/* --- IMPACT SHOWCASE (Projects) --- */}
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
                    // ✅ FIX: Use _id for key and construct full image URL
                    <div key={project._id} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className={`group relative rounded-xl overflow-hidden ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                            <img src={`${SERVER_URL}${project.image}`} alt={project.title} className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"/>
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