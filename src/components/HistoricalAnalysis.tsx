import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { History, TrendingUp, GitCompare, Users, Map } from 'lucide-react';

const historicalTurnout = [
  { year: '2006', overall: 70.8, urban: 65.2, rural: 74.5 },
  { year: '2011', overall: 78.1, urban: 72.4, rural: 81.3 },
  { year: '2016', overall: 74.8, urban: 69.5, rural: 78.2 },
  { year: '2021', overall: 73.6, urban: 68.1, rural: 77.4 },
  { year: '2026 (Proj)', overall: 76.5, urban: 71.0, rural: 80.2 },
];

const marginTrends = [
  { region: 'North', '2016': 4.2, '2021': -2.5, '2026 (Proj)': 1.5 },
  { region: 'South', '2016': -1.5, '2021': 5.4, '2026 (Proj)': 3.2 },
  { region: 'West', '2016': 6.8, '2021': 1.2, '2026 (Proj)': -1.8 },
  { region: 'Central', '2016': 2.4, '2021': 8.2, '2026 (Proj)': 4.5 },
  { region: 'Chennai', '2016': -3.2, '2021': 4.1, '2026 (Proj)': 2.1 },
];

const voterShift = [
  { demographic: 'Youth (18-25)', 'Party A': 42, 'Party B': 38, 'Others': 20 },
  { demographic: 'Women', 'Party A': 52, 'Party B': 35, 'Others': 13 },
  { demographic: 'Working Class', 'Party A': 45, 'Party B': 40, 'Others': 15 },
  { demographic: 'Farmers', 'Party A': 38, 'Party B': 48, 'Others': 14 },
];

export default function HistoricalAnalysis() {
  const [compareYear1, setCompareYear1] = useState('2021');
  const [compareYear2, setCompareYear2] = useState('2026 (Proj)');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Historical Analysis & Trends</h1>
        <div className="flex items-center space-x-3 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
          <GitCompare className="h-4 w-4 text-slate-500" />
          <select 
            value={compareYear1}
            onChange={(e) => setCompareYear1(e.target.value)}
            className="text-sm border-none focus:ring-0 text-slate-700 font-medium bg-transparent cursor-pointer"
          >
            <option value="2011">2011</option>
            <option value="2016">2016</option>
            <option value="2021">2021</option>
          </select>
          <span className="text-slate-300">vs</span>
          <select 
            value={compareYear2}
            onChange={(e) => setCompareYear2(e.target.value)}
            className="text-sm border-none focus:ring-0 text-blue-600 font-bold bg-transparent cursor-pointer"
          >
            <option value="2021">2021</option>
            <option value="2026 (Proj)">2026 (Proj)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Turnout Trends */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Voter Turnout Trends</h3>
            <Users className="h-5 w-5 text-slate-400" />
          </div>
          <p className="text-sm text-slate-500 mb-6">Historical comparison of urban vs rural participation</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalTurnout} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis domain={[50, 90]} axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} />
                <Area type="monotone" dataKey="overall" name="Overall Turnout" stroke="#3b82f6" fillOpacity={1} fill="url(#colorOverall)" strokeWidth={3} />
                <Line type="monotone" dataKey="urban" name="Urban" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="rural" name="Rural" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Margin Shifts */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Winning Margin Shifts (%)</h3>
            <Map className="h-5 w-5 text-slate-400" />
          </div>
          <p className="text-sm text-slate-500 mb-6">Regional swing analysis across election cycles</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marginTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f1f5f9' }}
                />
                <Legend verticalAlign="bottom" height={36} />
                <Bar dataKey={compareYear1} name={compareYear1} fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey={compareYear2} name={compareYear2} fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demographic Shifts */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Demographic Voting Behavior ({compareYear2})</h3>
            <TrendingUp className="h-5 w-5 text-slate-400" />
          </div>
          <p className="text-sm text-slate-500 mb-6">Estimated support distribution across key voter segments</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={voterShift} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis dataKey="demographic" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} width={120} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f1f5f9' }}
                  formatter={(value) => [`${value}%`, 'Support']}
                />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="Party A" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} barSize={32} />
                <Bar dataKey="Party B" stackId="a" fill="#10b981" />
                <Bar dataKey="Others" stackId="a" fill="#94a3b8" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg font-bold text-slate-900 flex items-center">
            <History className="h-5 w-5 mr-2 text-blue-600" />
            Historical Insights & Projections
          </h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900">Turnout Impact</h4>
            <p className="text-sm text-slate-600">Historically, a turnout above 75% has favored the opposition alliance. The projected 76.5% for 2026 suggests a highly competitive environment requiring strong mobilization.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900">Regional Volatility</h4>
            <p className="text-sm text-slate-600">The Western region shows the highest volatility, swinging from +6.8% in 2016 to +1.2% in 2021. Projections indicate a potential negative swing, making it a critical battleground.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900">Demographic Anchors</h4>
            <p className="text-sm text-slate-600">Women voters remain the strongest anchor for Party A (52% support), largely driven by recent welfare schemes, offsetting potential losses in the farming demographic.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
