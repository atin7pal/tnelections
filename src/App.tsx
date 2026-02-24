import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Building2, 
  Target, 
  Megaphone, 
  UserSquare2, 
  Map, 
  PieChart, 
  ThumbsUp,
  Database,
  Archive,
  History,
  Radio,
  Menu,
  X
} from 'lucide-react';
import Overview from './components/Overview';
import VoterAnalytics from './components/VoterAnalytics';
import GovtProjects from './components/GovtProjects';
import Strategy from './components/Strategy';
import Campaigns from './components/Campaigns';
import CandidateAnalytics from './components/CandidateAnalytics';
import FieldWork from './components/FieldWork';
import Demographics from './components/Demographics';
import Sentiment from './components/Sentiment';
import DataProgress from './components/DataProgress';
import ElectoralData from './components/ElectoralData';
import HistoricalAnalysis from './components/HistoricalAnalysis';
import ElectionDay from './components/ElectionDay';
import Chatbot from './components/Chatbot';

const navigation = [
  { name: 'Overview', icon: BarChart3, id: 'overview' },
  { name: 'Election Day Live', icon: Radio, id: 'election-day' },
  { name: 'Voter Analytics', icon: Users, id: 'voter' },
  { name: 'Electoral Data', icon: Archive, id: 'electoral' },
  { name: 'Historical Analysis', icon: History, id: 'historical' },
  { name: 'Govt Projects', icon: Building2, id: 'projects' },
  { name: 'Strategy', icon: Target, id: 'strategy' },
  { name: 'Campaigns', icon: Megaphone, id: 'campaigns' },
  { name: 'Candidate Analytics', icon: UserSquare2, id: 'candidate' },
  { name: 'Field Work', icon: Map, id: 'field' },
  { name: 'Demographics', icon: PieChart, id: 'demographics' },
  { name: 'Sentiment Analysis', icon: ThumbsUp, id: 'sentiment' },
  { name: 'Data Progress', icon: Database, id: 'data-progress' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'election-day': return <ElectionDay />;
      case 'voter': return <VoterAnalytics />;
      case 'electoral': return <ElectoralData />;
      case 'historical': return <HistoricalAnalysis />;
      case 'projects': return <GovtProjects />;
      case 'strategy': return <Strategy />;
      case 'campaigns': return <Campaigns />;
      case 'candidate': return <CandidateAnalytics />;
      case 'field': return <FieldWork />;
      case 'demographics': return <Demographics />;
      case 'sentiment': return <Sentiment />;
      case 'data-progress': return <DataProgress />;
      default: return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 bg-slate-950">
          <span className="text-lg font-bold tracking-tight text-white">TN Election 2026</span>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-4rem)] py-4">
          <nav className="px-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
                  `}
                >
                  <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-slate-200 z-10">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button 
              className="lg:hidden text-slate-500 hover:text-slate-700"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="flex-1 flex justify-end items-center space-x-4">
              <div className="text-sm font-medium text-slate-500">
                Last updated: Just now
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Main scrollable area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
      
      {/* Global AI Chatbot */}
      <Chatbot />
    </div>
  );
}
