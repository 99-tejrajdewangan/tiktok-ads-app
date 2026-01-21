import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

const AdTextField = ({ register, error }) => {
  const [charCount, setCharCount] = useState(0);
  const maxLength = 100;

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
        <MessageSquare className="w-4 h-4" />
        Ad Text
        <span className="text-red-500">*</span>
      </label>
      
      <div className="relative">
        <textarea
          placeholder="Write engaging ad copy that captures attention..."
          {...register('adText', {
            required: 'Ad text is required',
            maxLength: {
              value: maxLength,
              message: `Ad text cannot exceed ${maxLength} characters`
            },
            minLength: {
              value: 10,
              message: 'Ad text should be at least 10 characters'
            },
            onChange: (e) => setCharCount(e.target.value.length)
          })}
          rows="3"
          className={`input-field resize-none ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
          maxLength={maxLength}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "adText-error" : "adText-help"}
        />
        
        <div className="absolute right-3 bottom-3 flex items-center gap-2">
          <span className={`text-xs ${charCount > maxLength * 0.8 ? 'text-amber-600' : 'text-gray-400'}`}>
            {charCount}/{maxLength}
          </span>
        </div>
      </div>
      
      {error && (
        <p id="adText-error" className="text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error.message}
        </p>
      )}
      
      <div id="adText-help" className="text-xs text-gray-500 space-y-1">
        <p>Tips for great ad text:</p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>Include a clear call-to-action</li>
          <li>Use emojis to increase engagement 🚀</li>
          <li>Keep it concise and focused</li>
          <li>Mention benefits, not just features</li>
        </ul>
      </div>
    </div>
  );
};

export default AdTextField;