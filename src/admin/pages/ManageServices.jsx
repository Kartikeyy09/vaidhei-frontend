// src/admin/pages/ManageServices.jsx

import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon, BriefcaseIcon } from "@heroicons/react/24/solid";
import ServiceEditor from "../components/services/ServiceEditor";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

// --- MOCK DATA (This will come from your backend API) ---
const initialServicesData = [
    { id: 1, slug: "public-tender-bidding", title: "Public Tender Bidding", icon: "ClipboardDocumentListIcon", shortDescription: "Expert guidance and execution for securing high-value public sector tenders.", imageUrl: "https://..."},
    { id: 2, slug: "project-management", title: "End-to-End Project Management", icon: "Cog6ToothIcon", shortDescription: "Comprehensive oversight from initial bidding to final project handover and compliance.", imageUrl: "https://..."},
    { id: 3, slug: "railway-infrastructure", title: "Railway Infrastructure Projects", icon: "TrainIcon", shortDescription: "Specialized services for Indian Railways, including platform and track maintenance.", imageUrl: "https://..."},
];

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => { setServices(initialServicesData); }, []);

    const handleAddNew = () => {
        setSelectedService(null);
        setIsEditorOpen(true);
    };

    const handleEdit = (service) => {
        setSelectedService(service);
        setIsEditorOpen(true);
    };

    const handleDeleteClick = (service) => {
        setSelectedService(service);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (selectedService) {
            // In a real app: await fetch(`/api/services/${selectedService.id}`, { method: 'DELETE' });
            setServices(services.filter(s => s.id !== selectedService.id));
            setIsDeleteModalOpen(false);
            setSelectedService(null);
        }
    };

    const handleSave = (serviceData) => {
        if (selectedService) {
            // Update
            setServices(services.map(s => s.id === selectedService.id ? { ...s, ...serviceData } : s));
        } else {
            // Add New
            const newService = { ...serviceData, id: Date.now() };
            setServices([...services, newService]);
        }
        setIsEditorOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Manage Services</h1>
                    <p className="text-slate-500 mt-1">Control the services featured on your website.</p>
                </div>
                <button onClick={handleAddNew} className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition-colors">
                    <PlusIcon className="w-5 h-5" />
                    Add New Service
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-slate-600">Service Title</th>
                            <th className="p-4 text-sm font-semibold text-slate-600 hidden md:table-cell">Short Description</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service.id} className="border-b border-slate-200 hover:bg-slate-50">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                            <BriefcaseIcon className="w-6 h-6 text-red-600"/>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-800">{service.title}</p>
                                            <p className="text-xs text-slate-500">/{service.slug}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-slate-600 hidden md:table-cell">{service.shortDescription}</td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(service)} className="p-2 text-slate-500 hover:text-blue-600 rounded-full hover:bg-blue-100">
                                            <PencilIcon className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDeleteClick(service)} className="p-2 text-slate-500 hover:text-red-600 rounded-full hover:bg-red-100">
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <ServiceEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} onSave={handleSave} service={selectedService} />
            <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} itemName={selectedService?.title} />
        </div>
    );
};

export default ManageServices;