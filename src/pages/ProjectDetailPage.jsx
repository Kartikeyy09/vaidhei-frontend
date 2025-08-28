"use client"

import { useParams, Link } from "react-router-dom"
import { projects } from "../data/projects" // Apne data ko import karein

const ProjectDetailPage = () => {
  const { slug } = useParams() // URL se 'slug' ko nikaalein
  const project = projects.find((p) => p.slug === slug) // Sahi project ko dhoondein

  // Agar project nahi milta hai toh
  if (!project) {
    return (
      <div className="text-center py-24">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-lg text-slate-600 mb-8">The case study you are looking for does not exist.</p>
        <Link to="/" className="text-red-600 font-semibold">
          ← Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-black">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <span className="bg-red-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Case Study
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold">{project.title}</h1>
          <p className="mt-4 text-xl font-medium">📍 {project.location}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <div className="prose lg:prose-xl max-w-none">
            <h2 className="text-3xl font-bold text-slate-900">The Challenge</h2>
            <p className="text-lg text-slate-600 leading-relaxed">{project.details.challenge}</p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12">Our Solution</h2>
            <p className="text-lg text-slate-600 leading-relaxed">{project.details.solution}</p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12">The Results</h2>
            <p className="text-lg text-slate-600 leading-relaxed">{project.details.results}</p>
        </div>

        <div className="text-center mt-16 pt-12 border-t">
            <Link to="/projects" className="inline-block bg-slate-100 text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors">
                ← Back to All Projects
            </Link>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailPage