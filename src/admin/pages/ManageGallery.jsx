// src/admin/pages/ManageGallery.jsx

import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import GalleryEditor from "../components/gallery/GalleryEditor";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";


// --- MOCK DATA (This will come from your backend API) ---
const initialGalleryData = [
    { id: 1, slug: "railway-track-maintenance", title: "Railway Track Maintenance", category: "Railways", imageUrl: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?q=80&w=1974&auto=format&fit=crop"},
    { id: 2, slug: "municipal-road-construction", title: "Municipal Road Construction", category: "Municipal", imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"},
    { id: 3, slug: "bridge-structural-work", title: "Bridge Structural Work", category: "Infrastructure", imageUrl: "https://images.unsplash.com/photo-1582209605559-2172d1515f20?q=80&w=1974&auto=format&fit=crop"},
    { id: 4, slug: "site-planning-meeting", title: "Site Planning Meeting", category: "Corporate", imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop"},
];

const ManageGallery = () => {
    const [images, setImages] = useState([]);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => { setImages(initialGalleryData); }, []);

    const handleAddNew = () => { setSelectedImage(null); setIsEditorOpen(true); };
    const handleEdit = (image) => { setSelectedImage(image); setIsEditorOpen(true); };
    const handleDeleteClick = (image) => { setSelectedImage(image); setIsDeleteModalOpen(true); };

    const confirmDelete = () => {
        if (selectedImage) {
            setImages(images.filter(img => img.id !== selectedImage.id));
            setIsDeleteModalOpen(false);
            setSelectedImage(null);
        }
    };

    const handleSave = (imageData) => {
        if (selectedImage) {
            setImages(images.map(img => img.id === selectedImage.id ? { ...img, ...imageData } : img));
        } else {
            setImages([...images, { ...imageData, id: Date.now() }]);
        }
        setIsEditorOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Manage Gallery</h1>
                    <p className="text-slate-500 mt-1">Add, edit, or delete images from your website's gallery.</p>
                </div>
                <button onClick={handleAddNew} className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition-colors">
                    <PlusIcon className="w-5 h-5" />
                    Add New Image
                </button>
            </div>

            {images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map(image => (
                        <div key={image.id} className="group relative rounded-xl overflow-hidden shadow-lg border border-gray-200">
                            <img src={image.imageUrl} alt={image.title} className="w-full h-48 object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4">
                                <h3 className="font-bold text-white">{image.title}</h3>
                                <p className="text-xs text-white/80">{image.category}</p>
                            </div>
                            {/* Hover Overlay for Actions */}
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(image)} className="p-3 bg-white/20 text-white rounded-full backdrop-blur-sm hover:bg-white/30">
                                    <PencilIcon className="w-5 h-5" />
                                </button>
                                <button onClick={() => handleDeleteClick(image)} className="p-3 bg-white/20 text-white rounded-full backdrop-blur-sm hover:bg-white/30">
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-xl shadow-md border-dashed border-2 border-gray-300">
                    <h3 className="text-xl font-semibold text-slate-700">No Images Found</h3>
                    <p className="text-slate-500 mt-2">Click "Add New Image" to get started.</p>
                </div>
            )}
            
            <GalleryEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} onSave={handleSave} image={selectedImage} />
            <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} itemName={selectedImage?.title} />
        </div>
    );
};

export default ManageGallery;