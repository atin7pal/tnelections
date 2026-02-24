import React, { useState } from 'react';
import { Target, TrendingUp, Users, AlertTriangle, Lightbulb, Plus, CheckCircle2, Flag } from 'lucide-react';
import AddStrategyModal from './AddStrategyModal';

export default function Strategy() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Party & Leader Strategy</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Strategy
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leader Strategy */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">Leader Strategy Focus</h3>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Core Messaging</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-xs font-bold">1</span>
                  </div>
                  <p className="ml-3 text-sm text-slate-700"><strong>Dravidian Model Governance:</strong> Emphasize inclusive growth, social justice, and economic development.</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-xs font-bold">2</span>
                  </div>
                  <p className="ml-3 text-sm text-slate-700"><strong>State Autonomy:</strong> Strong stance on state rights, language, and federalism.</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-xs font-bold">3</span>
                  </div>
                  <p className="ml-3 text-sm text-slate-700"><strong>Welfare Delivery:</strong> Highlight successful implementation of flagship schemes (Magalir Urimai, Breakfast scheme).</p>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Target Demographics</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full font-medium">Women Voters (50.7%)</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full font-medium">First-time Voters</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full font-medium">Working Class</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full font-medium">MSME Sector</span>
              </div>
            </div>
          </div>
        </div>

        {/* Party Strategy */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center space-x-2">
            <Users className="h-5 w-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">Alliance & Party Strategy</h3>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Alliance Management</h4>
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-emerald-900">Current Alliance Status</span>
                    <span className="text-xs font-bold px-2 py-1 bg-emerald-200 text-emerald-800 rounded-full">Stable</span>
                  </div>
                  <p className="text-sm text-emerald-800">Seat sharing negotiations planned for Q4 2025. Focus on retaining core partners while minimizing friendly contests.</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Weakness Mitigation</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 shrink-0" />
                  <p className="text-sm text-slate-700"><strong>Anti-incumbency in specific pockets:</strong> Deploy senior ministers to address local grievances in West TN.</p>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 shrink-0" />
                  <p className="text-sm text-slate-700"><strong>Urban Infrastructure complaints:</strong> Fast-track Chennai Metro and storm water drain projects before monsoon 2025.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Party Goals Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Flag className="h-5 w-5 text-rose-600" />
            <h3 className="text-lg font-bold text-slate-900">Party Goals & Initiatives</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-slate-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-slate-900">Increase Youth Engagement</h4>
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">First-time Voters</span>
              </div>
              <p className="text-sm text-slate-600 mb-4">Launch digital campaigns and college outreach programs to connect with the younger demographic.</p>
              <div className="flex items-center text-sm text-slate-500">
                <Target className="h-4 w-4 mr-1.5" />
                <span>Initiative: Digital Cadre Training</span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-slate-900">Strengthen Women Support</h4>
                <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">Women Voters</span>
              </div>
              <p className="text-sm text-slate-600 mb-4">Highlight the success of welfare schemes like Magalir Urimai Thittam through targeted outreach.</p>
              <div className="flex items-center text-sm text-slate-500">
                <Target className="h-4 w-4 mr-1.5" />
                <span>Initiative: Beneficiary Outreach</span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-slate-900">Boost MSME Confidence</h4>
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">MSME Sector</span>
              </div>
              <p className="text-sm text-slate-600 mb-4">Organize town halls and policy discussion forums with local business owners in industrial hubs.</p>
              <div className="flex items-center text-sm text-slate-500">
                <Target className="h-4 w-4 mr-1.5" />
                <span>Initiative: Industrial Hub Tour</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
          <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
          Immediate Action Items (Next 90 Days)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
            <h4 className="font-bold text-slate-900 mb-2">Booth Committee Formation</h4>
            <p className="text-sm text-slate-600 mb-3">Complete formation of booth committees in 45 critical constituencies identified in the last review.</p>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full w-[65%]"></div>
            </div>
            <p className="text-xs text-right text-slate-500 mt-1">65% Complete</p>
          </div>
          <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
            <h4 className="font-bold text-slate-900 mb-2">Digital Cadre Training</h4>
            <p className="text-sm text-slate-600 mb-3">Rollout WhatsApp-based training modules for IT wing members across all districts.</p>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full w-[30%]"></div>
            </div>
            <p className="text-xs text-right text-slate-500 mt-1">30% Complete</p>
          </div>
          <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
            <h4 className="font-bold text-slate-900 mb-2">Beneficiary Outreach</h4>
            <p className="text-sm text-slate-600 mb-3">Direct contact program targeting 1.15 Cr beneficiaries of Magalir Urimai Thittam.</p>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full w-[15%]"></div>
            </div>
            <p className="text-xs text-right text-slate-500 mt-1">15% Complete</p>
          </div>
        </div>
      </div>

      <AddStrategyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
