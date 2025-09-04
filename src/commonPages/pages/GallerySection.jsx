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
  PhotoIcon, // ✅ Added for the empty state
} from "@heroicons/react/24/outline";

const ITEMS_PER_PAGE = 8;

const SERVER_URL = "https://vaidhei-backend.onrender.com/";

// Helper to convert YouTube URL → Embed URL
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
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);
  const [visibleItemsCount, setVisibleItemsCount] = useState(ITEMS_PER_PAGE);

  // Fetch gallery from backend
  useEffect(() => {
    dispatch(fetchGalleryAsync());
  }, [dispatch]);

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


  const openModal = (index) => setSelectedMediaIndex(index);
  const closeModal = () => setSelectedMediaIndex(null);

  const handleNext = (e) => {
    e.stopPropagation();
    if (selectedMediaIndex === null) return;
    setSelectedMediaIndex(
      (prevIndex) => (prevIndex + 1) % filteredItems.length
    );
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (selectedMediaIndex === null) return;
    setSelectedMediaIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredItems.length) % filteredItems.length
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedMediaIndex === null) return;
      if (e.key === "ArrowRight") handleNext(e);
      if (e.key === "ArrowLeft") handlePrev(e);
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMediaIndex, filteredItems]);

  const selectedMedia =
    selectedMediaIndex !== null ? filteredItems[selectedMediaIndex] : null;

  return (
    <section id="gallery" className="py-5 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center text-sm text-slate-500 px-2  pb-5 md:hidden ">
           <Link to="/" className="hover:text-red-600">Home</Link>
          <ChevronRightIcon className="w-4 h-4 mx-1" />
          <Link to="/gallery" className="hover:text-red-600">gallery</Link>
          <ChevronRightIcon className="w-4 h-4 mx-1" />
       {/* <span className="font-medium text-slate-700">{project.title}</span> */}
      </div>
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Project Showcase
          </h2>
          <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our portfolio of successful advertising campaigns across
            diverse sectors.
          </p>
        </div>

        {/* Tabs */}
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

        {/* ✅ Gallery Grid - Updated with Empty State */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
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
            <p className="mt-1 text-base text-slate-500">
              Please check back later or select another category.
            </p>
          </div>
        ) : (
          // ✅ Wrapped grid and button in a fragment
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {visibleItems.map((item, index) => (
                <div
                  key={item._id}
                  className="group relative rounded-xl overflow-hidden cursor-pointer ring-1 ring-slate-200/50 hover:ring-red-500 transition-all duration-300 aspect-[4/5]"
                  onClick={() => openModal(index)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />

                  {item.type === "video" ? (
                    <div className="relative w-full h-full flex items-center justify-center bg-black">
                      <iframe
                        className="w-full h-full object-cover"
                        src={getYoutubeEmbedUrl(item.videoUrl)}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <PlayCircleIcon className="absolute w-16 h-16 text-white/70 group-hover:text-red-500 transition-colors pointer-events-none" />
                    </div>
                  ) : (
                    <img
                      src={`${SERVER_URL}${item.imageUrl}`}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 z-20 text-white">
                    <h3 className="font-bold text-sm sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm opacity-80">
                      {item.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
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

      {/* Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-grow bg-black/50 rounded-t-lg flex items-center justify-center">
              {selectedMedia.type === "video" ? (
                <iframe
                  className="w-full h-[70vh]"
                  src={getYoutubeEmbedUrl(selectedMedia.videoUrl)}
                  title={selectedMedia.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img
                  src={`http://localhost:3000${selectedMedia.imageUrl}`}
                  alt={selectedMedia.title}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              )}
            </div>
            <div className="p-6 bg-white rounded-b-lg flex-shrink-0">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {selectedMedia.title}
              </h3>
              <p className="text-red-600 font-medium my-1">
                {selectedMedia.category}
              </p>
              <p className="text-slate-600">{selectedMedia.description}</p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          {filteredItems.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"
              >
                <ChevronLeftIcon className="w-7 h-7" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"
              >
                <ChevronRightIcon className="w-7 h-7" />
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default GallerySection;