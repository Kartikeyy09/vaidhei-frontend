"use client"

import { useState, useEffect } from "react"
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

// Realistic placeholder data (waisa hi rahega)
const mediaItems = [
  { id: 1, type: "image", category: "railway", title: "Coca-Cola LED Campaign", location: "Lucknow Junction", description: "Large-scale LED advertising campaign featuring dynamic content across multiple screens.", src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600", thumbnail: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600" },
  { id: 2, type: "image", category: "railway", title: "Samsung Train Wrapping", location: "Delhi-Mumbai Route", description: "Complete train exterior branding for Samsung's latest smartphone launch campaign.", src: "https://images.unsplash.com/photo-1583844033741-97b7b25202a0?w=1600", thumbnail: "https://images.unsplash.com/photo-1583844033741-97b7b25202a0?w=600" },
  { id: 3, type: "video", category: "railway", title: "Platform Digital Display", location: "Mumbai Central", description: "Time-lapse video of our digital display installation and campaign execution.", src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", thumbnail: "https://images.unsplash.com/photo-1611299380534-39a7e3752e26?w=600" },
  { id: 4, type: "image", category: "municipal", title: "Bus Stop Advertising", location: "Delhi", description: "Strategic bus stop advertising campaign for a major FMCG brand.", src: "https://images.unsplash.com/photo-1570779836932-3599e3831861?w=1600", thumbnail: "https://images.unsplash.com/photo-1570779836932-3599e3831861?w=600" },
  { id: 5, type: "video", category: "municipal", title: "Market Campaign", location: "Gurgaon", description: "Complete market area branding and advertising campaign execution.", src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", thumbnail: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600" },
  { id: 6, type: "image", category: "government", title: "Government Hoardings", location: "State Secretariat", description: "Professional hoarding installations at government building premises.", src: "https://images.unsplash.com/photo-1605276374104-5de67d183d77?w=1600", thumbnail: "https://images.unsplash.com/photo-1605276374104-5de67d183d77?w=600" },
  { id: 7, type: "video", category: "transport", title: "Metro Station Branding", location: "Delhi Metro", description: "Comprehensive metro station branding and digital display campaign.", src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", thumbnail: "https://images.unsplash.com/photo-1541818290-2c51013426b3?w=600" },
  { id: 8, type: "image", category: "transport", title: "Bus Wrapping Campaign", location: "Mumbai BEST Buses", description: "Full bus wrapping campaign for a leading e-commerce brand.", src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600", thumbnail: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600" },
  { id: 9, type: "image", category: "railway", title: "Escalator Branding", location: "Kolkata Metro", description: "Innovative escalator side panel branding for maximum commuter visibility.", src: "https://images.unsplash.com/photo-1593311394437-434a9b69b32a?w=1600", thumbnail: "https://images.unsplash.com/photo-1593311394437-434a9b69b32a?w=600" },
  { id: 10, type: "image", category: "municipal", title: "City Kiosk Ads", location: "Pune", description: "Interactive digital kiosks placed in high-traffic city squares.", src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1600", thumbnail: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600" }
];

const ITEMS_PER_PAGE = 8;

const GallerySection = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null)
  const [visibleItemsCount, setVisibleItemsCount] = useState(ITEMS_PER_PAGE);

  const filteredItems = activeTab === "all" ? mediaItems : mediaItems.filter((item) => item.category === activeTab)
  const visibleItems = filteredItems.slice(0, visibleItemsCount);

  const categories = [
    { id: "all", name: "All Projects" }, { id: "railway", name: "Railway" },
    { id: "municipal", name: "Municipal" }, { id: "government", name: "Government" },
    { id: "transport", name: "Transport" },
  ]

  const openModal = (index) => setSelectedMediaIndex(index)
  const closeModal = () => setSelectedMediaIndex(null)

  // --- YEH CHANGE HAI: Click ko rokne ke liye functions ko update karein ---
  const handleNext = (e) => {
    e.stopPropagation(); // Click ko peeche jaane se rokein
    if (selectedMediaIndex === null) return;
    setSelectedMediaIndex((prevIndex) => (prevIndex + 1) % filteredItems.length);
  }

  const handlePrev = (e) => {
    e.stopPropagation(); // Click ko peeche jaane se rokein
    if (selectedMediaIndex === null) return;
    setSelectedMediaIndex((prevIndex) => (prevIndex - 1 + filteredItems.length) % filteredItems.length);
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedMediaIndex === null) return;
      if (e.key === "ArrowRight") handleNext(e); // Pass event object
      if (e.key === "ArrowLeft") handlePrev(e); // Pass event object
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMediaIndex, filteredItems]);

  const selectedMedia = selectedMediaIndex !== null ? filteredItems[selectedMediaIndex] : null;

  return (
    <section id="gallery" className="py-10 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ... (Header, Tabs, Grid, Load More button waise hi rahenge) ... */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Project Showcase</h2>
          <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our portfolio of successful advertising campaigns across diverse sectors.
          </p>
        </div>
        <div className="w-full mb-12">
            <div className="flex space-x-2 md:justify-center overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
                {categories.map((category) => (
                    <button
                    key={category.id}
                    onClick={() => { setActiveTab(category.id); setVisibleItemsCount(ITEMS_PER_PAGE); }}
                    className={`relative px-4 py-2.5 sm:px-6 rounded-full font-semibold whitespace-nowrap outline-none transition-all duration-300
                                ${activeTab === category.id ? "bg-red-600 text-white shadow-md" : "bg-white text-slate-600 hover:bg-red-50"}`}
                    >
                    {category.name}
                    </button>
                ))}
            </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {visibleItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative rounded-xl overflow-hidden cursor-pointer ring-1 ring-slate-200/50 hover:ring-red-500 transition-all duration-300 aspect-[4/5]"
              onClick={() => openModal(index)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"/>
              <img
                src={item.thumbnail} alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 z-20 text-white">
                 <span className={`absolute top-2 left-2 px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${item.type === "video" ? "bg-red-500" : "bg-blue-500"}`}>
                    {item.type === "video" ? "▶ Video" : "📷 Photo"}
                 </span>
                <h3 className="font-bold text-sm sm:text-lg">{item.title}</h3>
                <p className="text-xs sm:text-sm opacity-80">{item.location}</p>
              </div>
            </div>
          ))}
        </div>

        {visibleItemsCount < filteredItems.length && (
            <div className="text-center mt-12">
                <button 
                    onClick={() => setVisibleItemsCount(prev => prev + ITEMS_PER_PAGE)}
                    className="bg-white text-red-600 font-semibold px-8 py-3 rounded-lg border border-red-200 hover:bg-red-50 transition-all duration-300 shadow-sm hover:shadow-lg transform hover:scale-105"
                >
                    Load More Projects
                </button>
            </div>
        )}
      </div>

      {selectedMedia && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={closeModal}>
          
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col mx-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative flex-grow bg-black/50 rounded-t-lg flex items-center justify-center">
              {selectedMedia.type === 'video' ? (
                <video src={selectedMedia.src} className="max-w-full max-h-[70vh]" controls autoPlay loop/>
              ) : (
                <img src={selectedMedia.src} alt={selectedMedia.title} className="max-w-full max-h-[70vh] object-contain"/>
              )}
            </div>
            <div className="p-6 bg-white rounded-b-lg flex-shrink-0">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{selectedMedia.title}</h3>
              <p className="text-red-600 font-medium my-1">{selectedMedia.location}</p>
              <p className="text-slate-600">{selectedMedia.description}</p>
            </div>
          </div>

          <button onClick={closeModal} className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"><XMarkIcon className="w-6 h-6"/></button>
          
          {filteredItems.length > 1 && (
            <>
               {/* --- YEH CHANGE HAI: onClick ab event object pass karega --- */}
               <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"><ChevronLeftIcon className="w-7 h-7"/></button>
               <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"><ChevronRightIcon className="w-7 h-7"/></button>
            </>
          )}
        </div>
      )}
    </section>
  )
}

export default GallerySection