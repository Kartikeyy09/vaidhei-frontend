// FILE: src/pages/ServiceDetailPage.js (Corrected for Refresh Error)
"use client"

import { useState, useEffect, Fragment } from 'react';
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchManageServicesAsync, selectManageServices } from '../../features/adminSlice/ManageServices/ManageServicesSlice';
import { 
    CheckCircleIcon, 
    XMarkIcon,
    ChevronRightIcon,
    SparklesIcon
} from "@heroicons/react/24/solid";

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { data: services, loading, error } = useSelector(selectManageServices);

  const SERVER_URL = "https://vaidhei-backend.onrender.com";
  
  // Find the service AFTER checking for loading state.
  const service = services.find((s) => s.slug === slug);
  
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    // We only fetch if the services array is empty.
    if (services.length === 0) {
      dispatch(fetchManageServicesAsync());
    }
  }, [dispatch, services.length]);

  // ✅ STEP 1: Handle the loading state FIRST.
  // Show loading indicator if fetch is in progress OR if services haven't been loaded yet.
  if (loading || !service) {
    // We also check for !service here to handle the initial render before data arrives.
    // But if loading is finished and service is still not found, we show "Not Found" below.
    if (loading) {
        return (
          <div className="flex justify-center items-center min-h-screen bg-slate-50">
            <h1 className="text-4xl font-bold text-slate-700">Loading Service...</h1>
          </div>
        );
    }
    // If loading is finished, but we still have no service, it's a 404.
    if (!loading && services.length > 0 && !service) {
       return (
        <div className="text-center py-24">
            <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
            <p className="text-lg text-slate-600 mb-8">The service you are looking for does not exist.</p>
            <Link to="/services" className="text-red-600 font-semibold">
            ← Back to All Services
            </Link>
        </div>
       )
    }
     // This covers the initial state where loading is false but data is empty
    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-50">
            <h1 className="text-4xl font-bold text-slate-700">Loading Service...</h1>
        </div>
    );
  }

  // ✅ STEP 2: Handle error state after loading.
  if (error) {
    return (
        <div className="text-center py-24 text-red-600">
            <h2 className="text-3xl font-bold">Oops! Something went wrong.</h2>
            <p>Could not fetch service details: {error}</p>
        </div>
    );
  }

  // ✅ STEP 3: Now it's SAFE to destructure.
  // If the code reaches here, 'service' is guaranteed to be a valid object.
  const { title, details } = service;

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] bg-slate-900">
        <img 
          src={`${SERVER_URL}${details.coverImage}`} 
          alt={title} 
          className="w-full h-full object-cover opacity-25" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      {/* Premium Overlapping Content Layout */}
      <main className="relative -mt-40 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10">
                
                {/* Breadcrumbs */}
                <div className="flex items-center text-sm text-slate-500 mb-6">
                    <Link to="/" className="hover:text-red-600">Home</Link>
                    <ChevronRightIcon className="w-4 h-4 mx-1" />
                    <Link to="/services" className="hover:text-red-600">Services</Link>
                    <ChevronRightIcon className="w-4 h-4 mx-1" />
                    <span className="font-medium text-slate-700">{title}</span>
                </div>

                {/* Main Title */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-8 pb-8 border-b">
                    {title}
                </h1>
            
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-12">
                    
                    {/* Left Column (Scrollable Content) */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Service Overview</h2>
                            <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
                                {details.overview}
                            </p>
                        </section>

                        {details.galleryImages && details.galleryImages.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-slate-800 mb-6">Visual Showcase</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {details.galleryImages.map((imageUrl, index) => (
                                    <div 
                                        key={`gallery-${index}`} 
                                        className="group rounded-lg overflow-hidden ring-1 ring-slate-200 cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300"
                                        onClick={() => setLightboxImage(imageUrl)}
                                    >
                                        <img
                                            src={`http://localhost:3000${imageUrl}`}
                                            alt={`${title} gallery image ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column (Sticky Details) */}
                    <div className="lg:col-span-1 mt-12 lg:mt-0">
                        <div className="sticky top-24 space-y-8">
                            <div className="bg-slate-50/80 p-6 rounded-xl border">
                                <h3 className="text-xl font-bold text-slate-900 mb-5">Key Features</h3>
                                <ul className="space-y-4">
                                {details.keyFeatures.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircleIcon className="w-6 h-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-700">{feature}</span>
                                    </li>
                                ))}
                                </ul>
                            </div>
                            <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                                <h3 className="flex items-center text-xl font-bold mb-3">
                                    <SparklesIcon className="w-6 h-6 mr-2 text-red-500" />
                                    Best For
                                </h3>
                                <p className="text-slate-700">{details.bestFor}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 z-10"
          >
            <XMarkIcon className="w-7 h-7" />
          </button>
          <img 
            src={`http://localhost:3000${lightboxImage}`}
            alt="Enlarged gallery view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ServiceDetailPage;