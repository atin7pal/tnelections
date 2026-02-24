import React from 'react';
import { Map, Users, CheckSquare, AlertTriangle, BarChart2 } from 'lucide-react';

export default function FieldWork() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Field Work & Booth Management</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Assign Tasks
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Booth Committee Status */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Booth Committee Formation Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span className="text-slate-700">Statewide Progress</span>
                  <span className="text-blue-600">82% (55,760 / 68,000 booths)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 border border-slate-200 rounded-lg">
                  <p className="text-sm text-slate-500 mb-1">Fully Formed (20+ members)</p>
                  <p className="text-xl font-bold text-emerald-600">42,500</p>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <p className="text-sm text-slate-500 mb-1">Partially Formed</p>
                  <p className="text-xl font-bold text-yellow-600">13,260</p>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <p className="text-sm text-slate-500 mb-1">Not Started / Defunct</p>
                  <p className="text-xl font-bold text-rose-600">12,240</p>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <p className="text-sm text-slate-500 mb-1">Verified via App</p>
                  <p className="text-xl font-bold text-blue-600">38,900</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Field Reports */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">Recent Field Reports</h3>
            </div>
            <div className="divide-y divide-slate-200">
              {[
                { title: 'Voter List Verification', location: 'Coimbatore South', status: 'In Progress', issues: 12 },
                { title: 'Beneficiary Outreach', location: 'Madurai Central', status: 'Completed', issues: 0 },
                { title: 'Booth Agent Training', location: 'Chennai North', status: 'Delayed', issues: 3 },
              ].map((report, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      report.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                      report.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                      'bg-rose-100 text-rose-600'
                    }`}>
                      <CheckSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{report.title}</p>
                      <p className="text-sm text-slate-500">{report.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-1
                      ${report.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                      report.status === 'In Progress' ? 'bg-blue-50 text-blue-700' :
                      'bg-rose-50 text-rose-700'}`}
                    >
                      {report.status}
                    </span>
                    {report.issues > 0 && (
                      <div className="flex items-center justify-end text-xs text-rose-600 font-medium">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {report.issues} Issues
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Top Performing Districts</h3>
            <div className="space-y-4">
              {[
                { name: 'Chennai', score: 92 },
                { name: 'Trichy', score: 88 },
                { name: 'Madurai', score: 85 },
                { name: 'Salem', score: 76 },
                { name: 'Coimbatore', score: 68 },
              ].map((district, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{district.name}</span>
                    <span className="text-slate-500">{district.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${district.score > 80 ? 'bg-emerald-500' : district.score > 70 ? 'bg-yellow-500' : 'bg-rose-500'}`} 
                      style={{ width: `${district.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl shadow-sm p-6 text-white">
            <h3 className="text-lg font-bold mb-2 flex items-center">
              <Map className="h-5 w-5 mr-2 text-blue-400" />
              Field App Usage
            </h3>
            <p className="text-slate-400 text-sm mb-4">Live tracking of party workers using the field app today.</p>
            <div className="flex items-end space-x-2">
              <span className="text-4xl font-bold text-white">12,450</span>
              <span className="text-emerald-400 text-sm font-medium mb-1 flex items-center">
                <BarChart2 className="h-4 w-4 mr-1" /> +15%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Active users in last 24h</p>
          </div>
        </div>
      </div>
    </div>
  );
}
