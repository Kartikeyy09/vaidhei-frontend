import { useState, useEffect } from "react";
import { 
    PlusIcon, 
    PencilIcon, 
    TrashIcon, 
    BriefcaseIcon,
    InboxIcon
} from "@heroicons/react/24/solid";
import ServiceEditor from "../components/services/ServiceEditor";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchManageServicesAsync,
  selectManageServices,
  addServiceAsync,
  updateServiceAsync,
  deleteServiceAsync,
} from "../../features/adminSlice/ManageServices/ManageServicesSlice";

// --- SKELETON LOADER COMPONENT ---
// This component renders a skeleton version of the table body while data is loading.
const ServiceTableSkeleton = () => (
    <tbody className="animate-pulse">
        {[...Array(6)].map((_, i) => (
            <tr key={i} className="border-b border-slate-200">
                <td className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-200 rounded-lg flex-shrink-0"></div>
                        <div>
                            <div className="h-5 w-40 bg-slate-200 rounded-md"></div>
                            <div className="h-3 w-24 bg-slate-200 rounded-md mt-2"></div>
                        </div>
                    </div>
                </td>
                <td className="p-4 hidden md:table-cell">
                    <div className="h-4 w-full bg-slate-200 rounded-md"></div>
                </td>
                <td className="p-4">
                    <div className="flex gap-2">
                        <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                        <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                    </div>
                </td>
            </tr>
        ))}
    </tbody>
);


const ManageServices = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const dispatch = useDispatch();
  const { data: services, loading, error } = useSelector(selectManageServices);

  useEffect(() => {
    // Fetch services only if the list is empty to prevent re-fetching
    if (services.length === 0) {
        dispatch(fetchManageServicesAsync());
    }
  }, [dispatch, services.length]);

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

  const confirmDelete = async () => {
    if (selectedService) {
      dispatch(deleteServiceAsync(selectedService._id))
        .unwrap()
        .then(() => {
          setIsDeleteModalOpen(false);
          setSelectedService(null);
        })
        .catch((err) => {
          console.error("Failed to delete the service:", err);
        });
    }
  };

  const handleSave = async (serviceFormData) => {
    const action = selectedService
      ? updateServiceAsync({ id: selectedService._id, updatedData: serviceFormData })
      : addServiceAsync(serviceFormData);
      
    dispatch(action)
      .unwrap()
      .then(() => {
        setIsEditorOpen(false);
      })
      .catch((err) => {
        console.error("Failed to save the service:", err);
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manage Services</h1>
          <p className="text-slate-500 mt-1">
            Control the services featured on your website.
          </p>
        </div>
        <button onClick={handleAddNew} className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition-colors" >
          <PlusIcon className="w-5 h-5" />
          Add New Service
        </button>
      </div>

      {error && (
        <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg">Error: {error}</p>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-sm font-semibold text-slate-600">Service Title</th>
              <th className="p-4 text-sm font-semibold text-slate-600 hidden md:table-cell">Short Description</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          
          {loading && services.length === 0 ? (
            <ServiceTableSkeleton />
          ) : services.length > 0 ? (
            <tbody>
              {services.map((service) => (
                <tr key={service._id} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BriefcaseIcon className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{service.title}</p>
                        <p className="text-xs text-slate-500">/{service.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 hidden md:table-cell">{service.description}</td>
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
          ) : (
             <tbody>
                <tr>
                    <td colSpan="3">
                        <div className="text-center py-20 px-6">
                            <InboxIcon className="mx-auto h-16 w-16 text-slate-400" />
                            <h3 className="mt-4 text-xl font-semibold text-slate-700">No Services Added Yet</h3>
                            <p className="mt-2 text-base text-slate-500">
                                Get started by adding your first service to the list.
                            </p>
                        </div>
                    </td>
                </tr>
            </tbody>
          )}
        </table>
      </div>

      <ServiceEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSave}
        service={selectedService}
        isSaving={loading}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={selectedService?.title}
        isDeleting={loading}
      />
    </div>
  );
};

export default ManageServices;