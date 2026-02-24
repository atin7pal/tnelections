import React from 'react';
import { UserSquare2, Star, TrendingUp, TrendingDown, Search, Filter } from 'lucide-react';

const candidates = [
  {
    id: 1,
    name: 'Candidate A',
    constituency: 'Chennai Central',
    incumbent: true,
    approvalRating: 68,
    winProbability: 'High',
    keyStrength: 'Local Connect',
    keyWeakness: 'Anti-incumbency'
  },
  {
    id: 2,
    name: 'Candidate B',
    constituency: 'Coimbatore North',
    incumbent: false,
    approvalRating: 45,
    winProbability: 'Toss Up',
    keyStrength: 'Youth Appeal',
    keyWeakness: 'Lack of Experience'
  },
  {
    id: 3,
    name: 'Candidate C',
    constituency: 'Madurai South',
    incumbent: true,
    approvalRating: 72,
    winProbability: 'Very High',
    keyStrength: 'Community Backing',
    keyWeakness: 'Health Issues'
  },
  {
    id: 4,
    name: 'Candidate D',
    constituency: 'Salem West',
    incumbent: true,
    approvalRating: 38,
    winProbability: 'Low',
    keyStrength: 'Financial Muscle',
    keyWeakness: 'Poor Performance'
  }
];

export default function CandidateAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Candidate Data Analytics</h1>
        <div className="flex space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search candidate or constituency..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="p-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Candidates Evaluated</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">234</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Safe Seats</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">112</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Toss Up Seats</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">45</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">At Risk Seats</p>
          <p className="text-2xl font-bold text-rose-600 mt-1">38</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Candidate Profile</th>
                <th className="px-6 py-4 font-medium">Constituency</th>
                <th className="px-6 py-4 font-medium">Approval Rating</th>
                <th className="px-6 py-4 font-medium">Win Probability</th>
                <th className="px-6 py-4 font-medium">Key Strength / Weakness</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold mr-3 shrink-0">
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{candidate.name}</p>
                        <p className="text-xs text-slate-500">{candidate.incumbent ? 'Incumbent MLA' : 'Challenger'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700 font-medium">{candidate.constituency}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="font-bold text-slate-900 mr-2">{candidate.approvalRating}%</span>
                      {candidate.approvalRating > 50 ? (
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-rose-500" />
                      )}
                    </div>
                    <div className="w-24 bg-slate-200 rounded-full h-1.5 mt-1">
                      <div 
                        className={`h-1.5 rounded-full ${candidate.approvalRating > 60 ? 'bg-emerald-500' : candidate.approvalRating > 40 ? 'bg-yellow-500' : 'bg-rose-500'}`} 
                        style={{ width: `${candidate.approvalRating}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${candidate.winProbability.includes('High') ? 'bg-emerald-100 text-emerald-800' : 
                        candidate.winProbability === 'Toss Up' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-rose-100 text-rose-800'}`}
                    >
                      {candidate.winProbability}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs">
                      <p className="text-emerald-600 font-medium mb-1"><span className="text-slate-500">S:</span> {candidate.keyStrength}</p>
                      <p className="text-rose-600 font-medium"><span className="text-slate-500">W:</span> {candidate.keyWeakness}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">View Profile</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
