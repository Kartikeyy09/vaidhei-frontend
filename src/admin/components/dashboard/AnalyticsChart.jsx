import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from '@heroicons/react/24/solid';

const COLORS = {
  increase: '#22c55e', // green-500
  decrease: '#ef4444', // red-500
  neutral: '#94a3b8',  // slate-400
  averageLine: '#a855f7', // purple-500
};

// Premium Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-3 bg-white rounded-lg shadow-xl border border-slate-200">
        <p className="text-xs font-semibold text-slate-500">{data.fullDate}</p>
        <div className="mt-1 flex items-center gap-2">
          <div style={{ backgroundColor: data.color }} className="w-2.5 h-2.5 rounded-full"></div>
          <p className="text-base font-bold text-slate-800">
            {data.inquiries} Inquiries
          </p>
        </div>
      </div>
    );
  }
  return null;
};

// Summary Stat Component
const Stat = ({ title, value, icon, color }) => (
  <div className="flex-1 p-3 bg-slate-50 rounded-lg">
    <div className="flex items-center">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500">{title}</p>
        <p className="text-lg font-bold text-slate-800">{value}</p>
      </div>
    </div>
  </div>
);

const AnalyticsChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="mt-4 h-[350px] flex flex-col items-center justify-center bg-slate-50 rounded-lg">
        <p className="font-semibold text-slate-600">Loading Data...</p>
      </div>
    );
  }

  // Calculate summary stats
  const totalInquiries = data.reduce((sum, item) => sum + item.inquiries, 0);
  const averageInquiries = totalInquiries > 0 ? (totalInquiries / data.length).toFixed(1) : 0;
  const peakDay = data.reduce((peak, day) => day.inquiries > peak.inquiries ? day : peak, data[0]);

  return (
    <div className="mt-4 space-y-4">
      {/* --- SUMMARY STATS --- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Stat 
          title="Total This Week" 
          value={totalInquiries}
          icon={<span className="font-bold text-lg text-blue-800">Σ</span>}
          color="bg-blue-100"
        />
        <Stat 
          title="Daily Average" 
          value={averageInquiries}
          icon={<MinusIcon className="w-4 h-4 text-purple-800" />}
          color="bg-purple-100"
        />
        <Stat 
          title="Peak Day" 
          value={`${peakDay.name} (${peakDay.inquiries})`}
          icon={<ArrowUpIcon className="w-4 h-4 text-green-800" />}
          color="bg-green-100"
        />
      </div>

      {/* --- THE CHART --- */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} 
              axisLine={false} 
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#94a3b8', fontSize: 11 }} 
              axisLine={false} 
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(203, 213, 225, 0.3)' }} />

            {/* A reference line for the average */}
            <ReferenceLine 
              y={averageInquiries} 
              label={{ value: 'Avg', position: 'insideTopLeft', fill: COLORS.averageLine, fontSize: 10, dy: -5 }}
              stroke={COLORS.averageLine} 
              strokeDasharray="3 3" 
            />
            
            <Bar dataKey="inquiries" radius={[5, 5, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;