import React from 'react';
import { Phone } from 'lucide-react';

interface NumberFormatsProps {
  formatted: string;
  localFormat: string;
}

const NumberFormats: React.FC<NumberFormatsProps> = ({ formatted, localFormat }) => (
  <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 space-y-3">
    <div className="flex items-center gap-2 mb-2">
      <Phone className="w-4 h-4 text-cyan-400" />
      <span className="text-gray-300 font-medium">Number Formats</span>
    </div>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-400">Formatted:</span>
        <span className="text-white font-mono">{formatted || 'N/A'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Local:</span>
        <span className="text-white font-mono">{localFormat || 'N/A'}</span>
      </div>
    </div>
  </div>
);

export default NumberFormats; 