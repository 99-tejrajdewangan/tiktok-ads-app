import React from 'react';
import { Target, Users, TrendingUp } from 'lucide-react';

const ObjectiveField = ({ register, error, watch }) => {
  const selectedObjective = watch?.objective || '';

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
        <Target className="w-4 h-4" />
        Campaign Objective
        <span className="text-red-500">*</span>
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className={`relative cursor-pointer ${selectedObjective === 'traffic' ? 'ring-2 ring-purple-500' : ''}`}>
          <input
            type="radio"
            value="traffic"
            {...register('objective', { required: 'Please select a campaign objective' })}
            className="sr-only"
          />
          <div className={`p-4 rounded-xl border transition-all ${selectedObjective === 'traffic' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300 bg-white'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedObjective === 'traffic' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                <Users className={`w-5 h-5 ${selectedObjective === 'traffic' ? 'text-purple-600' : 'text-gray-500'}`} />
              </div>
              <div>
                <div className="font-medium text-gray-900">Traffic</div>
                <p className="text-xs text-gray-500 mt-1">
                  Drive users to your website
                </p>
              </div>
            </div>
          </div>
        </label>
        
        <label className={`relative cursor-pointer ${selectedObjective === 'conversions' ? 'ring-2 ring-purple-500' : ''}`}>
          <input
            type="radio"
            value="conversions"
            {...register('objective', { required: 'Please select a campaign objective' })}
            className="sr-only"
          />
          <div className={`p-4 rounded-xl border transition-all ${selectedObjective === 'conversions' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300 bg-white'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedObjective === 'conversions' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                <TrendingUp className={`w-5 h-5 ${selectedObjective === 'conversions' ? 'text-purple-600' : 'text-gray-500'}`} />
              </div>
              <div>
                <div className="font-medium text-gray-900">Conversions</div>
                <p className="text-xs text-gray-500 mt-1">
                  Get users to take action
                </p>
              </div>
            </div>
          </div>
        </label>
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error.message}
        </p>
      )}
      
      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Traffic:</strong> Best for website visits and app downloads.
          <br />
          <strong>Conversions:</strong> Best for purchases, sign-ups, or leads.
        </p>
      </div>
    </div>
  );
};

export default ObjectiveField;