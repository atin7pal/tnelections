import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AddVoterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddVoterModal({ isOpen, onClose }: AddVoterModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    epicNumber: '',
    age: '',
    gender: '',
    constituency: '',
    contactNumber: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.epicNumber.trim()) {
      newErrors.epicNumber = 'EPIC Number is required';
    } else if (!/^[A-Z]{3}[0-9]{7}$/.test(formData.epicNumber.toUpperCase())) {
      newErrors.epicNumber = 'Invalid format (e.g., ABC1234567)';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (parseInt(formData.age) < 18) {
      newErrors.age = 'Must be 18 or older';
    } else if (parseInt(formData.age) > 120) {
      newErrors.age = 'Invalid age';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.constituency) {
      newErrors.constituency = 'Constituency is required';
    }

    if (formData.contactNumber && !/^[0-9]{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Must be a 10-digit number';
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
            name: '',
            epicNumber: '',
            age: '',
            gender: '',
            constituency: '',
            contactNumber: '',
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
          <h2 className="text-lg font-bold text-slate-900">Add Voter Data</h2>
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
            <h3 className="text-xl font-bold text-slate-900 mb-2">Successfully Added!</h3>
            <p className="text-slate-500">The voter data has been recorded in the system.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300'
                }`}
                placeholder="Enter full name"
              />
              {errors.name && <p className="mt-1 text-xs text-rose-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                EPIC Number (Voter ID) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="epicNumber"
                value={formData.epicNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase ${
                  errors.epicNumber ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300'
                }`}
                placeholder="e.g., ABC1234567"
              />
              {errors.epicNumber && <p className="mt-1 text-xs text-rose-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.epicNumber}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Age <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.age ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300'
                  }`}
                  placeholder="18+"
                />
                {errors.age && <p className="mt-1 text-xs text-rose-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.age}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Gender <span className="text-rose-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.gender ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300'
                  }`}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="mt-1 text-xs text-rose-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.gender}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Constituency <span className="text-rose-500">*</span>
              </label>
              <select
                name="constituency"
                value={formData.constituency}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.constituency ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300'
                }`}
              >
                <option value="">Select Constituency</option>
                <option value="Chennai Central">Chennai Central</option>
                <option value="Chennai Mylapore">Chennai Mylapore</option>
                <option value="Coimbatore South">Coimbatore South</option>
                <option value="Madurai Central">Madurai Central</option>
                <option value="Salem North">Salem North</option>
                <option value="Trichy West">Trichy West</option>
              </select>
              {errors.constituency && <p className="mt-1 text-xs text-rose-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.constituency}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Contact Number <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.contactNumber ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300'
                }`}
                placeholder="10-digit mobile number"
              />
              {errors.contactNumber && <p className="mt-1 text-xs text-rose-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.contactNumber}</p>}
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
                  'Save Voter Data'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
