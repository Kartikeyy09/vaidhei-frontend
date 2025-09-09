import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import StatsCard from "../components/StatsCard";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import { useNavigate } from "react-router-dom";
import {
    MapIcon,
    CheckCircleIcon,
    CogIcon,
    EnvelopeIcon,
    PlusIcon,
    ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/solid";

import { fetchDashboardStatsAsync, selectDashboard } from "../../features/adminSlice/Dashboard/DashboardSlice";
import { fetchAnalyticsDataAsync, selectAnalytics } from "../../features/adminSlice/analytics/analyticsSlice";

// --- SKELETON LOADER COMPONENT ---
// This component mimics the entire dashboard layout with pulsing placeholders.
const DashboardSkeleton = () => (
    <div className="space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div>
            <div className="h-8 w-1/3 bg-slate-200 rounded-md"></div>
            <div className="h-4 w-1/2 bg-slate-200 rounded-md mt-2"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md h-32">
                    <div className="h-4 w-1/2 bg-slate-200 rounded-md"></div>
                    <div className="h-8 w-1/3 bg-slate-200 rounded-md mt-3"></div>
                </div>
            ))}
        </div>

        {/* Main Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* Inquiries Card Skeleton */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="h-6 w-1/3 bg-slate-200 rounded-md mb-4"></div>
                    <div className="space-y-3">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-10 bg-slate-100 rounded-md"></div>
                        ))}
                    </div>
                </div>
                {/* Analytics Chart Skeleton */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="h-6 w-1/2 bg-slate-200 rounded-md"></div>
                    <div className="h-64 mt-4 bg-slate-200 rounded-md"></div>
                </div>
            </div>
            <div className="lg:col-span-1 space-y-8">
                {/* Quick Actions Skeleton */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="h-6 w-1/2 bg-slate-200 rounded-md mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-12 bg-slate-100 rounded-lg"></div>
                        <div className="h-12 bg-slate-100 rounded-lg"></div>
                        <div className="h-12 bg-slate-100 rounded-lg"></div>
                    </div>
                </div>
                {/* Milestones Skeleton */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="h-6 w-2/3 bg-slate-200 rounded-md mb-4"></div>
                    <div className="space-y-4">
                        <div className="h-5 w-full bg-slate-100 rounded-md"></div>
                        <div className="h-5 w-5/6 bg-slate-100 rounded-md"></div>
                        <div className="h-5 w-full bg-slate-100 rounded-md"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


const DashboardHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { stats, recentMilestones, recentInquiries, loading, error } = useSelector(selectDashboard);
    const { chartData, status: analyticsStatus, error: analyticsError } = useSelector(selectAnalytics);

    useEffect(() => {
        // Fetch data only if it hasn't been fetched yet
        if (!stats.journeyMilestones) { // A simple check to prevent re-fetching on navigation
             dispatch(fetchDashboardStatsAsync());
        }
        if (analyticsStatus === 'idle') {
             dispatch(fetchAnalyticsDataAsync());
        }
    }, [dispatch, stats, analyticsStatus]);

    // When the main dashboard data is loading, show the full-page skeleton.
    if (loading) {
        return <DashboardSkeleton />;
    }

    // Handle a critical error if the main dashboard data fails.
    if (error) {
        return (
            <div className="bg-red-50 p-6 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-red-700">Oops! Something went wrong.</h3>
                <p className="text-red-600 mt-1">Failed to load dashboard data. Please try again later.</p>
                <p className="text-sm text-red-500 mt-2">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Welcome back, Admin!</h1>
                <p className="text-slate-500 mt-1">Here's a snapshot of your website's activity.</p>
            </div>
            
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Journey Milestones" value={stats.journeyMilestones ?? 0} icon={MapIcon} color="bg-red-500" />
                <StatsCard title="Total Projects" value={stats.projectsCompleted ?? 0} icon={CheckCircleIcon} color="bg-green-500" />
                <StatsCard title="Services Offered" value={stats.servicesOffered ?? 0} icon={CogIcon} color="bg-blue-500" />
                <StatsCard title="New Inquiries" value={stats.newInquiries ?? 0} icon={EnvelopeIcon} color="bg-yellow-500" />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2 space-y-8">
                    {/* Recent Inquiries Card */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-slate-800">Recent Inquiries</h2>
                            <Link to="/admin/inquiries" className="text-sm font-semibold text-red-600 hover:underline">View all</Link>
                        </div>
                        <ul className="divide-y divide-gray-200">
                            {recentInquiries?.length > 0 ? recentInquiries.map(inquiry => (
                                <li key={inquiry._id} className="py-3 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {inquiry.status === 'New' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0 animate-pulse" title="New Inquiry"></div>}
                                        <div><p className="font-semibold text-slate-700">{inquiry.name}</p><p className="text-sm text-slate-500 line-clamp-1">{inquiry.subject}</p></div>
                                    </div>
                                    {/* <Link to={`/admin/inquiries/${inquiry._id}`} className="text-slate-400 hover:text-red-600 p-1" title="View Inquiry"><ArrowTopRightOnSquareIcon className="w-5 h-5" /></Link> */}
                                </li>
                            )) : (<p className="text-center text-slate-500 py-4">No recent inquiries found.</p>)}
                        </ul>
                    </div>

                    {/* Analytics Chart Card */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex justify-between items-center">
                           <h2 className="text-xl font-semibold text-slate-800">Daily Inquiry Momentum</h2>
                           <Link to="/admin/analytics" className="text-sm font-semibold text-red-600 hover:underline">View Details</Link>
                        </div>
                        {analyticsStatus === 'loading' && <div className="h-64 mt-4 bg-slate-100 rounded-md flex items-center justify-center text-slate-500">Loading Chart...</div>}
                        {analyticsStatus === 'failed' && <div className="h-64 mt-4 bg-red-50 rounded-md flex items-center justify-center text-red-500">Error: {analyticsError}</div>}
                        {analyticsStatus === 'succeeded' && <AnalyticsChart data={chartData} />}
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-8">
                     {/* Quick Actions & Milestones */}
                     <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link to="/admin/invoice-generator"className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-100 hover:bg-red-100 transition-colors"><PlusIcon className="w-5 h-5 text-red-600"/><span className="font-semibold text-slate-700">Add New Invoice</span ></Link>
                            <Link to="/admin/journey" className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-100 hover:bg-red-100 transition-colors"><PlusIcon className="w-5 h-5 text-red-600"/><span className="font-semibold text-slate-700">Add New Milestone</span></Link>
                            <Link to="/admin/projects" className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-100 hover:bg-green-100 transition-colors"><PlusIcon className="w-5 h-5 text-green-600"/><span className="font-semibold text-slate-700">Add New Project</span></Link>
                            <Link to="/admin/tenders" className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-100 hover:bg-blue-100 transition-colors"><PlusIcon className="w-5 h-5 text-blue-600"/><span className="font-semibold text-slate-700">Add New Tender</span></Link>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-slate-800">Recent Milestones</h2>
                            <Link to="/admin/journey" className="text-sm font-semibold text-red-600 hover:underline">Manage</Link>
                        </div>
                        <ul className="space-y-4">
                             {recentMilestones?.length > 0 ? recentMilestones.map(milestone => (
                                <li key={milestone._id}><span className="text-sm font-bold text-red-600">{milestone.year}</span><p className="font-semibold text-slate-700 line-clamp-1">{milestone.title}</p></li>
                            )) : (<p className="text-center text-slate-500 py-4">No recent milestones added.</p>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;