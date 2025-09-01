import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-red-600 to-pink-500 rounded-2xl shadow-2xl p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                    Ready to Start Your Next Project?
                </h2>
                <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
                    Let's discuss how our expertise in public sector tenders can help you achieve your goals. Our team is ready to provide a free, no-obligation consultation.
                </p>
                <div className="mt-8">
                    <button
                        onClick={() => navigate("/contact")}
                        className="inline-block bg-white text-red-600 px-10 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-lg"
                    >
                        Get a Free Consultation
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default CTASection;