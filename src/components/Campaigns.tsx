import React from 'react';
import { Megaphone, Calendar, Users, MapPin, Activity } from 'lucide-react';

const campaigns = [
  {
    id: 1,
    name: 'Makkalai Thedi Muthalvar',
    type: 'Statewide Tour',
    status: 'Planning',
    startDate: 'Oct 2025',
    targetAudience: 'General Public',
    budget: 'High',
    progress: 10
  },
  {
    id: 2,
    name: 'Youth Connect 2026',
    type: 'Digital & College Outreach',
    status: 'Active',
    startDate: 'Jan 2025',
    targetAudience: 'First-time Voters',
    budget: 'Medium',
    progress: 45
  },
  {
    id: 3,
    name: 'Magalir Urimai Celebration',
    type: 'Beneficiary Meetings',
    status: 'Active',
    startDate: 'Mar 2025',
    targetAudience: 'Women Voters',
    budget: 'Medium',
    progress: 60
  }
];

export default function Campaigns() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Campaign Details & Tracking</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
          <Megaphone className="h-4 w-4 mr-2" />
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                <Megaphone className="h-6 w-6" />
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${campaign.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'}`}
              >
                {campaign.status}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-1">{campaign.name}</h3>
            <p className="text-sm text-slate-500 mb-4">{campaign.type}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-slate-600">
                <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                Starts: {campaign.startDate}
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <Users className="h-4 w-4 mr-2 text-slate-400" />
                Target: {campaign.targetAudience}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-500 mb-1">
                <span>Progress</span>
                <span>{campaign.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${campaign.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Upcoming Rallies & Meetings</h3>
          <div className="flex space-x-2">
            <button className="text-sm text-blue-600 font-medium hover:text-blue-800">View Calendar</button>
          </div>
        </div>
        <div className="divide-y divide-slate-200">
          {[
            { date: '15 Oct 2025', location: 'Trichy', type: 'Zonal Conference', expected: '5 Lakhs' },
            { date: '28 Oct 2025', location: 'Madurai', type: 'Youth Wing Rally', expected: '2 Lakhs' },
            { date: '12 Nov 2025', location: 'Coimbatore', type: 'MSME Interaction', expected: '10,000' },
          ].map((event, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center justify-center bg-blue-50 text-blue-700 rounded-lg w-16 h-16 shrink-0">
                  <span className="text-xs font-bold uppercase">{event.date.split(' ')[1]}</span>
                  <span className="text-xl font-bold">{event.date.split(' ')[0]}</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{event.type}</h4>
                  <div className="flex items-center text-sm text-slate-500 mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {event.location}
                  </div>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Expected Crowd</p>
                <p className="font-bold text-slate-900">{event.expected}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
