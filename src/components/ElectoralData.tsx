import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, TrendingUp, TrendingDown, BarChart2, Radio } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import AddElectoralDataModal from './AddElectoralDataModal';

const electoralData = [
  { 
    id: 1, 
    constituency: 'Chennai Central', 
    region: 'Chennai', 
    year: 2021, 
    turnout: 59.1, 
    maleTurnout: 60.2,
    femaleTurnout: 58.0,
    youthTurnout: 52.5,
    winningParty: 'Party A', 
    runnerUp: 'Party B', 
    margin: 24500,
    partyAVoteShare: 48.5,
    partyBVoteShare: 42.1,
    othersVoteShare: 9.4
  },
  { 
    id: 7, 
    constituency: 'Chennai Central', 
    region: 'Chennai', 
    year: 2016, 
    turnout: 61.2, 
    maleTurnout: 62.1,
    femaleTurnout: 60.3,
    youthTurnout: 54.0,
    winningParty: 'Party B', 
    runnerUp: 'Party A', 
    margin: 12400,
    partyAVoteShare: 43.2,
    partyBVoteShare: 47.5,
    othersVoteShare: 9.3
  },
  { 
    id: 8, 
    constituency: 'Chennai Central', 
    region: 'Chennai', 
    year: 2011, 
    turnout: 65.8, 
    maleTurnout: 66.5,
    femaleTurnout: 65.1,
    youthTurnout: 58.2,
    winningParty: 'Party A', 
    runnerUp: 'Party B', 
    margin: 35000,
    partyAVoteShare: 54.1,
    partyBVoteShare: 38.2,
    othersVoteShare: 7.7
  },
  { 
    id: 2, 
    constituency: 'Coimbatore South', 
    region: 'West', 
    year: 2021, 
    turnout: 62.4, 
    maleTurnout: 63.1,
    femaleTurnout: 61.8,
    youthTurnout: 55.2,
    winningParty: 'Party B', 
    runnerUp: 'Party A', 
    margin: 1500,
    partyAVoteShare: 45.2,
    partyBVoteShare: 46.1,
    othersVoteShare: 8.7
  },
  { 
    id: 9, 
    constituency: 'Coimbatore South', 
    region: 'West', 
    year: 2016, 
    turnout: 64.5, 
    maleTurnout: 65.2,
    femaleTurnout: 63.8,
    youthTurnout: 57.1,
    winningParty: 'Party B', 
    runnerUp: 'Party A', 
    margin: 8200,
    partyAVoteShare: 42.8,
    partyBVoteShare: 48.5,
    othersVoteShare: 8.7
  },
  { 
    id: 3, 
    constituency: 'Madurai Central', 
    region: 'South', 
    year: 2021, 
    turnout: 68.2, 
    maleTurnout: 67.5,
    femaleTurnout: 68.9,
    youthTurnout: 61.0,
    winningParty: 'Party A', 
    runnerUp: 'Party C', 
    margin: 32000,
    partyAVoteShare: 52.4,
    partyBVoteShare: 35.8,
    othersVoteShare: 11.8
  },
  { 
    id: 4, 
    constituency: 'Salem North', 
    region: 'West', 
    year: 2021, 
    turnout: 74.5, 
    maleTurnout: 73.8,
    femaleTurnout: 75.2,
    youthTurnout: 68.5,
    winningParty: 'Party B', 
    runnerUp: 'Party A', 
    margin: 8400,
    partyAVoteShare: 44.1,
    partyBVoteShare: 48.5,
    othersVoteShare: 7.4
  },
  { 
    id: 5, 
    constituency: 'Trichy West', 
    region: 'Central', 
    year: 2021, 
    turnout: 71.8, 
    maleTurnout: 70.5,
    femaleTurnout: 73.1,
    youthTurnout: 65.4,
    winningParty: 'Party A', 
    runnerUp: 'Party B', 
    margin: 45000,
    partyAVoteShare: 55.2,
    partyBVoteShare: 38.4,
    othersVoteShare: 6.4
  },
  { 
    id: 6, 
    constituency: 'Tirunelveli', 
    region: 'South', 
    year: 2021, 
    turnout: 67.9, 
    maleTurnout: 66.8,
    femaleTurnout: 69.0,
    youthTurnout: 59.8,
    winningParty: 'Party B', 
    runnerUp: 'Party A', 
    margin: 4200,
    partyAVoteShare: 46.5,
    partyBVoteShare: 48.2,
    othersVoteShare: 5.3
  },
];

