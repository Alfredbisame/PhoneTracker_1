import React from 'react';
import { Loader2 } from 'lucide-react';

const MapLoadingOverlay: React.FC = () => (
  <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center z-10">
    <div className="flex items-center gap-3 text-cyan-400">
      <Loader2 className="w-6 h-6 animate-spin" />
      <span>Loading map...</span>
    </div>
  </div>
);

export default MapLoadingOverlay; 