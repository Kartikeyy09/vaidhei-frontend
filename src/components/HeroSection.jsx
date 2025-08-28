"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UsersIcon, MapIcon, SparklesIcon } from "@heroicons/react/24/solid"
import Lottie from "lottie-react"
import railwayAnimation from "../data/railwayAnimation.json" // Make sure this path is correct

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const navigate = useNavigate()

  useEffect(() => {
    const textTimer = setTimeout(() => setIsVisible(true), 100)
    
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearTimeout(textTimer)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Parallax calculations
  const parallax = (multiplier) => {
    if (typeof window !== "undefined") {
      const x = (mousePosition.x / window.innerWidth - 0.5) * multiplier * -1
      const y = (mousePosition.y / window.innerHeight - 0.5) * multiplier * -1
      return { transform: `translate(${x}px, ${y}px)` }
    }
    return {}
  }

  return (
    <>
      <section id="home" className="relative p-4  bg-gradient-to-br from-red-50 via-white to-blue-50 flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
            
            {/* --- LEFT SIDE: Content --- */}
            <div className="text-center lg:text-left z-20">
              <div className="max-w-xl mx-auto lg:mx-0">
                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                  <span className={`block transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    Transforming India's Infrastructure,
                  </span>
                  <span className={`block bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent mt-2 transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    One Tender at a Time.
                  </span>
                </h1>

                <p className={`mt-6 text-lg text-slate-600 leading-relaxed transition-all duration-700 ease-out delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                  Your trusted partner for navigating and executing complex public sector projects, from Indian Railways to Nagar Palikas.
                </p>

                 <div className={`mt-8 flex justify-center lg:justify-start items-center space-x-6 sm:space-x-8 transition-all duration-700 ease-out delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <div className="text-left">
                      <div className="text-4xl font-bold text-slate-800">15+</div>
                      <div className="text-sm text-slate-500 tracking-wide">Years Experience</div>
                    </div>
                    <div className="h-12 w-px bg-slate-200"></div>
                    <div className="text-left">
                      <div className="text-4xl font-bold text-slate-800">500+</div>
                      <div className="text-sm text-slate-500 tracking-wide">Projects Delivered</div>
                    </div>
                  </div>

                <div className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 ease-out delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                  <button
                    onClick={() => navigate("/contact")}
                    className="inline-flex items-center justify-center bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    Start Your Project
                  </button>
                  <button
                    onClick={() => navigate("/projects")}
                    className="inline-flex items-center justify-center bg-white text-slate-700 px-8 py-4 rounded-full text-lg font-semibold shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200"
                  >
                    Explore Our Work
                  </button>
                </div>
              </div>
            </div>
            
            {/* --- RIGHT SIDE: The Integrated Visual Core --- */}
            <div className="relative h-full hidden lg:block">
              <div 
                className="absolute inset-0 transition-transform duration-500 ease-out"
                style={parallax(40)}
              >
                {/* Layer 1: The Lottie Animation "Core" */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-80">
                  <Lottie 
                    animationData={railwayAnimation} 
                    loop={true} 
                  />
                </div>

                {/* Layer 2: Floating "Satellite" Cards */}
                <div className="absolute top-20 left-0 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-4 flex items-center z-20">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <SparklesIcon className="w-6 h-6 text-red-500"/>
                    </div>
                    <div>
                    <div className="font-bold text-slate-800">15+ Years</div>
                    <div className="text-sm text-slate-500">of Expertise</div>
                    </div>
                </div>
                <div className="absolute bottom-20 right-0 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-4 flex items-center z-20">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <MapIcon className="w-6 h-6 text-blue-500"/>
                    </div>
                    <div>
                    <div className="font-bold text-slate-800">PAN India</div>
                    <div className="text-sm text-slate-500">Coverage</div>
                    </div>
                </div>

                {/* Layer 3: Decorative Dots */}
                <div className="absolute top-20 right-10 w-4 h-4 bg-blue-300 rounded-full"/>
                <div className="absolute bottom-20 left-10 w-3 h-3 bg-red-300 rounded-full"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- "Trusted By" Logo Bar --- */}
      {/* <div className="bg-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-slate-500 font-semibold uppercase tracking-wider">
            Our Partners in Nation Building
          </h3>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center filter grayscale opacity-60 hover:filter-none hover:opacity-100 transition-all duration-500">
            <p className="text-center text-2xl font-bold text-gray-400">Indian Railways</p>
            <p className="text-center text-2xl font-bold text-gray-400">Nagar Nigam</p>
            <p className="text-center text-2xl font-bold text-gray-400">Public Works</p>
            <p className="text-center text-2xl font-bold text-gray-400">Metro Corp</p>
            <p className="text-center text-2xl font-bold text-gray-400 hidden lg:block">State Transport</p>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default HeroSection