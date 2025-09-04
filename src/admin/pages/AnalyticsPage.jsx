import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnalyticsDataAsync, selectAnalytics } from '../../features/adminSlice/analytics/analyticsSlice';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine, PieChart, Pie, Legend } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon, ChartBarIcon, ClockIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

const COLORS = { increase: '#22c55e', decrease: '#ef4444', neutral: '#94a3b8', averageLine: '#a855f7' };
const PIE_COLORS = { 'New': '#3b82f6', 'Read': '#f97316', 'Completed': '#16a34a', 'Spam': '#64748b' };

const KpiCard = ({ title, value, change, icon: Icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <div className="flex items-center justify-between">
      <p className="text-sm font-semibold text-slate-500">{title}</p>
      <Icon className="w-6 h-6 text-slate-300" />
    </div>
    <p className="text-3xl font-bold text-slate-800 mt-2">{value}</p>
    {change && (
      <div className={`mt-1 flex items-center text-sm ${change.type === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
        {change.type === 'increase' ? <ArrowUpIcon className="w-4 h-4 mr-1" /> : <ArrowDownIcon className="w-4 h-4 mr-1" />}
        <span>{change.value}% from last week</span>
      </div>
    )}
  </div>
);

const AnalyticsPage = () => {
  const dispatch = useDispatch();
  const { chartData, rawInquiries, status, error } = useSelector(selectAnalytics);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAnalyticsDataAsync());
    }
  }, [status, dispatch]);

  const analyticsSummary = useMemo(() => {
    // Because rawInquiries is now initialized to [], this check is safe.
    if (!rawInquiries || rawInquiries.length === 0) {
      return { total: 0, change: 0, busiestDay: { name: 'N/A', inquiries: 0 }, pieData: [] };
    }
    const now = new Date();
    const last7Days = rawInquiries.filter(i => (now - new Date(i.createdAt || i.date)) / (1000 * 60 * 60 * 24) <= 7);
    const prev7Days = rawInquiries.filter(i => {
      const daysAgo = (now - new Date(i.createdAt || i.date)) / (1000 * 60 * 60 * 24);
      return daysAgo > 7 && daysAgo <= 14;
    });
    const total = last7Days.length;
    let change = 0;
    if (prev7Days.length > 0) {
      change = (((total - prev7Days.length) / prev7Days.length) * 100).toFixed(1);
    }
    const busiestDay = chartData.reduce((peak, day) => day.inquiries > peak.inquiries ? day : peak, { inquiries: 0, name: 'N/A' });
    const statusCounts = last7Days.reduce((acc, inquiry) => {
      const status = inquiry.status || 'New';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    const pieData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

    return { total, change, busiestDay, pieData };
  }, [rawInquiries, chartData]);

  if (status === 'loading' || status === 'idle') {
    return <div className="p-8 text-center text-slate-500">Loading Analytics...</div>;
  }
  if (status === 'failed') {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-8 p-4 md:p-8 bg-slate-50/70 min-h-full">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Inquiry Analytics</h1>
        <p className="text-slate-500 mt-1">An overview of inquiry trends and performance for the last 7 days.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KpiCard title="Total Inquiries (Last 7 Days)" value={analyticsSummary.total} change={{ value: analyticsSummary.change, type: analyticsSummary.change >= 0 ? 'increase' : 'decrease' }} icon={EnvelopeIcon} />
        <KpiCard title="Busiest Day" value={`${analyticsSummary.busiestDay.name} (${analyticsSummary.busiestDay.inquiries})`} icon={ChartBarIcon} />
        <KpiCard title="Avg. Daily Inquiries" value={(analyticsSummary.total / 7).toFixed(1)} icon={ClockIcon} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
           <h2 className="text-xl font-semibold text-slate-800">Daily Inquiry Momentum</h2>
           <AnalyticsChart data={chartData} />
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md flex flex-col">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Inquiries by Status</h2>
          <div className="flex-grow"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={analyticsSummary.pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>{analyticsSummary.pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name] || '#cccccc'} />))}</Pie><Tooltip /><Legend iconType="circle" /></PieChart></ResponsiveContainer></div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Inquiries Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
              <tr><th className="px-6 py-3">Name</th><th className="px-6 py-3">Subject</th><th className="px-6 py-3">Date</th><th className="px-6 py-3">Status</th></tr>
            </thead>
            <tbody>
              {rawInquiries.slice(0, 10).map(inquiry => (
                <tr key={inquiry._id} className="border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{inquiry.name}</td>
                  <td className="px-6 py-4 text-slate-600">{inquiry.subject}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(inquiry.createdAt || inquiry.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full`} style={{ color: PIE_COLORS[inquiry.status], backgroundColor: `${PIE_COLORS[inquiry.status]}20` }}>{inquiry.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          {rawInquiries.length === 0 && <p className="text-center py-8 text-slate-500">No inquiry data found.</p>}
        </div>
      </div>
    </div>
  );
};

// Tooltip needs to be defined for the chart to use it
const CustomBarTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-3 bg-white rounded-lg shadow-xl border border-slate-200">
        <p className="text-xs font-semibold text-slate-500">{data.fullDate}</p>
        <div className="mt-1 flex items-center gap-2">
          <div style={{ backgroundColor: data.color }} className="w-2.5 h-2.5 rounded-full"></div>
          <p className="text-base font-bold text-slate-800">{data.inquiries} Inquiries</p>
        </div>
      </div>
    );
  }
  return null;
};

const AnalyticsChart = ({ data }) => {
    const averageInquiries = data.length > 0 ? (data.reduce((sum, item) => sum + item.inquiries, 0) / data.length).toFixed(1) : 0;
    return (
      <div className="h-64 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
             <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
             <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
             <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(203, 213, 225, 0.3)' }} />
             <ReferenceLine y={averageInquiries} stroke={COLORS.averageLine} strokeDasharray="3 3" />
             <Bar dataKey="inquiries" radius={[5, 5, 0, 0]}>
               {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
             </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
};

export default AnalyticsPage;