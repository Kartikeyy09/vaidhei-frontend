// ✅ FILE: src/pages/ProjectDetailPage.js (Fully Updated)

"use client"

import { useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { fetchProjectsAsync, selectManageProjects } from '../../features/adminSlice/ManageProjects/ManageProjectsSlice'; // Adjust import path

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { data: projects, loading, error } = useSelector(selectManageProjects);

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(fetchProjectsAsync());
    }
  }, [dispatch, projects.length]);

  const project = projects.find((p) => p.slug === slug);

  if (loading && !project) {
    return <div className="text-center py-24 font-bold text-3xl">Loading Case Study...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-24 text-red-600">
        <h2 className="text-3xl font-bold">Error Loading Project</h2>
        <p>Could not fetch case study details: {error}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-24">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-lg text-slate-600 mb-8">The case study you are looking for does not exist.</p>
        <Link to="/" className="text-red-600 font-semibold">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const serverUrl = 'http://localhost:3000';

  return (
    <div className="bg-white">
      <div className="flex items-center text-sm text-slate-500 px-2  pb-5 md:hidden ">
       <Link to="/" className="hover:text-red-600">Home</Link>
       <ChevronRightIcon className="w-4 h-4 mx-1" />
       <Link to="/projects" className="hover:text-red-600">Projects</Link>
       <ChevronRightIcon className="w-4 h-4 mx-1" />
       <span className="font-medium text-slate-700">{project.title}</span>
   </div>
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-black">
        {/* ✅ FIX: Use 'coverImage' for the hero banner */}
         
        <img 
          src={`${serverUrl}${project.coverImage}`} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-50" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <span className="bg-red-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Case Study
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold">{project.title}</h1>
          <p className="mt-4 text-xl font-medium">📍 {project.location}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
        <div className="prose lg:prose-xl max-w-none">
            <h2 className="text-3xl font-bold text-slate-900">The Challenge</h2>
            {/* ✅ UNCOMMENTED: Displaying the project details */}
            <p className="text-lg text-slate-600 leading-relaxed">{project.details.challenge}</p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12">Our Solution</h2>
            <p className="text-lg text-slate-600 leading-relaxed">{project.details.solution}</p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12">The Results</h2>
            <p className="text-lg text-slate-600 leading-relaxed">{project.details.results}</p>
        </div>

        {/* ✅ ADDED: Project Gallery Section */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <div className="mt-16 pt-12 border-t">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">Project Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {project.galleryImages.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src={`${serverUrl}${image}`} 
                    alt={`${project.title} gallery image ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-16 pt-12 border-t">
            <Link to="/projects" className="inline-block bg-slate-100 text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors">
                ← Back to All Projects
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;