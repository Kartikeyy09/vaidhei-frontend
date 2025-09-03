// ✅ FILE: src/components/TendersSection.jsx (UPDATED WITH ENHANCED CARD DESIGN)

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTendersAsync, selectManageTenders } from '../../features/adminSlice/ManageTenders/ManageTendersSlice';
import TenderDetailsModal from '../components/TenderDetailsModal';
// ⭐ Naye icons import karein
import { BuildingOffice2Icon, CalendarDaysIcon, CheckCircleIcon,ChevronRightIcon } from '@heroicons/react/24/solid';

// ... TenderCardSkeleton component mein koi badlav nahi ...
const TenderCardSkeleton = () => (
    <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-gray-200 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
        <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
        </div>
    </div>
);

// Date format karne ke liye helper function
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC'
    });
};


const TendersSection = () => {
    const dispatch = useDispatch();
    const { data: tenders, loading, error } = useSelector(selectManageTenders);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTender, setSelectedTender] = useState(null);

    useEffect(() => {
        dispatch(fetchTendersAsync());
    }, [dispatch]);

    const activeTenders = tenders.filter(tender => tender.status === 'Active').slice(0, 6);

    const handleViewDetails = (tender) => {
        setSelectedTender(tender);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedTender(null), 300);
    };

    return (
        <>
            <section className="py-5 bg-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center text-sm text-slate-500 pb-5 md:hidden">
                                <Link to="/" className="hover:text-red-600">Home</Link>
                                <ChevronRightIcon className="w-4 h-4 mx-1" />
                                <span className="font-medium text-slate-700">Tenders</span>
                            </div>
                    {/* ... Section Header mein koi badlav nahi ... */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Government Sector Tenders We Handle</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            As authorized tender rights holders, we manage various types of advertising tenders across Railway,
                            Municipal Corporations, Nagar Palika, and other government sectors throughout India.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* ... Loading, Error, Empty states mein koi badlav nahi ... */}
                        {loading && Array.from({ length: 6 }).map((_, index) => <TenderCardSkeleton key={index} />)}
                        {/* ... */}
                        
                        {!loading && !error && activeTenders.map((tender) => (
                            <div
                                key={tender._id}
                                className="bg-white flex flex-col p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-red-500"
                            >
                                {/* Main content area jo expand hogi */}
                                <div className="flex-grow">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        tender.sector === "Railway" ? "bg-red-100 text-red-600"
                                        : tender.sector === "Municipal" ? "bg-blue-100 text-blue-600"
                                        : tender.sector === "Government" ? "bg-green-100 text-green-600"
                                        : "bg-purple-100 text-purple-600"
                                    }`}>
                                        {tender.sector}
                                    </span>
                                    
                                    <h3 className="text-xl font-bold text-slate-900 my-3">{tender.title}</h3>
                                    
                                    {/* Client aur Due Date ke liye metadata section */}
                                    <div className="flex items-center gap-4 text-sm text-slate-500 border-y py-3 mb-4">
                                        <div className="flex items-center">
                                            <BuildingOffice2Icon className="w-4 h-4 mr-2"/>
                                            <span>{tender.client}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <CalendarDaysIcon className="w-4 h-4 mr-2"/>
                                            <span className="font-semibold">{formatDate(tender.dueDate)}</span>
                                        </div>
                                    </div>

                                    <p className="text-slate-600 mb-5 text-sm leading-relaxed line-clamp-3">{tender.description}</p>
                                    
                                    <ul className="space-y-2">
                                        {tender.features.slice(0, 2).map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center text-sm">
                                                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                                <span className="text-slate-700">{feature}</span>
                                            </li>
                                        ))}
                                        {tender.features.length > 2 && (
                                            <li className="text-sm text-slate-500 pl-7">
                                                + {tender.features.length - 2} more features...
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                
                                {/* Button hamesha neeche rahega */}
                                <div className="mt-6 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => handleViewDetails(tender)}
                                        className="w-full text-center bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ... Baaki sabhi sections waise hi rahenge ... */}
                </div>
            </section>

            <TenderDetailsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                tender={selectedTender}
            />
        </>
    );
};

export default TendersSection;