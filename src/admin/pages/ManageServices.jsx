// FILE: src/admin/pages/ManageServices.jsx (Corrected)

import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon, BriefcaseIcon } from "@heroicons/react/24/solid";
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

const ManageServices = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const dispatch = useDispatch();
  const { data: services, loading, error } = useSelector(selectManageServices);

  useEffect(() => {
    dispatch(fetchManageServicesAsync());
  }, [dispatch]);

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
      // unwrap() can be used to handle promise resolution/rejection here
      dispatch(deleteServiceAsync(selectedService._id))
        .unwrap()
        .then(() => {
          setIsDeleteModalOpen(false);
          setSelectedService(null);
        })
        .catch((err) => {
          console.error("Failed to delete the service:", err);
          // Optionally, show an error toast to the user
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
        setIsEditorOpen(false); // Only close modal on success
      })
      .catch((err) => {
        console.error("Failed to save the service:", err);
        // Don't close the modal, and maybe show an error inside the modal
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

      {loading && services.length === 0 && <p className="text-center text-gray-500 py-8">Loading services...</p>}
      {error && <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg">Error: {error}</p>}

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
            {services?.map((service) => (
              <tr key={service._id} className="border-b border-slate-200 hover:bg-slate-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <BriefcaseIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{service.title}</p>
                      <p className="text-xs text-slate-500">/{service.slug}</p>
                    </div>
                  </div>
                </td>
                {/* ✅ FIX: Changed from service.shortDescription to service.description */}
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