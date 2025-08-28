"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { projects } from "../data/projects";

const ProjectsSection = () => {
  // --- CHANGE: Added a state to control visibility ---
  const [showAllProjects, setShowAllProjects] = useState(false)

  // const projects = [
  //   {
  //     title: "Coca-Cola LED Campaign",
  //     location: "Lucknow Junction",
  //     description: "A high-impact, large-scale LED advertising campaign featuring dynamic, eye-catching content across multiple high-traffic digital screens.",
  //     image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
  //     link: "/projects/coca-cola",
  //   },
  //   {
  //     title: "Samsung Train Wrapping",
  //     location: "Delhi-Mumbai Route",
  //     description: "Complete exterior train branding for Samsung's flagship smartphone launch, turning a high-speed train into a moving billboard.",
  //     image: "https://images.unsplash.com/photo-1583844033741-97b7b25202a0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
  //     link: "/projects/samsung",
  //   },
  //   {
  //     title: "Flipkart Platform Hoardings",
  //     location: "Bangalore City Station",
  //     description: "Strategic hoarding placements during the festive season to maximize visibility and drive sales for Flipkart's major promotional event.",
  //     image: "https://images.unsplash.com/photo-1541818290-2c51013426b3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
  //     link: "/projects/flipkart",
  //   },
  //   {
  //     title: "Tata Motors Digital Display",
  //     location: "Chennai Central",
  //     description: "Interactive digital displays showcasing Tata's latest range of commercial vehicles, engaging commuters with rich media content.",
  //     image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
  //     link: "/projects/tata-motors",
  //   },
  //   // --- ADDED MORE PROJECTS FOR THE "SHOW MORE" EFFECT ---
  //   {
  //     title: "Amazon Prime Video Train Interior",
  //     location: "Kolkata Metro",
  //     description: "Engaging commuters with vibrant interior branding, promoting new shows and exclusive content directly inside train coaches.",
  //     image: "https://images.unsplash.com/photo-1593311394437-434a9b69b32a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
  //     link: "/projects/amazon-prime",
  //   },
  //   {
  //     title: "Swiggy Food Delivery Hoardings",
  //     location: "Major Railway Crossings",
  //     description: "Targeting high-density areas with creative hoardings that capture the attention of both commuters and pedestrians.",
  //     image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
  //     link: "/projects/swiggy",
  //   },
  // ]

  // --- CHANGE: Logic to show either 4 or all projects ---
  const displayedProjects = showAllProjects ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="py-10 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Featured Case Studies
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            We partner with leading brands to create railway advertising campaigns that deliver exceptional results.
          </p>
        </div>

        {/* --- Asymmetrical Case Study Layout --- */}
        <div className="space-y-20">
          {/* --- CHANGE: Mapping over 'displayedProjects' instead of 'projects' --- */}
          {displayedProjects.map((project, index) => (
            <div
              key={index}
              // Added animation classes
              className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center transition-all duration-500 ease-in-out animate-fade-in"
            >
              {/* Image Section */}
              <div
                className={`group relative rounded-xl overflow-hidden ${
                  index % 2 === 0 ? "md:order-1" : "md:order-2"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"/>
                <img 
                  src={project.image} alt={project.title} 
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500" 
                />
              </div>

              {/* Text Content Section */}
              <div
                className={`text-center md:text-left ${
                  index % 2 === 0 ? "md:order-2" : "md:order-1"
                }`}
              >
                <span className="inline-block bg-red-100 text-red-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                  📍 {project.location}
                </span>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  {project.title}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  {project.description}
                </p>
                <Link
          // --- YEH CHANGE HAI ---
             to={`/projects/${project.slug}`}
              className="inline-flex items-center text-red-600 font-semibold hover:text-red-800 transition-colors group"
                >
         View Case Study
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              </div>
            </div>
          ))}
        </div>

        {/* --- CHANGE: View All Projects Button is now functional --- */}
        {/* It's now a <button> instead of a <Link> */}
        <div className="text-center mt-20">
          <button 
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="inline-block bg-gradient-to-r from-red-600 to-pink-500 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-lg"
          >
            {showAllProjects ? "Show Less" : "View All Projects"}
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection

// Is animation ko kaam karne ke liye, aapko tailwind.config.js mein yeh add karna hoga (agar pehle se nahi hai):
/*
module.exports = {
  // ...
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
    },
  },
  // ...
}
*/