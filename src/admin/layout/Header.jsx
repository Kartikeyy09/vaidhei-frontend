import { Bars3Icon } from "@heroicons/react/24/solid";

const Header = ({ setIsSidebarOpen }) => {
    return (
        <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Hamburger Menu for mobile */}
                    <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-slate-600">
                        <Bars3Icon className="w-6 h-6" />
                    </button>
                    
                    {/* This div is a spacer on mobile and hidden on desktop */}
                    <div className="lg:hidden"></div>

                    {/* Right side of header */}
                    <div className="flex items-center gap-4">
                        <span className="font-semibold text-slate-700">Admin User</span>
                        <img 
                            className="w-10 h-10 rounded-full" 
                            src="https://ui-avatars.com/api/?name=Admin+User&background=random" 
                            alt="Admin Avatar" 
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;