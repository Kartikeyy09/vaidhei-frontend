"use client";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleIcon, StarIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { fetchMilestonesAsync, selectManageJourney } from "../../features/adminSlice/ManageJourney/ManageJourneySlice";

const SERVER_URL = import.meta.env.VITE_BASE_URL;

// --- SKELETON LOADER COMPONENTS ---

// Skeleton for the sticky visual panel on the left
const StickyVisualsSkeleton = () => (
    <div className="relative w-full h-screen flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-slate-200"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        <div className="relative z-10 w-full max-w-md p-8 text-center">
            <div className="relative w-40 h-40 mx-auto bg-slate-300 rounded-full"></div>
            <div className="mt-4 w-48 h-1.5 bg-slate-300 rounded-full mx-auto"></div>
        </div>
    </div>
);

// Skeleton for a single milestone card on the right
const MilestoneCardSkeleton = () => (
    <div className="py-5">
        <div className="bg-slate-50 p-8 rounded-2xl border border-gray-200">
            <div className="flex items-center gap-x-4">
                <div className="w-10 h-10 bg-slate-200 rounded-md flex-shrink-0"></div>
                <div>
                    <div className="h-6 w-24 bg-slate-200 rounded-md"></div>
                    <div className="h-8 w-64 bg-slate-200 rounded-md mt-2"></div>
                </div>
            </div>
            <div className="mt-6 border-t border-gray-200 pt-6 space-y-2">
                <div className="h-4 w-full bg-slate-200 rounded-md"></div>
                <div className="h-4 w-full bg-slate-200 rounded-md"></div>
                <div className="h-4 w-5/6 bg-slate-200 rounded-md"></div>
            </div>
            <div className="mt-6">
                <div className="h-5 w-1/3 bg-slate-200 rounded-md"></div>
                <div className="mt-3 space-y-2">
                    <div className="h-4 w-full bg-slate-200 rounded-md"></div>
                    <div className="h-4 w-1/2 bg-slate-200 rounded-md"></div>
                </div>
            </div>
        </div>
    </div>
);

// The main skeleton component that assembles the layout
const JourneySectionSkeleton = () => (
    <section className="relative bg-white animate-pulse">
        <div className="text-center pt-8 pb-12">
            <div className="h-10 w-3/4 mx-auto bg-slate-200 rounded-md"></div>
            <div className="mt-4 h-5 w-1/2 mx-auto bg-slate-200 rounded-md"></div>
        </div>
        <div className="relative container mx-auto lg:grid lg:grid-cols-2 lg:gap-x-24">
            <div className="lg:sticky lg:top-0 h-screen">
                <StickyVisualsSkeleton />
            </div>
            <div className="relative space-y-4">
                {[...Array(3)].map((_, i) => (
                    <MilestoneCardSkeleton key={i} />
                ))}
            </div>
        </div>
    </section>
);


// --- Milestone Card ---
const MilestoneCard = ({ item, isActive }) => (
    <div className={`py-5 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-40 lg:opacity-30"}`}>
        <div className="bg-slate-50 p-8 rounded-2xl border border-gray-200">
            <div className="flex items-center gap-x-4">
                <StarIcon className="w-10 h-10 text-red-500" aria-hidden="true" />
                <div>
                    <span className="text-xl font-black text-red-600">{item.year}</span>
                    <h3 className="text-3xl font-extrabold text-slate-900 leading-tight">{item.title}</h3>
                </div>
            </div>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed border-t border-gray-200 pt-6">{item.description}</p>
            {item.outcomes && item.outcomes.length > 0 && (
                <div className="mt-6">
                    <h4 className="text-lg font-bold text-slate-700">Key Outcomes:</h4>
                    <ul className="mt-3 space-y-2">
                        {item.outcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start">
                            <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1" />
                            <span className="text-slate-700">{outcome}</span>
                        </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </div>
);

// --- Sticky Visuals ---
const StickyVisuals = ({ milestones, activeIndex }) => {
    const progressPercentage = milestones.length > 0 && activeIndex >= 0 ? ((activeIndex + 1) / milestones.length) * 100 : 0;
    return (
        <div className="relative w-full h-screen flex items-center justify-center">
            <div className="absolute inset-0 w-full h-full">
                {milestones.map((item, index) => (
                    <img key={item._id || index} src={`${SERVER_URL}${item.imageUrl}`} alt={item.title} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${activeIndex === index ? "opacity-80" : "opacity-0"}`} />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
            </div>
            <div className="relative z-10 w-full max-w-md p-8 text-center backdrop-blur-md rounded-3xl bg-white/1">
                <div className="relative w-40 h-40 mx-auto">
                    {milestones.map((item, index) => (
                        <h2 key={item._id || index} className={`absolute inset-0 flex items-center justify-center text-7xl font-black text-slate-800 transition-all duration-300 ease-out ${activeIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-125"}`}>{item.year}</h2>
                    ))}
                </div>
                <div className="mt-4 w-48 h-1.5 bg-gray-300/50 rounded-full mx-auto">
                    <div className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-300 ease-out" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---
const JourneySection = () => {
    const dispatch = useDispatch();
    const { data: milestones = [], loading, error } = useSelector(selectManageJourney);
    const [activeIndex, setActiveIndex] = useState(0);
    const milestoneRefs = useRef([]);

    useEffect(() => {
        if (milestones.length === 0) {
            dispatch(fetchMilestonesAsync());
        }
    }, [dispatch, milestones.length]);

    useEffect(() => {
        if (milestones.length === 0) return;
        const handleScroll = () => {
            const triggerPoint = window.innerHeight / 2;
            let newActiveIndex = 0;
            let closestDistance = Infinity;
            milestoneRefs.current.forEach((el, index) => {
                if (el) {
                    const rect = el.getBoundingClientRect();
                    const distance = Math.abs(rect.top - triggerPoint);
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        newActiveIndex = index;
                    }
                }
            });
            setActiveIndex(prevIndex => prevIndex !== newActiveIndex ? newActiveIndex : prevIndex);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [milestones]);

    // Conditional Rendering Logic with Skeleton
    if (loading && milestones.length === 0) {
        return <JourneySectionSkeleton />;
    }

    if (error) {
        return <div className="text-center py-20 text-red-600 bg-red-50 p-6">Error: {error}</div>;
    }

    if (!loading && milestones.length === 0) {
        return (
             <div className="text-center py-20 px-6 bg-slate-50">
                <PhotoIcon className="mx-auto h-16 w-16 text-slate-400" />
                <h3 className="mt-4 text-xl font-semibold text-slate-700">Our Journey is Being Written</h3>
                <p className="mt-2 text-base text-slate-500">
                    No milestones have been published yet. Please check back soon to see our story unfold.
                </p>
            </div>
        )
    }

    return (
        <section id="journey" className="relative bg-white">
            <div className="text-center pt-8 pb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Our Defining Moments</h2>
                <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                    Scroll to witness the evolution of our commitment, innovation, and impact.
                </p>
            </div>
            <div className="relative container mx-auto lg:grid lg:grid-cols-2 lg:gap-x-24">
                <div className="lg:sticky lg:top-0 h-screen">
                    <StickyVisuals milestones={milestones} activeIndex={activeIndex} />
                </div>
                <div className="relative">
                    {milestones.map((item, index) => (
                        <div key={item._id} ref={el => (milestoneRefs.current[index] = el)}>
                            <MilestoneCard item={item} isActive={index === activeIndex} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JourneySection;