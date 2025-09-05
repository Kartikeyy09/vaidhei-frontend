// ✅ FILE: src/components/ProjectsSection.js (FINAL CODE)

"use client"

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { fetchProjectsAsync, selectManageProjects } from '../../features/adminSlice/ManageProjects/ManageProjectsSlice';

// Skeleton Component for a single project card
const ProjectSkeleton = ({ reverseOrder = false }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center animate-pulse">
    {/* Image Placeholder */}
    <div className={`rounded-xl bg-slate-200 h-80 w-full ${reverseOrder ? 'md:order-2' : 'md:order-1'}`}></div>
    
    {/* Text Content Placeholder */}
    <div className={`flex flex-col items-center md:items-start ${reverseOrder ? 'md:order-1' : 'md:order-2'}`}>
      <div className="h-7 w-32 bg-slate-200 rounded-full mb-4"></div>
      <div className="h-9 w-4/5 bg-slate-200 rounded-md mb-4"></div>
      <div className="space-y-2 w-full">
        <div className="h-5 bg-slate-200 rounded-md"></div>
        <div className="h-5 w-5/6 bg-slate-200 rounded-md"></div>
        <div className="h-5 w-3/4 bg-slate-200 rounded-md"></div>
      </div>
      <div className="h-6 w-40 bg-slate-200 rounded-md mt-6"></div>
    </div>
  </div>
);

const ProjectsSection = () => {
  const navigate = useNavigate();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const dispatch = useDispatch();
  const { data: projects, loading, error } = useSelector(selectManageProjects);

  const SERVER_URL = "https://vaidhei-backend.onrender.com";

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(fetchProjectsAsync());
    }
  }, [dispatch, projects.length]);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 4);

  if (error) {
    return (
      <section id="projects" className="py-20 bg-slate-50 text-center">
        <h2 className="text-3xl font-bold text-slate-800">Error Loading Projects</h2>
        <p className="text-red-500 mt-2">Could not fetch case studies: {error}</p>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center text-sm text-slate-500 pb-5 md:hidden">
            <Link to="/" className="hover:text-red-600">Home</Link>
            <ChevronRightIcon className="w-4 h-4 mx-1" />
            <span className="font-medium text-slate-700">Projects</span>
        </div>
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Featured Case Studies
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            We partner with leading brands to create railway advertising campaigns that deliver exceptional results.
          </p>
        </div>

        {loading && projects.length === 0 ? (
          <div className="space-y-20">
            <ProjectSkeleton />
            <ProjectSkeleton reverseOrder={true} /> 
          </div>
        ) : (
          <>
            <div className="space-y-20">
              {displayedProjects.map((project, index) => (
                <div
                  key={project._id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center transition-all duration-500 ease-in-out animate-fade-in cursor-pointer"
                  onClick={() => navigate(`/projects/${project.slug}`)}
                >
                  <div
                    className={`group relative rounded-xl overflow-hidden ${
                      index % 2 === 0 ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"/>
                    <img 
                      src={`${SERVER_URL}${project.image}`}
                      alt={project.title} 
                      className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div
                    className={`text-center md:text-left ${
                      index % 2 === 0 ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    <span className="inline-block bg-red-100 text-red-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                      📍 {project.location}
                    </span>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center text-red-600 font-semibold hover:text-red-800 transition-colors group"
                    >
                      View Case Study
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {projects.length > 4 && (
              <div className="text-center mt-20">
                <button 
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="inline-block bg-gradient-to-r from-red-600 to-pink-500 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  {showAllProjects ? "Show Less" : "View All Projects"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;