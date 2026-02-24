import React from 'react';
import { Database, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const dataProgress = [
  { section: 'Voter Analytics', progress: 85, status: 'On Track', lastUpdated: '2 hours ago' },
  { section: 'Govt Projects', progress: 100, status: 'Completed', lastUpdated: '1 day ago' },
  { section: 'Strategy', progress: 60, status: 'In Progress', lastUpdated: '3 hours ago' },
  { section: 'Campaigns', progress: 45, status: 'In Progress', lastUpdated: '5 hours ago' },
  { section: 'Candidate Analytics', progress: 90, status: 'On Track', lastUpdated: '1 hour ago' },
  { section: 'Field Work', progress: 30, status: 'Needs Attention', lastUpdated: '2 days ago' },
  { section: 'Demographics', progress: 100, status: 'Completed', lastUpdated: '1 week ago' },
  { section: 'Sentiment Analysis', progress: 75, status: 'On Track', lastUpdated: '4 hours ago' },
];

export default function DataPopulationProgress() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Data Population Progress</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <Database className="h-5 w-5 text-blue-500" />
            <h3 className="text-sm font-medium text-slate-500">Overall Progress</h3>
          </div>
          <div className="flex items-end space-x-2">
            <p className="text-3xl font-bold text-slate-900">73%</p>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '73%' }}></div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <h3 className="text-sm font-medium text-slate-500">Completed Sections</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">2 <span className="text-lg text-slate-500 font-normal">/ 8</span></p>
          <p className="text-sm text-emerald-600 mt-1">Fully populated</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <AlertCircle className="h-5 w-5 text-rose-500" />
            <h3 className="text-sm font-medium text-slate-500">Needs Attention</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">1</p>
          <p className="text-sm text-rose-600 mt-1">Sections behind schedule</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg font-bold text-slate-900">Section-wise Progress</h3>
        </div>
        <div className="divide-y divide-slate-200">
          {dataProgress.map((item, index) => (
            <div key={index} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-bold text-slate-900">{item.section}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${item.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 
                        item.status === 'On Track' ? 'bg-blue-100 text-blue-800' : 
                        item.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-rose-100 text-rose-800'}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-500 mb-2">
                    <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> Updated: {item.lastUpdated}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-slate-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500
                          ${item.progress === 100 ? 'bg-emerald-500' : 
                            item.progress >= 70 ? 'bg-blue-500' : 
                            item.progress >= 40 ? 'bg-yellow-500' : 
                            'bg-rose-500'}`} 
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-slate-700 w-10 text-right">{item.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
