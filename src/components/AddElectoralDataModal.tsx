import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AddElectoralDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddElectoralDataModal({ isOpen, onClose }: AddElectoralDataModalProps) {
  const [formData, setFormData] = useState({
    constituency: '',
    year: '2021',
    voterTurnout: '',
    maleTurnout: '',
    femaleTurnout: '',
    youthTurnout: '',
    winningParty: '',
    runnerUpParty: '',
    margin: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.constituency.trim()) {
      newErrors.constituency = 'Constituency is required';
    }
    
    if (!formData.voterTurnout) {
      newErrors.voterTurnout = 'Voter Turnout is required';
    } else if (parseFloat(formData.voterTurnout) < 0 || parseFloat(formData.voterTurnout) > 100) {
      newErrors.voterTurnout = 'Must be between 0 and 100';
    }

    if (!formData.winningParty.trim()) {
      newErrors.winningParty = 'Winning Party is required';
    }

    if (!formData.runnerUpParty.trim()) {
      newErrors.runnerUpParty = 'Runner Up Party is required';
    }

    if (!formData.margin) {
      newErrors.margin = 'Margin is required';
    } else if (parseInt(formData.margin) < 0) {
      newErrors.margin = 'Margin cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            constituency: '',
            year: '2021',
            voterTurnout: '',
            maleTurnout: '',
            femaleTurnout: '',
            youthTurnout: '',
            winningParty: '',
            runnerUpParty: '',
            margin: '',
          });
          onClose();
        }, 2000);
      }, 1000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-0">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">Add Electoral Data</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Data Added!</h3>
            <p className="text-slate-500">The electoral data has been recorded in the system.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Constituency <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="constituency"
                value={formData.constituency}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.constituency ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300'
                }`}
                placeholder="e.g., Chennai Central"
              />
              {errors.constituency && <p className="mt-1 text-xs text-rose-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.constituency}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Election Year <span className="text-rose-500">*</span>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="2021">2021</option>
                  <option value="2016">2016</option>
                  <option value="2011">2011</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Voter Turnout (%) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="voterTurnout"
                  value={formData.voterTurnout}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.voterTurnout ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300'
                  }`}
                  placeholder="e.g., 72.5"
                />
                {errors.voterTurnout && <p className="mt-1 text-xs text-rose-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.voterTurnout}</p>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Male (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="maleTurnout"
                  value={formData.maleTurnout}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="70.5"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Female (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="femaleTurnout"
                  value={formData.femaleTurnout}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="73.1"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Youth (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="youthTurnout"
                  value={formData.youthTurnout}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="65.4"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Winning Party <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="winningParty"
                  value={formData.winningParty}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.winningParty ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300'
                  }`}
                  placeholder="e.g., Party A"
                />
                {errors.winningParty && <p className="mt-1 text-xs text-rose-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.winningParty}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Runner Up Party <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="runnerUpParty"
                  value={formData.runnerUpParty}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.runnerUpParty ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300'
                  }`}
                  placeholder="e.g., Party B"
                />
                {errors.runnerUpParty && <p className="mt-1 text-xs text-rose-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.runnerUpParty}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Margin of Victory (Votes) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="margin"
                value={formData.margin}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.margin ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300'
                }`}
                placeholder="e.g., 15000"
              />
              {errors.margin && <p className="mt-1 text-xs text-rose-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.margin}</p>}
            </div>

            <div className="pt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Data'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
