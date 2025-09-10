// ✅ FILE: src/pages/GallerySection.jsx (COMPLETE AND FINAL)

"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGalleryAsync,
  selectManageGallery,
} from "../../features/adminSlice/ManageGallery/ManageGallerySlice";
import { Link } from "react-router-dom";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayCircleIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

// --- Skeleton Loader Components ---

// Esqueleto para un solo ítem de la galería
const GalleryItemSkeleton = () => (
  <div className="relative rounded-xl overflow-hidden bg-slate-200 aspect-[4/5]">
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-4 w-full">
      <div className="h-5 w-3/4 bg-slate-400/50 rounded-md"></div>
      <div className="h-3 w-1/2 bg-slate-500/50 rounded-md mt-2"></div>
    </div>
  </div>
);

// Esqueleto para toda la parrilla de la galería
const GalleryGridSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
    {[...Array(8)].map((_, i) => (
      <GalleryItemSkeleton key={i} />
    ))}
  </div>
);

const ITEMS_PER_PAGE = 8;
const SERVER_URL = import.meta.env.VITE_BASE_URL;

// Helper para convertir URL de YouTube → URL de Embed
const getYoutubeEmbedUrl = (url) => {
  if (!url) return "";
  let videoId;
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.slice(1);
    } else {
      videoId = urlObj.searchParams.get("v");
    }
  } catch (e) {
    const match = url.match(/(?:v=|\/embed\/|\/)([^#\&\?]*).*/);
    videoId = match ? match[1] : null;
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
};

const GallerySection = () => {
  const dispatch = useDispatch();
  const { data: galleryItems, loading, error } = useSelector(selectManageGallery);

  const [activeTab, setActiveTab] = useState("all");
  const [selectedMediaId, setSelectedMediaId] = useState(null);
  const [visibleItemsCount, setVisibleItemsCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    if (galleryItems.length === 0) {
      dispatch(fetchGalleryAsync());
    }
  }, [dispatch, galleryItems.length]);

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "railway", name: "Railway" },
    { id: "municipal", name: "Municipal" },
    { id: "government", name: "Government" },
    { id: "transport", name: "Transport" },
    { id: "Highways", name: "Highways" },
    { id: "others", name: "Others" },
  ];
  
  const filteredItems =
    activeTab === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeTab);

  const visibleItems = filteredItems.slice(0, visibleItemsCount);

  const openModal = (itemId) => setSelectedMediaId(itemId);
  const closeModal = () => setSelectedMediaId(null);

  const handleNext = (e) => {
    e.stopPropagation();
    if (!selectedMediaId) return;
    const currentIndex = filteredItems.findIndex(item => item._id === selectedMediaId);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedMediaId(filteredItems[nextIndex]._id);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (!selectedMediaId) return;
    const currentIndex = filteredItems.findIndex(item => item._id === selectedMediaId);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedMediaId(filteredItems[prevIndex]._id);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedMediaId) return;
      if (e.key === "ArrowRight") handleNext(e);
      if (e.key === "ArrowLeft") handlePrev(e);
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMediaId, filteredItems]);

  const selectedMedia =
    selectedMediaId !== null 
    ? filteredItems.find(item => item._id === selectedMediaId) 
    : null;

  return (
    <section id="gallery" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center text-sm text-slate-500 pb-5 md:hidden ">
           <Link to="/" className="hover:text-red-600">Home</Link>
          <ChevronRightIcon className="w-4 h-4 mx-1 text-slate-400" />
          <span className="font-medium text-slate-700">Gallery</span>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Project Showcase
          </h2>
          <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our portfolio of successful advertising campaigns across
            diverse sectors.
          </p>
        </div>

        <div className="w-full mb-12">
          <div className="flex space-x-2 md:justify-center overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveTab(category.id);
                  setVisibleItemsCount(ITEMS_PER_PAGE);
                }}
                className={`relative px-4 py-2.5 sm:px-6 rounded-full font-semibold whitespace-nowrap outline-none transition-all duration-300
                                ${
                                  activeTab === category.id
                                    ? "bg-red-600 text-white shadow-md"
                                    : "bg-white text-slate-600 hover:bg-red-50"
                                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {(loading && galleryItems.length === 0) ? (
          <GalleryGridSkeleton />
        ) : error ? (
          <p className="text-center text-red-500 bg-red-50 p-6 rounded-lg">{error}</p>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 px-6 bg-slate-100 rounded-xl border-2 border-dashed border-slate-200">
            <PhotoIcon className="mx-auto h-16 w-16 text-slate-400" />
            <h3 className="mt-4 text-xl font-semibold text-slate-700">
              No Projects Found
            </h3>
            <p className="mt-2 text-base text-slate-500">
              There are currently no projects available in the "
              {categories.find((c) => c.id === activeTab)?.name}" category.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {visibleItems.map((item) => (
                <div
                  key={item._id}
                  className="group relative rounded-xl overflow-hidden cursor-pointer ring-1 ring-slate-200/50 hover:ring-red-500 transition-all duration-300 aspect-[4/5]"
                  onClick={() => openModal(item._id)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                  {item.type === "video" ? (
                    <div className="relative w-full h-full flex items-center justify-center bg-black">
                      <iframe className="w-full h-full object-cover" src={getYoutubeEmbedUrl(item.videoUrl)} title={item.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                      <PlayCircleIcon className="absolute w-16 h-16 text-white/70 group-hover:text-red-500 transition-colors pointer-events-none" />
                    </div>
                  ) : (
                    <img src={`${SERVER_URL}${item.imageUrl}`} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  )}
                  <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 z-20 text-white">
                    <h3 className="font-bold text-sm sm:text-lg line-clamp-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm opacity-80 capitalize">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>

            {visibleItemsCount < filteredItems.length && (
              <div className="text-center mt-12">
                <button
                  onClick={() =>
                    setVisibleItemsCount((prev) => prev + ITEMS_PER_PAGE)
                  }
                  className="bg-white text-red-600 font-semibold px-8 py-3 rounded-lg border border-red-200 hover:bg-red-50 transition-all duration-300 shadow-sm hover:shadow-lg transform hover:scale-105"
                >
                  Load More Projects
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal de visualización */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={closeModal}>
          
          <button onClick={handlePrev} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[60] p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors">
            <ChevronLeftIcon className="w-8 h-8 text-white" />
          </button>
          
          <div className="relative w-full max-w-4xl h-auto max-h-[90vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-full">
              {selectedMedia.type === 'video' ? (
                  <div className="aspect-video bg-black rounded-lg shadow-2xl">
                    <iframe className="w-full h-full" src={getYoutubeEmbedUrl(selectedMedia.videoUrl) + "?autoplay=1&rel=0"} title={selectedMedia.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
              ) : (
                  <img src={`${SERVER_URL}${selectedMedia.imageUrl}`} alt={selectedMedia.title} className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" />
              )}
            </div>
            <div className="mt-4 text-center text-white bg-black/30 rounded-lg p-2 max-w-prose">
                <h3 className="font-bold text-lg">{selectedMedia.title}</h3>
                <p className="text-sm opacity-80 capitalize">{selectedMedia.category}</p>
            </div>
          </div>

          <button onClick={handleNext} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[60] p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors">
            <ChevronRightIcon className="w-8 h-8 text-white" />
          </button>
          
          <button onClick={closeModal} className="absolute top-4 right-4 z-[60] p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors">
            <XMarkIcon className="w-8 h-8 text-white" />
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;