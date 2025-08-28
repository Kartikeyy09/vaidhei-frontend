const StatsCard = ({ title, value, icon: Icon, color }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
            </div>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${color}`}>
                <Icon className="w-8 h-8 text-white" />
            </div>
        </div>
    );
};

export default StatsCard;