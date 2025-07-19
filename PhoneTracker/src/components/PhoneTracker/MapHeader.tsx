import React from 'react';
import { MapPin } from 'lucide-react';

interface MapHeaderProps {
  location: string;
  countryName: string;
}

const MapHeader: React.FC<MapHeaderProps> = ({ location, countryName }) => (
  <div className="p-4 border-b border-gray-700">
    <div className="flex items-center gap-2">
      <MapPin className="w-5 h-5 text-cyan-400" />
      <h3 className="text-lg font-semibold text-white">Location Map</h3>
    </div>
    <p className="text-gray-400 text-sm mt-1">
      {location && location !== 'N/A' ? `${location}, ${countryName}` : countryName}
    </p>
  </div>
);

export default MapHeader; 