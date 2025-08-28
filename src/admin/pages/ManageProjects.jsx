// src/admin/pages/ManageProjects.jsx

import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon, FolderIcon } from "@heroicons/react/24/solid";
import ProjectEditor from "../components/projects/ProjectEditor";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";


// --- MOCK DATA (This will come from your backend API) ---
const initialProjectsData = [
    { id: 1, slug: "delhi-metro-phase-4", title: "Delhi Metro Phase 4 Expansion", category: "Railway", location: "New Delhi", status: "Ongoing", imageUrl: "https://..."},
    { id: 2, slug: "mumbai-coastal-road", title: "Mumbai Coastal Road Project", category: "Municipal", location: "Mumbai", status: "Completed", imageUrl: "https://..."},
    { id: 3, slug: "private-warehouse-construction", title: "Private Warehouse Construction", category: "Private Sector", location: "Gurgaon", status: "Completed", imageUrl: "https://..."},
];

const StatusBadge = ({ status }) => {
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
    const statusClasses = {
        'Completed': 'bg-green-100 text-green-800',
        'Ongoing': 'bg-blue-100 text-blue-800',
        'Upcoming': 'bg-yellow-100 text-yellow-800',
    };
    return <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => { setProjects(initialProjectsData); }, []);

    const handleAddNew = () => { setSelectedProject(null); setIsEditorOpen(true); };
    const handleEdit = (project) => { setSelectedProject(project); setIsEditorOpen(true); };
    const handleDeleteClick = (project) => { setSelectedProject(project); setIsDeleteModalOpen(true); };
    
    const confirmDelete = () => {
        if (selectedProject) {
            setProjects(projects.filter(p => p.id !== selectedProject.id));
            setIsDeleteModalOpen(false);
            setSelectedProject(null);
        }
    };

    const handleSave = (projectData) => {
        if (selectedProject) {
            setProjects(projects.map(p => p.id === selectedProject.id ? { ...p, ...projectData } : p));
        } else {
            setProjects([...projects, { ...projectData, id: Date.now() }]);
        }
        setIsEditorOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Manage Projects</h1>
                    <p className="text-slate-500 mt-1">Oversee your entire project portfolio.</p>
                </div>
                <button onClick={handleAddNew} className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition-colors">
                    <PlusIcon className="w-5 h-5" />
                    Add New Project
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-slate-600">Project Title</th>
                            <th className="p-4 text-sm font-semibold text-slate-600 hidden md:table-cell">Category</th>
                            <th className="p-4 text-sm font-semibold text-slate-600 hidden lg:table-cell">Location</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project.id} className="border-b border-slate-200 hover:bg-slate-50">
                                <td className="p-4">
                                    <div className="flex items-center gap-4">
                                        <img src={project.imageUrl || 'https://via.placeholder.com/150'} alt={project.title} className="w-16 h-12 object-cover rounded-md flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-slate-800">{project.title}</p>
                                            <p className="text-xs text-slate-500">/{project.slug}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-slate-600 hidden md:table-cell">{project.category}</td>
                                <td className="p-4 text-slate-600 hidden lg:table-cell">{project.location}</td>
                                <td className="p-4"><StatusBadge status={project.status} /></td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(project)} className="p-2 text-slate-500 hover:text-blue-600 rounded-full hover:bg-blue-100"><PencilIcon className="w-5 h-5" /></button>
                                        <button onClick={() => handleDeleteClick(project)} className="p-2 text-slate-500 hover:text-red-600 rounded-full hover:bg-red-100"><TrashIcon className="w-5 h-5" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <ProjectEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} onSave={handleSave} project={selectedProject} />
            <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} itemName={selectedProject?.title} />
        </div>
    );
};

export default ManageProjects;