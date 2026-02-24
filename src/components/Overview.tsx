import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

const voterTurnoutData = [
  { year: '2011', turnout: 78.12 },
  { year: '2016', turnout: 74.81 },
  { year: '2021', turnout: 73.63 },
  { year: '2026 (Proj)', turnout: 76.50 },
];

const partyPerformanceData = [
  { region: 'North', partyA: 45, partyB: 35, others: 20 },
  { region: 'South', partyA: 30, partyB: 50, others: 20 },
  { region: 'West', partyA: 40, partyB: 45, others: 15 },
  { region: 'Central', partyA: 55, partyB: 30, others: 15 },
  { region: 'Chennai', partyA: 60, partyB: 25, others: 15 },
];

export default function Overview() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <div className="flex space-x-2">
          <select className="bg-white border border-slate-300 rounded-md px-3 py-1.5 text-sm font-medium text-slate-700">
            <option>All Regions</option>
            <option>North TN</option>
            <option>South TN</option>
            <option>West TN</option>
            <option>Central TN</option>
            <option>Chennai</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Voters (Est)</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">6.28 Cr</p>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
            <span className="text-emerald-500 font-medium">+2.4%</span>
            <span className="text-slate-500 ml-2">vs 2021</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">First Time Voters</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">12.5 L</p>
            </div>
            <div className="h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
            <span className="text-emerald-500 font-medium">+8.1%</span>
            <span className="text-slate-500 ml-2">vs 2021</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Key Projects Active</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">142</p>
            </div>
            <div className="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-slate-500">Across 38 districts</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Critical Constituencies</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">45</p>
            </div>
            <div className="h-12 w-12 bg-rose-50 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-rose-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-rose-500 font-medium">Margin &lt; 5%</span>
            <span className="text-slate-500 ml-2">in 2021</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Historical Voter Turnout (%)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={voterTurnoutData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis domain={[60, 85]} axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="turnout" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Estimated Support by Region (%)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={partyPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f1f5f9' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="partyA" name="Ruling Alliance" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                <Bar dataKey="partyB" name="Opposition Alliance" stackId="a" fill="#f59e0b" />
                <Bar dataKey="others" name="Others/Undecided" stackId="a" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
