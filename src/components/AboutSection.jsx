"use client"

import { Link } from "react-router-dom"
import { 
  CheckBadgeIcon, 
  ShieldCheckIcon, 
  RocketLaunchIcon, 
  LightBulbIcon, 
  Cog6ToothIcon, 
  UserGroupIcon,
  BuildingLibraryIcon,
  HandThumbUpIcon,
  MapPinIcon,
  SparklesIcon,
  ArrowRightIcon,
  ChevronRightIcon
} from "@heroicons/react/24/solid"

const AboutSection = () => {
  return (
    <section id="about" className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-16 items-start">
          
          {/* --- Left Side: Image + Key Achievements --- */}
          <div className="lg:sticky lg:top-24">
            {/* Engaging Image */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1742923353997-29d826d05f90?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Vaidehi Enterprises team collaborating on a major infrastructure project"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-8 -right-8 bg-gradient-to-r from-red-600 to-pink-500 text-white p-6 rounded-xl shadow-lg w-64 transform transition-transform hover:scale-105">
                <div className="text-4xl font-extrabold">15+</div>
                <div className="text-lg font-semibold">Years of Expertise</div>
                <p className="text-sm opacity-90 mt-1">in Public Sector Projects</p>
              </div>
            </div>

            {/* Key Achievements Section */}
            <div className="mt-20 text-center">
              <h3 className="text-2xl font-bold text-slate-800 mb-8">Our Achievements at a Glance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
                  <BuildingLibraryIcon className="w-12 h-12 text-red-500 mb-3" />
                  <span className="text-4xl font-extrabold text-slate-900">500+</span>
                  <p className="text-slate-600 font-medium mt-1">Projects Completed</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
                  <HandThumbUpIcon className="w-12 h-12 text-red-500 mb-3" />
                  <span className="text-4xl font-extrabold text-slate-900">98%</span>
                  <p className="text-slate-600 font-medium mt-1">Client Satisfaction</p>
                </div>
                 <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
                  <MapPinIcon className="w-12 h-12 text-red-500 mb-3" />
                  <span className="text-4xl font-extrabold text-slate-900">10+</span>
                  <p className="text-slate-600 font-medium mt-1">States Served</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* --- Right Side: Comprehensive Content --- */}
          <div>
            <span className="text-sm font-bold text-red-600 tracking-wider uppercase">About Vaidehi Enterprises</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-2 mb-6">
              Engineering Progress, Building Trust
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Founded over 15 years ago, **Vaidehi Enterprises** began with a singular vision: to become the most reliable and effective partner for public sector projects in India. Today, we are a leading force in the industry, known for our ability to navigate the complexities of government tenders and deliver excellence on the ground. From Indian Railways to local municipalities, our work is a testament to our commitment to quality and national progress.
            </p>

            {/* --- Section: Our Core Values --- */}
            <div className="mb-10 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Core Values</h3>
              <ul className="space-y-3 text-lg text-slate-700">
                <li className="flex items-center"><ShieldCheckIcon className="w-6 h-6 text-green-600 mr-3"/>**Integrity:** We operate with transparency and uphold the highest ethical standards in every bid and project.</li>
                <li className="flex items-center"><SparklesIcon className="w-6 h-6 text-green-600 mr-3"/>**Excellence:** We are relentless in our pursuit of quality, ensuring every project is delivered on time and to the highest specification.</li>
                <li className="flex items-center"><UserGroupIcon className="w-6 h-6 text-green-600 mr-3"/>**Partnership:** We build lasting relationships with our clients, acting as a true extension of their team.</li>
              </ul>
            </div>
            
            {/* --- Section: What Sets Us Apart --- */}
            <div className="mb-10">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">What Sets Us Apart</h3>
                <div className="space-y-5">
                    <div className="flex items-start">
                        <LightBulbIcon className="w-8 h-8 text-red-500 mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg text-slate-800">Strategic Bid Management</h4>
                            <p className="text-slate-600">We craft winning strategies for every tender, ensuring it excels on both technical and financial fronts.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <Cog6ToothIcon className="w-8 h-8 text-red-500 mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg text-slate-800">Flawless End-to-End Execution</h4>
                            <p className="text-slate-600">From initial paperwork to final handover, we manage every phase with precision, transparency, and accountability.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Section: Our Future Outlook --- */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Our Future Outlook</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                While our roots are firmly in the public sector, we are actively expanding our horizons. Our vision includes forging strategic partnerships in the private sector, bringing our proven expertise in large-scale project management to new industries and challenges.
              </p>
            </div>

            {/* --- Call to Action --- */}
            <div className="flex items-center gap-x-6">
              {/* Primary CTA */}
              <Link 
                to="/journey"
                className="group inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all duration-300 shadow-lg transform hover:-translate-y-1"
              >
                Explore Our Journey
                <ArrowRightIcon className="w-6 h-6 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              
              {/* Secondary CTA */}
              <Link 
                to="/contact"
                className="group inline-flex items-center font-semibold text-lg text-slate-700 hover:text-red-600 transition-colors duration-300"
              >
                Contact Us
                <ChevronRightIcon className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection