import React from 'react';
import { ShoppingBag, Download, ExternalLink, Phone } from 'lucide-react';

const CTAField = ({ register, error, watch }) => {
  const ctaOptions = [
    { value: 'shop_now', label: 'Shop Now', icon: ShoppingBag },
    { value: 'download', label: 'Download', icon: Download },
    { value: 'learn_more', label: 'Learn More', icon: ExternalLink },
    { value: 'contact_us', label: 'Contact Us', icon: Phone },
  ];
  
  // Get current CTA value with null check
  const currentCTA = watch ? watch('cta') : null;

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
        <ExternalLink className="w-4 h-4" />
        Call-to-Action
        <span className="text-red-500">*</span>
      </label>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {ctaOptions.map((option) => {
          const Icon = option.icon;
          return (
            <label key={option.value} className="relative cursor-pointer">
              <input
                type="radio"
                value={option.value}
                {...register('cta', { required: 'Please select a call-to-action' })}
                className="sr-only peer"
              />
              <div className="p-3 rounded-lg border border-gray-300 bg-white hover:border-purple-300 hover:bg-purple-50 peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:ring-1 peer-checked:ring-purple-500 transition-all">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center peer-checked:bg-purple-100">
                    <Icon className="w-4 h-4 text-gray-600 peer-checked:text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {option.label}
                  </span>
                </div>
              </div>
            </label>
          );
        })}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error.message}
        </p>
      )}
      
      <div className="mt-2 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Selected CTA appears as:</strong> "{getCTALabel(currentCTA)}" button on your ad
        </p>
      </div>
    </div>
  );
};

// Helper function to get CTA label
const getCTALabel = (ctaValue) => {
  const ctas = {
    'shop_now': 'Shop Now',
    'download': 'Download',
    'learn_more': 'Learn More',
    'contact_us': 'Contact Us'
  };
  return ctas[ctaValue] || 'Select CTA';
};

export default CTAField;