import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, CheckCircle2, Clock, MapPin, Radio, Users, ShieldAlert } from 'lucide-react';

const initialEvents = [
  { id: 1, time: '08:45 AM', type: 'alert', location: 'Chennai Central - Booth 42', message: 'EVM malfunction reported. Technician dispatched.', status: 'resolved' },
  { id: 2, time: '09:15 AM', type: 'info', location: 'Coimbatore South', message: 'High voter turnout observed in early hours (12% by 9 AM).', status: 'active' },
  { id: 3, time: '09:30 AM', type: 'warning', location: 'Madurai Central - Booth 12', message: 'Minor scuffle reported outside polling station. Police intervened.', status: 'resolved' },
  { id: 4, time: '10:00 AM', type: 'info', location: 'Statewide', message: 'Overall turnout at 10 AM is 18.5%.', status: 'active' },
  { id: 5, time: '10:15 AM', type: 'alert', location: 'Salem North - Booth 88', message: 'Voter verifiable paper audit trail (VVPAT) printer issue.', status: 'pending' },
];

export default function ElectionDay() {
  const [events, setEvents] = useState(initialEvents);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    return event.type === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <Radio className="h-6 w-6 text-rose-500 mr-2 animate-pulse" />
            Election Day Live Tracker
          </h1>
          <p className="text-sm text-slate-500 mt-1">Real-time monitoring and incident management</p>
        </div>
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <Clock className="h-4 w-4 text-slate-400" />
          <span className="text-sm font-bold text-slate-700">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <Users className="h-5 w-5 text-blue-500" />
            <h3 className="text-sm font-medium text-slate-500">Current Turnout</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">22.4%</p>
          <p className="text-xs text-emerald-600 mt-1">+2.1% vs 2021 at this time</p>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h3 className="text-sm font-medium text-slate-500">Active Incidents</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">12</p>
          <p className="text-xs text-slate-500 mt-1">Across 8 constituencies</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <ShieldAlert className="h-5 w-5 text-rose-500" />
            <h3 className="text-sm font-medium text-slate-500">Critical Alerts</h3>
          </div>
          <p className="text-2xl font-bold text-rose-600">3</p>
          <p className="text-xs text-rose-500 mt-1">Require immediate attention</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <h3 className="text-sm font-medium text-slate-500">Resolved Issues</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">45</p>
          <p className="text-xs text-emerald-600 mt-1">78% resolution rate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 flex items-center">
              <Activity className="h-5 w-5 text-blue-600 mr-2" />
              Live Event Feed
            </h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${filter === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('alert')}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${filter === 'alert' ? 'bg-rose-600 text-white' : 'bg-rose-100 text-rose-700 hover:bg-rose-200'}`}
              >
                Alerts
              </button>
              <button 
                onClick={() => setFilter('info')}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${filter === 'info' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
              >
                Updates
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {filteredEvents.map((event, index) => (
              <div key={event.id} className="relative pl-8">
                {/* Timeline line */}
                {index !== filteredEvents.length - 1 && (
                  <div className="absolute left-[11px] top-8 bottom-[-24px] w-0.5 bg-slate-200"></div>
                )}
                
                {/* Timeline dot */}
                <div className={`absolute left-0 top-1.5 h-6 w-6 rounded-full border-4 border-white flex items-center justify-center
                  ${event.type === 'alert' ? 'bg-rose-500' : 
                    event.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`}
                ></div>
                
                <div className={`p-4 rounded-lg border ${
                  event.type === 'alert' ? 'bg-rose-50 border-rose-100' : 
                  event.type === 'warning' ? 'bg-amber-50 border-amber-100' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center text-sm font-bold text-slate-900">
                      <MapPin className="h-4 w-4 mr-1 text-slate-500" />
                      {event.location}
                    </div>
                    <span className="text-xs font-medium text-slate-500">{event.time}</span>
                  </div>
                  <p className="text-sm text-slate-700 mb-3">{event.message}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider
                      ${event.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' : 
                        event.status === 'pending' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}
                    >
                      {event.status}
                    </span>
                    
                    {event.status === 'pending' && (
                      <button className="text-xs font-medium text-blue-600 hover:text-blue-800">
                        Take Action &rarr;
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
            </div>
            <div className="p-4 space-y-3">
              <button className="w-full flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200">
                    <ShieldAlert className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">Report Incident</span>
                </div>
                <span className="text-slate-400 group-hover:text-blue-500">&rarr;</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3 group-hover:bg-emerald-200">
                    <Users className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">Update Turnout</span>
                </div>
                <span className="text-slate-400 group-hover:text-blue-500">&rarr;</span>
              </button>

              <button className="w-full flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3 group-hover:bg-amber-200">
                    <Radio className="h-4 w-4 text-amber-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">Broadcast Message</span>
                </div>
                <span className="text-slate-400 group-hover:text-blue-500">&rarr;</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">Key Contacts</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">Election Commission Control Room</p>
                  <p className="text-xs text-slate-500">1800-425-2026</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">State Police HQ</p>
                  <p className="text-xs text-slate-500">100 / 044-28447777</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">Party Legal Cell</p>
                  <p className="text-xs text-slate-500">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
