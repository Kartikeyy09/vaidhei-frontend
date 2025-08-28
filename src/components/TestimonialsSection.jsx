"use client"

import { FaUserAlt, FaQuoteRight, FaStar } from "react-icons/fa"
import { motion } from "framer-motion"
import { useRef, useEffect } from "react"

const TestimonialsSection = () => {
  const scrollRef = useRef(null)

  const testimonials = [
    {
      name: "Rajesh Kumar",
      position: "Marketing Director",
      company: "Coca-Cola India",
      content:
        "Yaidehi Enterprises delivered exceptional results for our railway advertising campaign. Their professional approach and compliance with railway regulations made the entire process seamless.",
      rating: 5,
      color: "orange-500",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Priya Sharma",
      position: "Brand Manager",
      company: "Samsung Electronics",
      content:
        "Outstanding service and execution! The train wrapping campaign exceeded our expectations and provided excellent brand visibility across multiple routes.",
      rating: 5,
      color: "pink-600",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Amit Patel",
      position: "Advertising Head",
      company: "Flipkart",
      content:
        "Their expertise in railway tenders and strategic placement of our advertisements resulted in significant brand recall and customer engagement.",
      rating: 5,
      color: "amber-500",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
      name: "Sunita Reddy",
      position: "Marketing Manager",
      company: "Tata Motors",
      content:
        "Professional team with deep understanding of railway advertising. They handled our digital display campaign with utmost precision and delivered great ROI.",
      rating: 5,
      color: "indigo-600",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ]

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -350 : 350,
        behavior: "smooth",
      })
    }
  }

  // autoplay scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: 350,
          behavior: "smooth",
        })

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
    <section className="relative py-10 bg-gradient-to-br from-red-50 via-white to-blue-50  overflow-hidden"
  //    style={{
  //   background:
  //   `-webkit-linear-gradient(90deg, hsla(17, 95%, 50%, 1) 0%, hsla(42, 94%, 57%, 1) 100%)`
  // }}
>
      {/* 🔴 Floating Blobs (same style as HeroSection) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/3 w-96 h-96  rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl font-extrabold text-center text-slate-800 mb-16">
          What Our Clients Say
        </h2>

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
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="min-w-[320px] md:min-w-[360px] bg-white/90 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 pt-16 relative"
              >
                {/* Profile Circle */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                  <div
                    className={`w-24 h-24 rounded-full border-4 border-white ring-4 ring-${testimonial.color} shadow-lg overflow-hidden`}
                  >
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUserAlt className="text-white text-3xl" />
                    )}
                  </div>
                </div>

                {/* Name + Position */}
                <div className="text-center mt-6 mb-6">
                  <h3
                    className={`text-lg font-bold text-${testimonial.color}`}
                  >
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
                <div className="flex items-center justify-between border-t pt-4">
                  <div className="flex space-x-1 text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <FaQuoteRight
                    className={`text-2xl text-${testimonial.color}`}
                  />
                </div>
              </motion.div>
            ))}
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
