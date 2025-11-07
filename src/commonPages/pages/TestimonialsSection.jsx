"use client"

import { FaUserAlt, FaQuoteRight, FaStar } from "react-icons/fa"
import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTestimonialsAsync, selectManageTestimonials } from "../../features/adminSlice/ManageTestimonials/ManageTestimonialsSlice"

const TestimonialsSection = () => {
  const scrollRef = useRef(null)
  const dispatch = useDispatch()
  const { data: testimonials, loading, error } = useSelector(selectManageTestimonials)
  const [imageErrors, setImageErrors] = useState({})

  const SERVER_URL = import.meta.env.VITE_BASE_URL

  // fetch testimonials from backend
  useEffect(() => {
    dispatch(fetchTestimonialsAsync())
  }, [dispatch])

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -350 : 350,
        behavior: "smooth",
      })
    }
  }

  // Handle image loading errors
  const handleImageError = (testimonialId) => {
    setImageErrors(prev => ({
      ...prev,
      [testimonialId]: true
    }))
  }

  // Get ring color class based on color string
  const getRingColorClass = (color) => {
    const colorMap = {
      'orange-500': 'ring-orange-500',
      'indigo-600': 'ring-indigo-600',
      'blue-500': 'ring-blue-500',
      'green-500': 'ring-green-500',
      'red-500': 'ring-red-500',
      'purple-500': 'ring-purple-500',
    }
    return colorMap[color] || 'ring-gray-400'
  }

  // Get text color class based on color string
  const getTextColorClass = (color) => {
    const colorMap = {
      'orange-500': 'text-orange-500',
      'indigo-600': 'text-indigo-600',
      'blue-500': 'text-blue-500',
      'green-500': 'text-green-500',
      'red-500': 'text-red-500',
      'purple-500': 'text-purple-500',
    }
    return colorMap[color] || 'text-gray-600'
  }

  // autoplay scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 350, behavior: "smooth" })
        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth - 10
        ) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" })
        }
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-10 bg-gradient-to-br from-red-50 via-white to-blue-50 overflow-hidden">
      {/* Floating Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl font-extrabold text-center text-slate-800 mb-16">
          What Our Clients Say
        </h2>

        {error && (
          <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg mb-6">
            Failed to load testimonials: {error}
          </p>
        )}

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md shadow-lg p-3 rounded-full z-10 hidden md:block hover:scale-110 transition"
          >
            ◀
          </button>

          <div
            ref={scrollRef}
            className="flex gap-10 overflow-x-auto scrollbar-hide scroll-smooth pb-6 pt-14"
          >
            {loading && testimonials.length === 0 ? (
              <p className="text-center text-gray-500">Loading testimonials...</p>
            ) : testimonials.length === 0 ? (
              <p className="text-center text-gray-500">No testimonials available.</p>
            ) : (
              testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="min-w-[320px] md:min-w-[360px] bg-white/90 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 pt-16 relative"
                >
                  {/* Profile Circle */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                    <div className={`w-24 h-24 rounded-full border-4 border-white ring-4 ${getRingColorClass(testimonial.color)} shadow-lg overflow-hidden`}>
                      {testimonial.avatar && !imageErrors[testimonial._id] ? (
                        <img
                          src={`${SERVER_URL}${testimonial.avatar}`}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(testimonial._id)}
                          onLoad={() => console.log('Image loaded successfully:', `${SERVER_URL}${testimonial.avatar}`)}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <FaUserAlt className="text-gray-400 text-3xl" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name + Position */}
                  <div className="text-center mt-6 mb-6">
                    <h3 className={`text-lg font-bold ${getTextColorClass(testimonial.color)}`}>
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-500">{testimonial.position}</p>
                    <p className="text-gray-400 text-sm">{testimonial.company}</p>
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 text-sm text-center mb-8 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Rating + Quote */}
                  <div className="flex items-center justify-between bottom-0 border-t pt-4">
                    <div className="flex space-x-1 text-yellow-400">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <FaQuoteRight className="text-2xl" />
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md shadow-lg p-3 rounded-full z-10 hidden md:block hover:scale-110 transition"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection