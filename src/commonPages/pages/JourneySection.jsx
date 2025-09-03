import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleIcon , StarIcon } from "@heroicons/react/24/solid";
import { fetchMilestonesAsync, selectManageJourney } from "../../features/adminSlice/ManageJourney/ManageJourneySlice";

const SERVER_URL =  "http://localhost:3000"; // Backend URL

// --- Milestone Card ---
const MilestoneCard = ({ item, index, setActiveIndex, isActive }) => {
  return (
    <div
      className={`py-5 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-40 lg:opacity-30"}`}
    >
      <div className="bg-slate-50 p-8 rounded-2xl border border-gray-200">
        <div className="flex items-center gap-x-4">
          {/* <img src={`${SERVER_URL}/${item.icon}`} alt="" className="w-10 h-10 text-red-500" /> server URL */}
          < StarIcon className={`w-10 h-10 text-red-500 `|| StarIcon} aria-hidden="true"/>
          <div>
            <span className="text-xl font-black text-red-600">{item.year}</span>
            <h3 className="text-3xl font-extrabold text-slate-900 leading-tight">{item.title}</h3>
          </div>
        </div>
        <p className="mt-6 text-lg text-slate-600 leading-relaxed border-t border-gray-200 pt-6">{item.description}</p>
        <div className="mt-6">
          <h4 className="text-lg font-bold text-slate-700">Key Outcomes:</h4>
          <ul className="mt-3 space-y-2">
            {item.outcomes?.map((outcome, i) => (
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

// --- Sticky Visuals ---
const StickyVisuals = ({ milestones, activeIndex }) => {
  const progressPercentage = activeIndex >= 0 ? ((activeIndex + 1) / milestones.length) * 100 : 0;

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full">
        {milestones.map((item, index) => (
          <img
            key={index}
            src={`${SERVER_URL}/${item.imageUrl}`} // server URL added
            alt={item.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              activeIndex === index ? "opacity-80" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
      </div>
      <div className="relative z-10 w-full max-w-md p-8 text-center backdrop-blur-md rounded-3xl">
        <div className="relative w-40 h-40 mx-auto">
          {milestones.map((item, index) => (
            <h2
              key={index}
              className={`absolute inset-0 flex items-center justify-center text-7xl font-black text-slate-800 transition-all duration-300 ease-out ${
                activeIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-125"
              }`}
            >
              {item.year}
            </h2>
          ))}
        </div>
        <div className="mt-4 w-48 h-1.5 bg-gray-300/50 rounded-full mx-auto">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
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

  useEffect(() => {
    if (milestones.length === 0) dispatch(fetchMilestonesAsync());
  }, [dispatch, milestones.length]);

  if (loading) return <div className="text-center py-20">Loading milestones...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

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
            <MilestoneCard
              key={item._id}
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
