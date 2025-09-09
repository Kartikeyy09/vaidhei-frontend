import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import GalleryEditor from "../components/gallery/GalleryEditor";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchGalleryAsync, selectManageGallery, addGalleryItemAsync, updateGalleryItemAsync, deleteGalleryItemAsync } from "../../features/adminSlice/ManageGallery/ManageGallerySlice";

// --- SKELETON LOADER COMPONENTS ---

// Ek single gallery item ka skeleton
const GalleryItemSkeleton = () => (
    <div className="group relative rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <div className="w-full h-48 bg-slate-200"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 w-full">
            <div className="h-5 w-3/4 bg-slate-400 rounded-md"></div>
            <div className="h-3 w-1/2 bg-slate-500 rounded-md mt-2"></div>
        </div>
    </div>
);

// Poore gallery grid ka skeleton
const GallerySkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
        {[...Array(8)].map((_, i) => <GalleryItemSkeleton key={i} />)}
    </div>
);


// Helper to convert any YouTube URL to an embeddable URL
const getYoutubeEmbedUrl = (url) => {
    if (!url) return '';
    let videoId;
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') {
            videoId = urlObj.pathname.slice(1);
        } else {
            videoId = urlObj.searchParams.get('v');
        }
    } catch (e) {
        const match = url.match(/(?:v=|\/embed\/|\/)([^#\&\?]*).*/);
        videoId = match ? match[1] : null;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
};

const ManageGallery = () => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const dispatch = useDispatch();
    const { data: galleryItems, loading, error } = useSelector(selectManageGallery);

    useEffect(() => { 
        if(galleryItems.length === 0){
            dispatch(fetchGalleryAsync());
        }
    }, [dispatch, galleryItems.length]);

    const handleAddNew = () => { setSelectedItem(null); setIsEditorOpen(true); };
    const handleEdit = (item) => { setSelectedItem(item); setIsEditorOpen(true); };
    const handleDeleteClick = (item) => { setSelectedItem(item); setIsDeleteModalOpen(true); };

    const SERVER_URL = import.meta.env.VITE_BASE_URL;
    
    const confirmDelete = () => {
        if (selectedItem) {
            dispatch(deleteGalleryItemAsync(selectedItem._id))
                .unwrap().then(() => {
                    setIsDeleteModalOpen(false);
                    setSelectedItem(null);
                }).catch(err => console.error("Delete failed:", err));
        }
    };

    const handleSave = (itemData) => {
        const action = selectedItem
            ? updateGalleryItemAsync({ id: selectedItem._id, updatedData: itemData })
            : addGalleryItemAsync(itemData);
        
        dispatch(action).unwrap().then(() => setIsEditorOpen(false)).catch(err => console.error("Save failed:", err));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Manage Gallery</h1>
                    <p className="text-slate-500 mt-1">Add, edit, or delete images & videos from your gallery.</p>
                </div>
                <button onClick={handleAddNew} className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition-colors">
                    <PlusIcon className="w-5 h-5" />
                    Add New Item
                </button>
            </div>

            {error && <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg mb-4">Error: {error}</p>}
            
            {/* Jab tak data load ho raha hai aur gallery khali hai, skeleton dikhao */}
            {loading && galleryItems.length === 0 ? (
                <GallerySkeleton />
            ) : galleryItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {galleryItems.map(item => (
                        <div key={item._id} className="group relative rounded-xl overflow-hidden shadow-lg border border-gray-200">
                            {item.type === 'video' ? (
                                <div className="relative w-full h-48 bg-black flex items-center justify-center">
                                    <iframe className="w-full h-full" src={getYoutubeEmbedUrl(item.videoUrl)} title={item.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    <div className="absolute inset-0 flex items-center justify-center bg-transparent group-hover:bg-black/30 transition-colors pointer-events-none">
                                        <PlayCircleIcon className="w-12 h-12 text-white/50 opacity-100 group-hover:opacity-0 transition-opacity" />
                                    </div>
                                </div>
                            ) : (
                                <img src={`${SERVER_URL}${item.imageUrl}`} alt={item.title} className="w-full h-48 object-cover" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4">
                                <h3 className="font-bold text-white line-clamp-2">{item.title}</h3>
                                <p className="text-xs text-white/80">{item.category}</p>
                            </div>
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(item)} className="p-3 bg-white/20 text-white rounded-full backdrop-blur-sm hover:bg-white/30"><PencilIcon className="w-5 h-5" /></button>
                                <button onClick={() => handleDeleteClick(item)} className="p-3 bg-white/20 text-white rounded-full backdrop-blur-sm hover:bg-white/30"><TrashIcon className="w-5 h-5" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-xl shadow-md border-dashed border-2 border-gray-300">
                    <h3 className="text-xl font-semibold text-slate-700">Gallery is Empty</h3>
                    <p className="text-slate-500 mt-2">Click "Add New Item" to get started.</p>
                </div>
            )}
            
            <GalleryEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} onSave={handleSave} item={selectedItem} isSaving={loading} />
            <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} itemName={selectedItem?.title} isDeleting={loading} />
        </div>
    );
};

export default ManageGallery;