const liveResults = [
  { party: 'Party A', seatsWon: 12, leading: 105, total: 117, change: '+15' },
  { party: 'Party B', seatsWon: 8, leading: 72, total: 80, change: '-12' },
  { party: 'Party C', seatsWon: 0, leading: 15, total: 15, change: '+5' },
  { party: 'Others', seatsWon: 1, leading: 4, total: 5, change: '-8' },
];

export default function ElectoralData() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLive, setIsLive] = useState(true);
  const [selectedYear, setSelectedYear] = useState('2021');
  const [compareId1, setCompareId1] = useState<number | null>(null);
  const [compareId2, setCompareId2] = useState<number | null>(null);
  const [trendConstituency, setTrendConstituency] = useState('Chennai Central');

  // Simulate live updates
  const [currentLiveResults, setCurrentLiveResults] = useState(liveResults);

  const years = Array.from(new Set(electoralData.map(d => d.year.toString()))).sort((a, b) => b.localeCompare(a));
  const constituencies = Array.from(new Set(electoralData.map(d => d.constituency))).sort();

  const trendData = electoralData
    .filter(d => d.constituency === trendConstituency)
    .sort((a, b) => a.year - b.year);

  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setCurrentLiveResults(prev => prev.map(party => {
        // Randomly update leading counts slightly
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const newLeading = Math.max(0, party.leading + change);
        return {
          ...party,
          leading: newLeading,
          total: party.seatsWon + newLeading
        };
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const filteredData = electoralData.filter(data => 
    (data.constituency.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.region.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedYear === 'All' || data.year.toString() === selectedYear)
  );

  const constituency1 = electoralData.find(d => d.id === compareId1);
  const constituency2 = electoralData.find(d => d.id === compareId2);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Electoral Data</h1>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search constituency..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <BarChart2 className="h-5 w-5 text-blue-500" />
            <h3 className="text-sm font-medium text-slate-500">Avg Turnout (2021)</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">73.6%</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            <h3 className="text-sm font-medium text-slate-500">Highest Margin</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">1.2L <span className="text-sm font-normal text-slate-500">(Athoor)</span></p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingDown className="h-5 w-5 text-rose-500" />
            <h3 className="text-sm font-medium text-slate-500">Lowest Margin</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">324 <span className="text-sm font-normal text-slate-500">(Tenkasi)</span></p>
        </div>
      </div>

      {/* Live Results Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-t-4 border-t-rose-500">
        <div className="px-6 py-4 border-b border-slate-200 bg-rose-50 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Radio className="h-5 w-5 text-rose-600 animate-pulse" />
            <h3 className="text-lg font-bold text-slate-900">Live Election Results (2026)</h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-slate-500">Auto-update</span>
            <button 
              onClick={() => setIsLive(!isLive)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isLive ? 'bg-rose-500' : 'bg-slate-300'}`}
            >
              <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isLive ? 'translate-x-5' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentLiveResults.map((party, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-900">{party.party}</h4>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    party.change.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {party.change}
                  </span>
                </div>
                <div className="flex items-end space-x-2">
                  <span className="text-3xl font-bold text-slate-900">{party.total}</span>
                  <span className="text-sm text-slate-500 mb-1">Total</span>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-sm">
                  <div className="text-slate-600">Won: <span className="font-bold text-slate-900">{party.seatsWon}</span></div>
                  <div className="text-slate-600">Leading: <span className="font-bold text-slate-900">{party.leading}</span></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
            <span>Total Seats: 234</span>
            <span>Majority Mark: 118</span>
          </div>
          {/* Progress bar towards majority */}
          <div className="mt-2 w-full bg-slate-100 rounded-full h-2 flex overflow-hidden">
             {currentLiveResults.map((party, index) => (
                <div 
                  key={index}
                  className={`h-full ${
                    index === 0 ? 'bg-blue-500' : 
                    index === 1 ? 'bg-emerald-500' : 
                    index === 2 ? 'bg-amber-500' : 'bg-slate-400'
                  }`}
                  style={{ width: `${(party.total / 234) * 100}%` }}
                />
             ))}
          </div>
           {/* Majority line indicator */}
           <div className="relative w-full h-4 mt-1">
             <div className="absolute left-1/2 -ml-px w-px h-2 bg-slate-400"></div>
             <div className="absolute left-1/2 -ml-4 top-2 text-[10px] text-slate-500">118</div>
           </div>
        </div>
      </div>

      {/* Constituency Comparison Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Constituency Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Constituency 1</label>
            <select 
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={compareId1 || ''}
              onChange={(e) => setCompareId1(Number(e.target.value) || null)}
            >
              <option value="">Select Constituency</option>
              {electoralData.map(d => (
                <option key={d.id} value={d.id}>{d.constituency} ({d.year})</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Constituency 2</label>
            <select 
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={compareId2 || ''}
              onChange={(e) => setCompareId2(Number(e.target.value) || null)}
            >
              <option value="">Select Constituency</option>
              {electoralData.map(d => (
                <option key={d.id} value={d.id}>{d.constituency} ({d.year})</option>
              ))}
            </select>
          </div>
        </div>

        {constituency1 && constituency2 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Metric</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-900 bg-blue-50/50">{constituency1.constituency}</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-900 bg-emerald-50/50">{constituency2.constituency}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-600">Year</td>
                  <td className="px-4 py-3 text-center">{constituency1.year}</td>
                  <td className="px-4 py-3 text-center">{constituency2.year}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-600">Overall Turnout</td>
                  <td className="px-4 py-3 text-center font-bold">{constituency1.turnout}%</td>
                  <td className="px-4 py-3 text-center font-bold">{constituency2.turnout}%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-600">Male Turnout</td>
                  <td className="px-4 py-3 text-center">{constituency1.maleTurnout}%</td>
                  <td className="px-4 py-3 text-center">{constituency2.maleTurnout}%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-600">Female Turnout</td>
                  <td className="px-4 py-3 text-center">{constituency1.femaleTurnout}%</td>
                  <td className="px-4 py-3 text-center">{constituency2.femaleTurnout}%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-600">Winning Party</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">{constituency1.winningParty}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium">{constituency2.winningParty}</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-600">Margin</td>
                  <td className="px-4 py-3 text-center font-bold">{constituency1.margin.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center font-bold">{constituency2.margin.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-8 text-center text-slate-500">
            Select two constituencies to see a side-by-side comparison.
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Vote Share by Constituency (2021)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="constituency" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} domain={[0, 100]} />
              <RechartsTooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ fill: '#f1f5f9' }}
                formatter={(value) => [`${value}%`, 'Vote Share']}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="partyAVoteShare" name="Party A" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} barSize={40} />
              <Bar dataKey="partyBVoteShare" name="Party B" stackId="a" fill="#10b981" />
              <Bar dataKey="othersVoteShare" name="Others" stackId="a" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-lg font-bold text-slate-900">Constituency Margin Trend</h3>
          <select 
            value={trendConstituency}
            onChange={(e) => setTrendConstituency(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {constituencies.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
              <RechartsTooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value) => [value.toLocaleString(), 'Margin']}
              />
              <Legend verticalAlign="top" height={36} />
              <Line 
                type="monotone" 
                dataKey="margin" 
                name="Winning Margin" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-bold text-slate-900">Historical Election Results</h3>
          <div className="flex space-x-2 w-full sm:w-auto">
            <button className="p-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Constituency</th>
                <th className="px-6 py-4 font-medium">Region</th>
                <th className="px-6 py-4 font-medium">Year</th>
                <th className="px-6 py-4 font-medium">Turnout (Overall)</th>
                <th className="px-6 py-4 font-medium">Male / Female</th>
                <th className="px-6 py-4 font-medium">Youth (18-25)</th>
                <th className="px-6 py-4 font-medium">Winner</th>
                <th className="px-6 py-4 font-medium">Runner Up</th>
                <th className="px-6 py-4 font-medium text-right">Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredData.map((data) => (
                <tr key={data.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-900">{data.constituency}</td>
                  <td className="px-6 py-4 text-slate-600">{data.region}</td>
                  <td className="px-6 py-4 text-slate-600">{data.year}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-900">{data.turnout}%</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-xs">
                      <span className="text-blue-600 font-medium">M: {data.maleTurnout}%</span>
                      <span className="text-purple-600 font-medium">F: {data.femaleTurnout}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-700">{data.youthTurnout}%</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${data.winningParty === 'Party A' ? 'bg-blue-100 text-blue-800' : 
                        data.winningParty === 'Party B' ? 'bg-emerald-100 text-emerald-800' : 
                        'bg-slate-100 text-slate-800'}`}
                    >
                      {data.winningParty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{data.runnerUp}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">
                    {data.margin.toLocaleString()}
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    No electoral data found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddElectoralDataModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
