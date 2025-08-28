// src/admin/pages/DashboardHome.jsx

import { Link } from "react-router-dom";
import StatsCard from "../components/StatsCard";
import { 
    MapIcon, 
    CheckCircleIcon, 
    CogIcon, 
    EnvelopeIcon, 
    PlusIcon, 
    ArrowTopRightOnSquareIcon 
} from "@heroicons/react/24/solid";

// --- MOCK DATA (In a real app, this would be fetched from your API) ---
const dashboardData = {
    stats: {
        journeyMilestones: 4,
        projectsCompleted: "500+",
        servicesOffered: 12,
        newInquiries: 3, // New unread inquiries
    },
    recentMilestones: [
        { id: 4, year: "2023", title: "A New Era of Growth" },
        { id: 3, year: "2018", title: "Commitment to Excellence" },
    ],
    recentInquiries: [
        { id: 1, name: "Rohan Sharma", subject: "Quote for Railway Tender", unread: true },
        { id: 2, name: "Priya Desai", subject: "Partnership Opportunity", unread: true },
        { id: 3, name: "Amit Patel", subject: "Service Question", unread: true },
        { id: 4, name: "Sunita Rao", subject: "Previous Project Follow-up", unread: false },
    ],
    analytics: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        projects: [12, 19, 3, 5, 2, 3],
        inquiries: [20, 30, 25, 35, 15, 22],
    }
};

const DashboardHome = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Welcome back, Admin!</h1>
                <p className="text-slate-500 mt-1">Here's a snapshot of your website's activity.</p>
            </div>
            
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Journey Milestones" value={dashboardData.stats.journeyMilestones} icon={MapIcon} color="bg-red-500" />
                <StatsCard title="Projects Completed" value={dashboardData.stats.projectsCompleted} icon={CheckCircleIcon} color="bg-green-500" />
                <StatsCard title="Services Offered" value={dashboardData.stats.servicesOffered} icon={CogIcon} color="bg-blue-500" />
                <StatsCard title="New Inquiries" value={dashboardData.stats.newInquiries} icon={EnvelopeIcon} color="bg-yellow-500" />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column (Wider) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Recent Inquiries */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-slate-800">Recent Inquiries</h2>
                            <Link to="/admin/inquiries" className="text-sm font-semibold text-red-600 hover:underline">View all</Link>
                        </div>
                        <ul className="divide-y divide-gray-200">
                            {dashboardData.recentInquiries.map(inquiry => (
                                <li key={inquiry.id} className="py-3 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {inquiry.unread && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0"></div>}
                                        <div>
                                            <p className="font-semibold text-slate-700">{inquiry.name}</p>
                                            <p className="text-sm text-slate-500">{inquiry.subject}</p>
                                        </div>
                                    </div>
                                    <button className="text-slate-400 hover:text-red-600">
                                        <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Analytics Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold text-slate-800">Projects vs. Inquiries</h2>
                        <div className="mt-4 h-64 flex items-end gap-4">
                            {/* This is a mock chart. A real one would use a library like Chart.js */}
                            {dashboardData.analytics.labels.map((label, index) => (
                                <div key={label} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full flex items-end gap-1 h-full">
                                        <div className="w-1/2 bg-blue-200 rounded-t-md" style={{height: `${dashboardData.analytics.inquiries[index] * 2}px`}}></div>
                                        <div className="w-1/2 bg-red-200 rounded-t-md" style={{height: `${dashboardData.analytics.projects[index] * 4}px`}}></div>
                                    </div>
                                    <span className="text-xs font-medium text-slate-500">{label}</span>
                                </div>
                            ))}
                        </div>
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
                        </div>
                    </div>

                    {/* Recent Milestones */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-slate-800">Recent Milestones</h2>
                            <Link to="/admin/journey" className="text-sm font-semibold text-red-600 hover:underline">Manage</Link>
                        </div>
                        <ul className="space-y-4">
                             {dashboardData.recentMilestones.map(milestone => (
                                <li key={milestone.id}>
                                    <span className="text-sm font-bold text-red-600">{milestone.year}</span>
                                    <p className="font-semibold text-slate-700">{milestone.title}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;