// FILE: src/components/ServicesSection.js (or similar path)
"use client"

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { ChevronRightIcon} from "@heroicons/react/24/solid";
import { fetchManageServicesAsync, selectManageServices } from '../../features/adminSlice/ManageServices/ManageServicesSlice'; // Assuming this relative path is correct

const ServicesSection = () => {
  const dispatch = useDispatch();
  // Select state from the Redux store
  const { data: services, loading, error } = useSelector(selectManageServices);

  // Fetch data when the component mounts
  useEffect(() => {
    // Dispatch the thunk to fetch services from the API
    dispatch(fetchManageServicesAsync());
  }, [dispatch]);

  // Handle loading state
  if (loading) {
    return (
      <section id="services" className="py-10 bg-slate-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800">Loading Our Services...</h2>
        </div>
      </section>
    );
  }

  // Handle error state
  if (error) {
    return (
      <section id="services" className="py-10 bg-slate-50">
        <div className="text-center text-red-600">
          <h2 className="text-3xl font-bold">Oops! Something went wrong.</h2>
          <p>Could not fetch services: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-5   bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center text-sm text-slate-500  pb-5 md:hidden ">
                    <Link to="/" className="hover:text-red-600">Home</Link>
                    <ChevronRightIcon className="w-4 h-4 mx-1" />
                    <Link to="/services" className="hover:text-red-600">Services</Link>
                    <ChevronRightIcon className="w-4 h-4 mx-1" />
                    {/* <span className="font-medium text-slate-700">{title}</span> */}
                </div>
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Our Spectrum of Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            From high-impact digital campaigns to nationwide train branding, we provide end-to-end solutions for the public sector.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Map over the services data from the Redux store */}
          {services.map((service) => {
            // NOTE: The Icon property is no longer used, so it's removed.
            return (
              // Use a unique and stable key like `_id` from the database
              <div key={service._id}> 
                <Link
                  to={`/services/${service.slug}`}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden block h-full flex flex-col
                             transform hover:-translate-y-2 ring-1 ring-transparent hover:ring-red-500
                             transition-all duration-300 ease-in-out"
                >
                  {/* Image Section */}
                  <div className="relative h-56">
                    <img 
                      src= {`http://localhost:3000${service.details.coverImage}`}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
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

export default ServicesSection;