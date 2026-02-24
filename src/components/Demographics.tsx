import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Users, MapPin, Briefcase, GraduationCap } from 'lucide-react';

const communityData = [
  { name: 'OBC', value: 68 },
  { name: 'SC/ST', value: 21 },
  { name: 'FC', value: 8 },
  { name: 'Others', value: 3 },
];

const occupationData = [
  { name: 'Agriculture', value: 35 },
  { name: 'Manufacturing', value: 22 },
  { name: 'Services/IT', value: 25 },
  { name: 'Business/Trade', value: 12 },
  { name: 'Others', value: 6 },
];

const educationData = [
  { level: 'Primary', percentage: 15 },
  { level: 'Secondary', percentage: 35 },
  { level: 'Higher Sec', percentage: 25 },
  { level: 'Graduate', percentage: 20 },
  { level: 'Post Grad+', percentage: 5 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Demographics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Demographic Analysis</h1>
        <div className="flex space-x-2">
          <select className="bg-white border border-slate-300 rounded-md px-3 py-1.5 text-sm font-medium text-slate-700">
            <option>Statewide</option>
            <option>North TN</option>
            <option>South TN</option>
            <option>West TN</option>
            <option>Central TN</option>
            <option>Chennai</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Population</p>
            <p className="text-xl font-bold text-slate-900">7.64 Cr</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center shrink-0">
            <MapPin className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Urban Population</p>
            <p className="text-xl font-bold text-slate-900">48.4%</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center shrink-0">
            <Briefcase className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Workforce Part.</p>
            <p className="text-xl font-bold text-slate-900">45.6%</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center shrink-0">
            <GraduationCap className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Literacy Rate</p>
            <p className="text-xl font-bold text-slate-900">80.1%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Community Distribution (Est. %)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={communityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {communityData.map((entry, index) => (
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
          <h3 className="text-lg font-bold text-slate-900 mb-4">Occupation Distribution (%)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {occupationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`${value}%`, 'Workforce']}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Education Levels (%)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={educationData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 40]} axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis dataKey="level" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} width={100} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f1f5f9' }}
                />
                <Bar dataKey="percentage" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={32}>
                  {educationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
