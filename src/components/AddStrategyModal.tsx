import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AddStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddStrategyModal({ isOpen, onClose }: AddStrategyModalProps) {
  const [formData, setFormData] = useState({
    goal: '',
    initiative: '',
    targetSegment: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.goal.trim()) {
      newErrors.goal = 'Goal is required';
    }
    
    if (!formData.initiative.trim()) {
      newErrors.initiative = 'Key Initiative is required';
    }

    if (!formData.targetSegment) {
      newErrors.targetSegment = 'Target Segment is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
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
            goal: '',
            initiative: '',
            targetSegment: '',
            description: '',
          });
          onClose();
        }, 2000);
      }, 1000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
          <h2 className="text-lg font-bold text-slate-900">Add New Strategy</h2>
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
            <h3 className="text-xl font-bold text-slate-900 mb-2">Strategy Added!</h3>
            <p className="text-slate-500">The new strategy has been recorded in the system.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Party Goal <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.goal ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300'
                }`}
                placeholder="e.g., Increase youth engagement"
              />
              {errors.goal && <p className="mt-1 text-xs text-rose-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.goal}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Key Initiative <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="initiative"
                value={formData.initiative}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.initiative ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300'
                }`}
                placeholder="e.g., Digital Cadre Training"
              />
              {errors.initiative && <p className="mt-1 text-xs text-rose-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.initiative}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Target Voter Segment <span className="text-rose-500">*</span>
              </label>
              <select
                name="targetSegment"
                value={formData.targetSegment}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.targetSegment ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300'
                }`}
              >
                <option value="">Select Segment</option>
                <option value="Women Voters">Women Voters</option>
                <option value="First-time Voters">First-time Voters</option>
                <option value="Working Class">Working Class</option>
                <option value="MSME Sector">MSME Sector</option>
                <option value="Farmers">Farmers</option>
                <option value="Urban Youth">Urban Youth</option>
              </select>
              {errors.targetSegment && <p className="mt-1 text-xs text-rose-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.targetSegment}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300'
                }`}
                placeholder="Briefly describe the strategy and its expected impact..."
              />
              {errors.description && <p className="mt-1 text-xs text-rose-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.description}</p>}
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
                  'Save Strategy'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
