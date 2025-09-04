import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import StatsCard from "../components/StatsCard";
import AnalyticsChart from "../components/Dashboard/AnalyticsChart";
import {
    MapIcon,
    CheckCircleIcon,
    CogIcon,
    EnvelopeIcon,
    PlusIcon,
    ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/solid";

// Import actions and selectors from BOTH slices for a clean, modular approach
import { fetchDashboardStatsAsync, selectDashboard } from "../../features/adminSlice/Dashboard/DashboardSlice";
import { fetchAnalyticsDataAsync, selectAnalytics } from "../../features/adminSlice/analytics/analyticsSlice";

const DashboardHome = () => {
    const dispatch = useDispatch();

    // Data for stats cards and lists from the dashboard slice
    const { stats, recentMilestones, recentInquiries, loading, error } = useSelector(selectDashboard);
    
    // Data specifically for the chart from the analytics slice
    const { chartData, status: analyticsStatus, error: analyticsError } = useSelector(selectAnalytics);

    // Fetch data from BOTH endpoints when the component mounts
    useEffect(() => {
        dispatch(fetchDashboardStatsAsync());
        dispatch(fetchAnalyticsDataAsync());
    }, [dispatch]);

    // Handle the primary loading state for the main dashboard content (cards, lists)
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen -mt-16">
                <div className="text-center">
                    <p className="text-lg font-semibold text-slate-600">Loading Dashboard...</p>
                    <p className="text-slate-500">Fetching the latest data for you.</p>
                </div>
            </div>
        );
    }

    // Handle a critical error if the main dashboard data fails to load
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
            
            {/* Stats Cards Grid - Data from dashboardSlice */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Journey Milestones" value={stats.journeyMilestones ?? 0} icon={MapIcon} color="bg-red-500" />
                <StatsCard title="Total Projects" value={stats.projectsCompleted ?? 0} icon={CheckCircleIcon} color="bg-green-500" />
                <StatsCard title="Services Offered" value={stats.servicesOffered ?? 0} icon={CogIcon} color="bg-blue-500" />
                <StatsCard title="New Inquiries" value={stats.newInquiries ?? 0} icon={EnvelopeIcon} color="bg-yellow-500" />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2 space-y-8">
                    {/* Recent Inquiries Card - Data from dashboardSlice */}
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
                                    <Link to={`/admin/inquiries/${inquiry._id}`} className="text-slate-400 hover:text-red-600 p-1" title="View Inquiry"><ArrowTopRightOnSquareIcon className="w-5 h-5" /></Link>
                                </li>
                            )) : (<p className="text-center text-slate-500 py-4">No recent inquiries found.</p>)}
                        </ul>
                    </div>

                    {/* Analytics Chart Card - Data from analyticsSlice */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex justify-between items-center">
                           <h2 className="text-xl font-semibold text-slate-800">Daily Inquiry Momentum</h2>
                           <Link to="/admin/analytics" className="text-sm font-semibold text-red-600 hover:underline">View Details</Link>
                        </div>
                        {/* Handle the specific loading/error state for the chart for a better user experience */}
                        {analyticsStatus === 'loading' && <p className="text-center h-64 flex items-center justify-center text-slate-500">Loading Chart...</p>}
                        {analyticsStatus === 'failed' && <p className="text-center h-64 flex items-center justify-center text-red-500">Error loading chart: {analyticsError}</p>}
                        {analyticsStatus === 'succeeded' && <AnalyticsChart data={chartData} />}
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-8">
                     {/* Quick Actions & Milestones - Data from dashboardSlice */}
                     <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link to="/admin/journey/add" className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-100 hover:bg-red-100 transition-colors"><PlusIcon className="w-5 h-5 text-red-600"/><span className="font-semibold text-slate-700">Add New Milestone</span></Link>
                            <Link to="/admin/projects/add" className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-100 hover:bg-green-100 transition-colors"><PlusIcon className="w-5 h-5 text-green-600"/><span className="font-semibold text-slate-700">Add New Project</span></Link>
                            <Link to="/admin/tenders/add" className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-100 hover:bg-blue-100 transition-colors"><PlusIcon className="w-5 h-5 text-blue-600"/><span className="font-semibold text-slate-700">Add New Tender</span></Link>
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