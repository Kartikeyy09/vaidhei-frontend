// ✅ FILE: src/components/TenderDetailsModal.jsx (CREATE THIS NEW FILE)

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, CheckCircleIcon, CalendarDaysIcon, DocumentArrowDownIcon } from '@heroicons/react/24/solid';

const TenderDetailsModal = ({ isOpen, onClose, tender }) => {
  if (!tender) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
        year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-2xl font-bold leading-8 text-slate-900">
                  {tender.title}
                </Dialog.Title>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="w-6 h-6" />
                </button>

                <div className="mt-4 flex items-center gap-6 border-b border-t py-4">
                    <div className="text-sm">
                        <p className="font-semibold text-slate-500">Client</p>
                        <p className="font-bold text-slate-800">{tender.client}</p>
                    </div>
                    <div className="text-sm">
                        <p className="font-semibold text-slate-500">Sector</p>
                        <p className="font-bold text-slate-800">{tender.sector}</p>
                    </div>
                    <div className="flex items-center text-sm">
                        <CalendarDaysIcon className="w-5 h-5 text-red-500 mr-2"/>
                        <div>
                           <p className="font-semibold text-slate-500">Due Date</p>
                           <p className="font-bold text-slate-800">{formatDate(tender.dueDate)}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-bold text-slate-800 mb-2">Description</h4>
                  <p className="text-slate-600">{tender.description}</p>
                </div>

                <div className="mt-6">
                  <h4 className="font-bold text-slate-800 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {tender.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TenderDetailsModal;