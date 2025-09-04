import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Lottie from "lottie-react"
import NotFound from '../../lotify-icone/Questioning.json'

const NotFoundPage = () => {
  const navigate = useNavigate();

  // Interactive Parallax Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    x.set((mouseX / width) * 200 - 100);
    y.set((mouseY / height) * 200 - 100);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Staggered Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section 
      className="relative min-h-screen w-full flex items-center justify-center bg-[#f0f2f5] overflow-hidden p-6"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated Background Blobs */}
      <div className="absolute top-0 -left-1/4 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-0 -right-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 items-center gap-12"
      >
        {/* Left Side: Interactive Illustration */}
        <motion.div
          style={{ rotateX, rotateY, perspective: 800 }}
          className="w-full h-full flex items-center justify-center"
        >
          {/* <img 
            src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-7621843-6166997.png" // A cleaner, professional SVG
            alt="404 Not Found Illustration"
            className="w-full max-w-md"
          /> */}
          <Lottie 
            animationData={NotFound} 
           loop={true} 
           style={{ width: '100%', maxWidth: '400px' }} />
        </motion.div>

        {/* Right Side: Text Content & Actions */}
        <div className="text-center lg:text-left">
          <motion.h1 
            variants={itemVariants} 
            className="text-7xl md:text-9xl font-black bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent"
          >
            404
          </motion.h1>
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl md:text-4xl font-bold text-slate-800 mt-2 mb-4"
          >
            Looks like you're lost.
          </motion.h2>
          <motion.p 
            variants={itemVariants} 
            className="text-lg text-slate-600 max-w-md mx-auto lg:mx-0 mb-10"
          >
            The page you are looking for isn't available. Don't worry, we can help you find your way back.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => navigate(-1)} // Navigates to the previous page in history
              className="inline-flex items-center justify-center gap-2 bg-slate-200 text-slate-800 font-semibold px-6 py-3 rounded-lg shadow-sm hover:bg-slate-300 transition-all duration-300"
            >
              <ArrowUturnLeftIcon className="w-5 h-5" />
              <span>Go Back</span>
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-pink-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <HomeIcon className="w-5 h-5" />
              <span>Take Me Home</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default NotFoundPage;