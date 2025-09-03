// ✅ FILE: src/components/ServicesSection.jsx (UPDATED WITH BETTER UX)

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { fetchManageServicesAsync, selectManageServices } from '../../features/adminSlice/ManageServices/ManageServicesSlice';

// Ek professional loading state ke liye Skeleton Card component
const ServiceCardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
        <div className="h-56 bg-gray-200"></div>
        <div className="p-6">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="h-5 bg-gray-300 rounded w-1/3"></div>
            </div>
        </div>
    </div>
);

const ServicesSection = () => {
  const dispatch = useDispatch();
  const { data: services, loading, error } = useSelector(selectManageServices);

  useEffect(() => {
    dispatch(fetchManageServicesAsync());
  }, [dispatch]);

  // Hum homepage par shayad sirf 6 services dikhana chahte hain
  const featuredServices = services.slice(0, 6);

  return (
    <section id="services" className="py-5 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center text-sm text-slate-500 pb-5 md:hidden">
            <Link to="/" className="hover:text-red-600">Home</Link>
            <ChevronRightIcon className="w-4 h-4 mx-1" />
            <span className="font-medium text-slate-700">Services</span>
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
          {loading && (
            // Loading state mein skeleton cards dikhayein
            Array.from({ length: 3 }).map((_, index) => <ServiceCardSkeleton key={index} />)
          )}

          {error && (
            // Error state mein ek saaf message dikhayein
            <div className="sm:col-span-2 lg:col-span-3 text-center bg-red-50 text-red-700 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Oops! Something went wrong.</h3>
              <p>We couldn't load our services at the moment. Please try again later.</p>
            </div>
          )}

          {!loading && !error && featuredServices.length === 0 && (
            // Empty state (jab data na ho)
            <div className="sm:col-span-2 lg:col-span-3 text-center bg-white text-slate-600 p-10 rounded-lg shadow-sm">
              <h3 className="font-semibold text-2xl mb-2">No Services Available</h3>
              <p>We are currently updating our service offerings. Please check back soon!</p>
            </div>
          )}

          {!loading && !error && featuredServices.map((service) => (
              <div key={service._id}> 
                <Link
                  to={`/services/${service.slug}`}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden block h-full flex flex-col
                             transform hover:-translate-y-2 ring-1 ring-transparent hover:ring-red-500
                             transition-all duration-300 ease-in-out"
                >
                  <div className="relative h-56">
                    <img 
                      // ✅ ROBUSTNESS: Optional chaining ka istemal
                      src={`http://localhost:3000${service.details?.coverImage}`}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

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
          )}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection;