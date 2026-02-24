import React from 'react';
import { Building2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const projects = [
  { 
    id: 1, 
    name: 'Kalaignar Magalir Urimai Thittam', 
    category: 'Welfare', 
    status: 'Active', 
    beneficiaries: '1.15 Cr', 
    impact: 'High',
    sentiment: 'Positive'
  },
  { 
    id: 2, 
    name: 'CM Breakfast Scheme Expansion', 
    category: 'Education/Welfare', 
    status: 'Active', 
    beneficiaries: '17 Lakh', 
    impact: 'High',
    sentiment: 'Very Positive'
  },
  { 
    id: 3, 
    name: 'Chennai Metro Phase 2', 
    category: 'Infrastructure', 
    status: 'In Progress', 
    beneficiaries: 'Chennai Region', 
    impact: 'Medium',
    sentiment: 'Mixed (Traffic concerns)'
  },
  { 
    id: 4, 
    name: 'Makkalai Thedi Maruthuvam', 
    category: 'Healthcare', 
    status: 'Active', 
    beneficiaries: '1.01 Cr', 
    impact: 'High',
    sentiment: 'Positive'
  },
  { 
    id: 5, 
    name: 'Pudhumai Penn Scheme', 
    category: 'Education', 
    status: 'Active', 
    beneficiaries: '4.8 Lakh', 
    impact: 'High',
    sentiment: 'Positive'
  },
];

export default function GovtProjects() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Government Projects Impact Analysis</h1>
        <div className="flex space-x-2">
          <select className="bg-white border border-slate-300 rounded-md px-3 py-1.5 text-sm font-medium text-slate-700">
            <option>All Categories</option>
            <option>Welfare</option>
            <option>Infrastructure</option>
            <option>Healthcare</option>
            <option>Education</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <h3 className="text-sm font-medium text-slate-500">Completed/Active</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">142</p>
          <p className="text-sm text-emerald-600 mt-1">High public approval</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <h3 className="text-sm font-medium text-slate-500">In Progress</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">58</p>
          <p className="text-sm text-blue-600 mt-1">Target completion before 2026</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <AlertCircle className="h-5 w-5 text-rose-500" />
            <h3 className="text-sm font-medium text-slate-500">Delayed/Issues</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">14</p>
          <p className="text-sm text-rose-600 mt-1">Needs immediate attention</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg font-bold text-slate-900">Flagship Schemes Tracking</h3>
        </div>
        <div className="divide-y divide-slate-200">
          {projects.map((project) => (
            <div key={project.id} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-base font-bold text-slate-900">{project.name}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${project.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-slate-500">
                    <span className="flex items-center"><Building2 className="h-4 w-4 mr-1" /> {project.category}</span>
                    <span>•</span>
                    <span>Beneficiaries: <strong className="text-slate-700">{project.beneficiaries}</strong></span>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Electoral Impact</p>
                    <div className="flex items-center">
                      <div className="w-24 bg-slate-200 rounded-full h-2 mr-2">
                        <div className={`h-2 rounded-full ${project.impact === 'High' ? 'bg-emerald-500 w-full' : 'bg-yellow-500 w-2/3'}`}></div>
                      </div>
                      <span className="text-sm font-medium text-slate-700">{project.impact}</span>
                    </div>
                  </div>
                  <div className="w-32">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Public Sentiment</p>
                    <span className={`text-sm font-medium ${
                      project.sentiment.includes('Positive') ? 'text-emerald-600' : 'text-yellow-600'
                    }`}>
                      {project.sentiment}
                    </span>
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
