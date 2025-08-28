import { NavLink } from "react-router-dom";
import { 
    HomeIcon, 
    MapIcon, 
    Cog6ToothIcon, 
    XMarkIcon,
    BriefcaseIcon,
    FolderIcon,
    PhotoIcon,
    ClipboardDocumentListIcon,
    ChatBubbleBottomCenterTextIcon,
    EnvelopeIcon
} from "@heroicons/react/24/solid";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const navLinkClasses = "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors";
    const activeClass = "bg-red-600 text-white font-semibold";
    const inactiveClass = "text-slate-600 hover:bg-slate-200";

    const navItems = [
        {
            group: "Main",
            items: [
                { to: "/admin", end: true, icon: HomeIcon, label: "Dashboard" },
                { to: "/admin/journey", icon: MapIcon, label: "Manage Journey" },
            ]
        },
        {
            group: "Content Management",
            items: [
                { to: "/admin/services", icon: BriefcaseIcon, label: "Manage Services" },
                { to: "/admin/projects", icon: FolderIcon, label: "Manage Projects" },
                { to: "/admin/gallery", icon: PhotoIcon, label: "Manage Gallery" },
            ]
        },
        {
            group: "Business",
            items: [
                { to: "/admin/tenders", icon: ClipboardDocumentListIcon, label: "Manage Tenders" },
                { to: "/admin/testimonials", icon: ChatBubbleBottomCenterTextIcon, label: "Manage Testimonials" },
                { to: "/admin/inquiries", icon: EnvelopeIcon, label: "Contact Inquiries" },
            ]
        }
    ];

    return (
        <>
            {/* Overlay for mobile */}
            <div 
                className={`fixed inset-0 bg-black/60 z-30 lg:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 flex flex-col transition-transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 flex justify-between items-center flex-shrink-0">
                    <h1 className="text-2xl font-bold text-slate-800">Vaidehi Admin</h1>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-500 hover:text-slate-800">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                
                <nav className="p-4 flex-grow overflow-y-auto">
                    {navItems.map((navGroup, groupIndex) => (
                        <div key={groupIndex} className={groupIndex > 0 ? 'mt-4' : ''}>
                            <h3 className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">{navGroup.group}</h3>
                            <ul className="space-y-1">
                                {navGroup.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        <NavLink 
                                            to={item.to} 
                                            end={item.end} 
                                            className={({ isActive }) => `${navLinkClasses} ${isActive ? activeClass : inactiveClass}`}
                                            onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile nav click
                                        >
                                            <item.icon className="w-6 h-6 flex-shrink-0" />
                                            {item.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>

                {/* Settings link at the bottom */}
                <div className="p-4 border-t border-gray-200 flex-shrink-0">
                    <NavLink to="/admin/settings" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeClass : inactiveClass}`}>
                        <Cog6ToothIcon className="w-6 h-6" />
                        Settings
                    </NavLink>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;