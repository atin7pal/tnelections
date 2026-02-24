import React from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, TrendingUp, TrendingDown, Minus, AlertOctagon, PieChart as PieChartIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';

const sentimentTrendData = [
  { month: 'Jan', positive: 45, neutral: 30, negative: 25 },
  { month: 'Feb', positive: 48, neutral: 28, negative: 24 },
  { month: 'Mar', positive: 46, neutral: 32, negative: 22 },
  { month: 'Apr', positive: 52, neutral: 25, negative: 23 },
  { month: 'May', positive: 55, neutral: 25, negative: 20 },
  { month: 'Jun', positive: 53, neutral: 27, negative: 20 },
];

const keyIssues = [
  { issue: 'Unemployment', sentiment: 'Negative', score: -45, trend: 'worsening' },
  { issue: 'Women Welfare (Magalir Urimai)', sentiment: 'Positive', score: 78, trend: 'improving' },
  { issue: 'Infrastructure (Roads/Metro)', sentiment: 'Mixed', score: 12, trend: 'stable' },
  { issue: 'Law and Order', sentiment: 'Mixed', score: -5, trend: 'worsening' },
  { issue: 'Healthcare (Makkalai Thedi)', sentiment: 'Positive', score: 65, trend: 'improving' },
];

const negativeSentimentDrivers = [
  { category: 'Local Infrastructure', value: 35 },
  { category: 'Unemployment', value: 25 },
  { category: 'Price Rise', value: 20 },
  { category: 'Law & Order', value: 12 },
  { category: 'Corruption Allegations', value: 8 },
];

const sentimentDistributionData = [
  { name: 'Positive', value: 53, color: '#10b981' },
  { name: 'Neutral', value: 27, color: '#94a3b8' },
  { name: 'Negative', value: 20, color: '#ef4444' },
];

const negativeTrendData = [
  { month: 'Jan', value: 25 },
  { month: 'Feb', value: 24 },
  { month: 'Mar', value: 22 },
  { month: 'Apr', value: 23 },
  { month: 'May', value: 20 },
  { month: 'Jun', value: 20 },
];

const NEGATIVE_COLORS = ['#ef4444', '#f87171', '#fca5a5', '#fecaca', '#fee2e2'];

export default function Sentiment() {
  const [regionFilter, setRegionFilter] = React.useState('All Regions');
  const [demographicFilter, setDemographicFilter] = React.useState('All Demographics');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Sentiment Analysis</h1>
        <div className="flex flex-wrap gap-2">
          <select 
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="bg-white border border-slate-300 rounded-md px-3 py-1.5 text-sm font-medium text-slate-700"
          >
            <option>All Regions</option>
            <option>North TN</option>
            <option>South TN</option>
            <option>West TN</option>
            <option>Central TN</option>
            <option>Chennai</option>
          </select>
          <select 
            value={demographicFilter}
            onChange={(e) => setDemographicFilter(e.target.value)}
            className="bg-white border border-slate-300 rounded-md px-3 py-1.5 text-sm font-medium text-slate-700"
          >
            <option>All Demographics</option>
            <option>Youth (18-25)</option>
            <option>Women</option>
            <option>Working Class</option>
            <option>Farmers</option>
          </select>
          <select className="bg-white border border-slate-300 rounded-md px-3 py-1.5 text-sm font-medium text-slate-700">
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>Year to Date</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Overall Sentiment</h3>
            <MessageSquare className="h-5 w-5 text-slate-400" />
          </div>
          <div className="flex items-end space-x-2">
            <p className="text-4xl font-bold text-slate-900">53%</p>
            <p className="text-sm font-medium text-emerald-500 mb-1 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" /> +2%
            </p>
          </div>
          <p className="text-sm text-slate-500 mt-2">Net Positive Approval</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Top Positive Driver</h3>
            <ThumbsUp className="h-5 w-5 text-emerald-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 leading-tight">Welfare Schemes</p>
          <p className="text-sm text-slate-500 mt-2">Mentions up 45% this month</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Top Negative Driver</h3>
            <ThumbsDown className="h-5 w-5 text-rose-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 leading-tight">Local Infrastructure</p>
          <p className="text-sm text-slate-500 mt-2">Primarily in urban centers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Sentiment Trend (6 Months)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} />
                <Line type="monotone" dataKey="positive" name="Positive" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="neutral" name="Neutral" stroke="#94a3b8" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="negative" name="Negative" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Sentiment Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-900">Key Issues Tracker</h3>
          </div>
          <div className="divide-y divide-slate-200">
            {keyIssues.map((issue, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div className="flex-1">
                  <p className="font-bold text-slate-900">{issue.issue}</p>
                  <div className="flex items-center mt-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full mr-2
                      ${issue.sentiment === 'Positive' ? 'bg-emerald-100 text-emerald-800' :
                        issue.sentiment === 'Negative' ? 'bg-rose-100 text-rose-800' :
                        'bg-yellow-100 text-yellow-800'}`}
                    >
                      {issue.sentiment}
                    </span>
                    <span className="text-xs text-slate-500">Net Score: {issue.score > 0 ? `+${issue.score}` : issue.score}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 shrink-0">
                  {issue.trend === 'improving' ? (
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                  ) : issue.trend === 'worsening' ? (
                    <TrendingDown className="h-5 w-5 text-rose-500" />
                  ) : (
                    <Minus className="h-5 w-5 text-slate-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Negative Sentiment Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={negativeTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="value" name="Negative %" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Negative Sentiment Deep Dive */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-6">
        <div className="px-6 py-4 border-b border-slate-200 bg-rose-50 flex items-center space-x-2">
          <AlertOctagon className="h-5 w-5 text-rose-600" />
          <h3 className="text-lg font-bold text-slate-900">Negative Sentiment Deep Dive</h3>
        </div>
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Primary Drivers of Dissatisfaction</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={negativeSentimentDrivers} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} width={140} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f1f5f9' }}
                    formatter={(value) => [`${value}%`, 'Mentions']}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                    {negativeSentimentDrivers.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={NEGATIVE_COLORS[index % NEGATIVE_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Critical Vulnerability Zones</h4>
            <div className="space-y-4">
              <div className="p-4 border border-rose-200 bg-rose-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-rose-900">Urban Centers (Chennai, Coimbatore)</h5>
                  <span className="px-2 py-1 bg-rose-200 text-rose-800 text-xs font-bold rounded">High Risk</span>
                </div>
                <p className="text-sm text-rose-800 mb-2">Rising complaints regarding traffic congestion, delayed infrastructure projects, and recent flooding management.</p>
                <div className="flex items-center text-xs font-medium text-rose-700">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  Sentiment dropped 4% in last 30 days
                </div>
              </div>
              
              <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-orange-900">Youth Demographic (18-25)</h5>
                  <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs font-bold rounded">Medium Risk</span>
                </div>
                <p className="text-sm text-orange-800 mb-2">Growing frustration over job opportunities in tier-2 cities and delays in government recruitment exams.</p>
                <div className="flex items-center text-xs font-medium text-orange-700">
                  <Minus className="h-3 w-3 mr-1" />
                  Sentiment stable but negative-leaning
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
