// ✅ FILE: src/admin/pages/DashboardHome.jsx

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import StatsCard from "../components/StatsCard"; // Assuming this is a reusable component
import { 
    MapIcon, 
    CheckCircleIcon, 
    CogIcon, 
    EnvelopeIcon, 
    PlusIcon, 
    ArrowTopRightOnSquareIcon 
} from "@heroicons/react/24/solid";
import { fetchDashboardStatsAsync, selectDashboard } from "../../features/adminSlice/Dashboard/DashboardSlice";

const DashboardHome = () => {
    const dispatch = useDispatch();
    // Redux store se live data aur loading/error states ko fetch karein
    const { stats, recentMilestones, recentInquiries, loading, error } = useSelector(selectDashboard);

    // Component ke mount hone par dashboard ka data fetch karein
    useEffect(() => {
        dispatch(fetchDashboardStatsAsync());
    }, [dispatch]);

    // Loading state ko handle karein
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-slate-500">Loading Dashboard Data...</p>
            </div>
        );
    }

    // Error state ko handle karein
    if (error) {
        return (
            <div className="bg-red-50 p-6 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-red-700">Failed to load dashboard</h3>
                <p className="text-red-600 mt-1">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Welcome back, Admin!</h1>
                <p className="text-slate-500 mt-1">Here's a snapshot of your website's activity.</p>
            </div>
            
            {/* Stats Cards Grid - Live Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Journey Milestones" value={stats.journeyMilestones ?? 0} icon={MapIcon} color="bg-red-500" />
                <StatsCard title="Total Projects" value={stats.projectsCompleted ?? 0} icon={CheckCircleIcon} color="bg-green-500" />
                <StatsCard title="Services Offered" value={stats.servicesOffered ?? 0} icon={CogIcon} color="bg-blue-500" />
                <StatsCard title="New Inquiries" value={stats.newInquiries ?? 0} icon={EnvelopeIcon} color="bg-yellow-500" />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column (Wider) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Recent Inquiries - Live Data */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-slate-800">Recent Inquiries</h2>
                            <Link to="/admin/inquiries" className="text-sm font-semibold text-red-600 hover:underline">View all</Link>
                        </div>
                        <ul className="divide-y divide-gray-200">
                            {recentInquiries?.length > 0 ? recentInquiries.map(inquiry => (
                                <li key={inquiry._id} className="py-3 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {inquiry.status === 'New' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0 animate-pulse"></div>}
                                        <div>
                                            <p className="font-semibold text-slate-700">{inquiry.name}</p>
                                            <p className="text-sm text-slate-500 line-clamp-1">{inquiry.subject}</p>
                                        </div>
                                    </div>
                                    <Link to="/admin/inquiries" className="text-slate-400 hover:text-red-600 p-1">
                                        <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                                    </Link>
                                </li>
                            )) : (
                                <p className="text-center text-slate-500 py-4">No recent inquiries.</p>
                            )}
                        </ul>
                    </div>

                    {/* Analytics Chart (Placeholder) */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold text-slate-800">Analytics Overview</h2>
                        <p className="text-slate-500 mt-4 text-center">Analytics chart will be integrated here.</p>
                    </div>
                </div>

                {/* Right Column (Narrower) */}
                <div className="lg:col-span-1 space-y-8">
                     {/* Quick Actions */}
                     <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link to="/admin/journey" className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-100 hover:bg-red-100 transition-colors">
                                <PlusIcon className="w-5 h-5 text-red-600"/>
                                <span className="font-semibold text-slate-700">Add New Milestone</span>
                            </Link>
                             <Link to="/admin/projects" className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-100 hover:bg-green-100 transition-colors">
                                <PlusIcon className="w-5 h-5 text-green-600"/>
                                <span className="font-semibold text-slate-700">Add New Project</span>
                            </Link>
                             <Link to="/admin/tenders" className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-100 hover:bg-blue-100 transition-colors">
                                <PlusIcon className="w-5 h-5 text-blue-600"/>
                                <span className="font-semibold text-slate-700">Add New Tender</span>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Milestones - Live Data */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-slate-800">Recent Milestones</h2>
                            <Link to="/admin/journey" className="text-sm font-semibold text-red-600 hover:underline">Manage</Link>
                        </div>
                        <ul className="space-y-4">
                             {recentMilestones?.length > 0 ? recentMilestones.map(milestone => (
                                <li key={milestone._id}>
                                    <span className="text-sm font-bold text-red-600">{milestone.year}</span>
                                    <p className="font-semibold text-slate-700 line-clamp-1">{milestone.title}</p>
                                </li>
                            )) : (
                                <p className="text-center text-slate-500 py-4">No milestones added yet.</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;