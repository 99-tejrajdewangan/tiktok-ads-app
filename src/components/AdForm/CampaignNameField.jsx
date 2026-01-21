import React from 'react';
import { Tag } from 'lucide-react';

const CampaignNameField = ({ register, error, watch }) => {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
        <Tag className="w-4 h-4" />
        Campaign Name
        <span className="text-red-500">*</span>
      </label>
      
      <div className="relative">
        <input
          type="text"
          placeholder="Enter a descriptive campaign name"
          {...register('campaignName', {
            required: 'Campaign name is required',
            minLength: {
              value: 3,
              message: 'Campaign name must be at least 3 characters'
            },
            maxLength: {
              value: 100,
              message: 'Campaign name cannot exceed 100 characters'
            },
            pattern: {
              value: /^[a-zA-Z0-9\s\-_]+$/,
              message: 'Only letters, numbers, spaces, hyphens, and underscores are allowed'
            }
          })}
          className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "campaignName-error" : undefined}
        />
        
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <span className="text-xs text-gray-400">
            {watch ? (watch('campaignName')?.length || 0) : 0}/100
          </span>
        </div>
      </div>
      
      {error && (
        <p id="campaignName-error" className="text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error.message}
        </p>
      )}
      
      <p className="text-xs text-gray-500">
        This name helps you identify your campaign in reports. Use 3-100 characters.
      </p>
    </div>
  );
};

export default CampaignNameField;