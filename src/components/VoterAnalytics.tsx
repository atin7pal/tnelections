import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Users, UserPlus, UserMinus, Activity, Plus, Filter } from 'lucide-react';
import AddVoterModal from './AddVoterModal';

const ageDemographics = [
  { name: '18-25', value: 15 },
  { name: '26-35', value: 25 },
  { name: '36-45', value: 22 },
  { name: '46-60', value: 20 },
  { name: '60+', value: 18 },
];

const genderDemographics = [
  { name: 'Male', value: 49.2 },
  { name: 'Female', value: 50.7 },
  { name: 'Other', value: 0.1 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
const GENDER_COLORS = ['#3b82f6', '#ec4899', '#8b5cf6'];

export default function VoterAnalytics() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConstituency, setSelectedConstituency] = useState('All');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('All');
  const [selectedParty, setSelectedParty] = useState('All');

  const constituencies = ['All', 'Chennai Central', 'Coimbatore South', 'Madurai Central', 'Salem North', 'Trichy West', 'Tirunelveli'];
  const ageGroups = ['All', '18-25', '26-35', '36-45', '46-60', '60+'];
  const parties = ['All', 'Party A', 'Party B', 'Party C', 'Undecided'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Voter Data Analytics</h1>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Voter
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto">
            Export Report
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-center text-slate-500 font-medium text-sm">
          <Filter className="h-4 w-4 mr-2" />
          Filters:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <select 
            value={selectedConstituency}
            onChange={(e) => setSelectedConstituency(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {constituencies.map(c => <option key={c} value={c}>{c === 'All' ? 'All Constituencies' : c}</option>)}
          </select>
          <select 
            value={selectedAgeGroup}
            onChange={(e) => setSelectedAgeGroup(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {ageGroups.map(a => <option key={a} value={a}>{a === 'All' ? 'All Age Groups' : a}</option>)}
          </select>
          <select 
            value={selectedParty}
            onChange={(e) => setSelectedParty(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {parties.map(p => <option key={p} value={p}>{p === 'All' ? 'All Parties' : p}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Registered', value: '62.8M', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'New Additions', value: '1.2M', icon: UserPlus, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { title: 'Deletions/Moved', value: '0.4M', icon: UserMinus, color: 'text-rose-600', bg: 'bg-rose-50' },
          { title: 'Expected Turnout', value: '76.5%', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className={`h-12 w-12 ${stat.bg} rounded-full flex items-center justify-center shrink-0`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <p className="text-xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Age Demographics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageDemographics}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ageDemographics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`${value}%`, 'Population']}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Gender Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderDemographics}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderDemographics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`${value}%`, 'Population']}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">Key Constituency Shifts (2021 vs 2026 Proj)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-6 py-3 font-medium">Constituency</th>
                <th className="px-6 py-3 font-medium">Region</th>
                <th className="px-6 py-3 font-medium">2021 Margin</th>
                <th className="px-6 py-3 font-medium">Current Sentiment</th>
                <th className="px-6 py-3 font-medium">Swing Factor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                { name: 'Coimbatore South', region: 'West', margin: '+1.2%', sentiment: 'Leaning Opp', swing: '-2.5%' },
                { name: 'Madurai Central', region: 'South', margin: '+5.4%', sentiment: 'Strong Hold', swing: '+1.1%' },
                { name: 'Chennai Mylapore', region: 'Chennai', margin: '-2.1%', sentiment: 'Toss Up', swing: '+2.3%' },
                { name: 'Salem North', region: 'West', margin: '-4.5%', sentiment: 'Leaning Opp', swing: '-1.0%' },
                { name: 'Trichy West', region: 'Central', margin: '+8.2%', sentiment: 'Strong Hold', swing: '+0.5%' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{row.name}</td>
                  <td className="px-6 py-4 text-slate-600">{row.region}</td>
                  <td className="px-6 py-4 text-slate-600">{row.margin}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${row.sentiment === 'Strong Hold' ? 'bg-emerald-100 text-emerald-800' : 
                        row.sentiment === 'Toss Up' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-rose-100 text-rose-800'}`}
                    >
                      {row.sentiment}
                    </span>
                  </td>
                  <td className={`px-6 py-4 font-medium ${row.swing.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {row.swing}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddVoterModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
