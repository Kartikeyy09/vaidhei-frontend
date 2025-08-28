// src/components/JourneySection.jsx

import { BuildingOffice2Icon, StarIcon, TrophyIcon, RocketLaunchIcon, CubeTransparentIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const journeyData = [
    // Your rich data with outcomes and high-quality image URLs
    { year: "2008", title: "The Spark of an Idea", description: "Vaidehi Enterprises was founded on a simple yet powerful principle: to bring unparalleled integrity, quality, and reliability to India's public sector infrastructure projects.", outcomes: ["Established core company values.", "Built a foundational team of experts.", "Secured initial local municipal contracts."], icon: StarIcon, imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" },
    { year: "2012", title: "Forging a Reputation", description: "Securing our first major tender with Indian Railways was a watershed moment. It tested our limits and proved our capability to deliver complex projects on time and on budget.", outcomes: ["Successfully entered the national railway sector.", "Expanded operational capacity by 200%.", "Set a new benchmark for project delivery speed."], icon: BuildingOffice2Icon, imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" },
    { year: "2018", title: "Commitment to Excellence", description: "Achieving ISO 9001:2015 certification wasn't just about a credential. It was the formalization of our obsession with quality and a promise of excellence to every client.", outcomes: ["Achieved internationally recognized quality standard.", "Streamlined all internal operational processes.", "Increased client trust and eligibility for larger tenders."], icon: TrophyIcon, imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop" },
    { year: "2023", title: "A New Era of Growth", description: "After successfully completing over 500 projects, we began a strategic pivot, leveraging our proven expertise to conquer new challenges in the private sector.", outcomes: ["Crossed the 500+ completed projects milestone.", "Initiated first strategic private sector partnership.", "Diversified service offerings into new industries."], icon: RocketLaunchIcon, imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" },
];

// --- Milestone Card (The rich "Dossier" on the right) ---
const MilestoneCard = ({ item, index, setActiveIndex, isActive }) => {
    const { ref } = useInView({
        threshold: 0.5,
        onChange: (inView) => { if (inView) { setActiveIndex(index); } },
    });

    return (
        <div ref={ref} className={`py-5 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40 lg:opacity-30'}`}>
            <div className="bg-slate-50 p-8 rounded-2xl  border border-gray-200">
                <div className="flex items-center gap-x-4">
                    <item.icon className="w-10 h-10 text-red-500" />
                    <div>
                        <span className="text-xl font-black text-red-600">{item.year}</span>
                        <h3 className="text-3xl font-extrabold text-slate-900 leading-tight">{item.title}</h3>
                    </div>
                </div>
                <p className="mt-6 text-lg text-slate-600 leading-relaxed border-t border-gray-200 pt-6">{item.description}</p>
                <div className="mt-6">
                    <h4 className="text-lg font-bold text-slate-700">Key Outcomes:</h4>
                    <ul className="mt-3 space-y-2">
                        {item.outcomes.map((outcome, i) => (
                            <li key={i} className="flex items-center">
                                <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                                <span className="text-slate-700">{outcome}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};


// --- Sticky Visuals (THE FINAL, PERFECTED VERSION) ---
const StickyVisuals = ({ activeIndex }) => {
    const progressPercentage = activeIndex >= 0 ? ((activeIndex + 1) / journeyData.length) * 100 : 0;

    return (
        <div className="relative w-full h-screen flex items-center justify-center">
            {/* The Cinematic, Full-Screen Background Image Layer */}
            <div className="absolute inset-0 w-full h-full">
                {journeyData.map((item, index) => (
                    <img key={index} src={item.imageUrl} alt={item.title} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${activeIndex === index ? 'opacity-80' : 'opacity-0'}`} />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
            </div>

            {/* The "Floating" Glassmorphism Info Card Layer */}
            <div className="relative z-10 w-full max-w-md p-8 text-center  backdrop-blur-md rounded-3xl">
                <div className="relative w-40 h-40 mx-auto">
                    {journeyData.map((item, index) => (
                         <h2 key={index} className={`absolute inset-0 flex items-center justify-center text-7xl font-black text-slate-800 transition-all duration-300 ease-out ${activeIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-125'}`}>
                            {item.year}
                         </h2>
                    ))}
                </div>
                <div className="mt-4 w-48 h-1.5 bg-gray-300/50 rounded-full mx-auto">
                    <div className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-300 ease-out" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </div>
        </div>
    );
};


// --- Main Journey Section Component ---
const JourneySection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section id="journey" className="relative bg-white">
            <div className="text-center pt-8 pb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Our Defining Moments
                </h2>
                <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                    Scroll to witness the evolution of our commitment, innovation, and impact.
                </p>
            </div>
            <div className="relative container mx-auto lg:grid lg:grid-cols-2 lg:gap-x-24">
                <div className="lg:sticky lg:top-0 h-screen">
                   <StickyVisuals activeIndex={activeIndex} />
                </div>
                <div className="relative">
                    {journeyData.map((item, index) => (
                        <MilestoneCard 
                            key={index}
                            item={item}
                            index={index}
                            setActiveIndex={setActiveIndex}
                            isActive={index === activeIndex}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JourneySection;