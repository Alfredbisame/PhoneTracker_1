import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationInfoProps {
  country: string;
  region: string;
  city: string;
  zipCode: string;
  timezone: string;
}

function displayValue(val: string | undefined | null) {
  return val && val !== 'N/A' ? val : 'N/A';
}

const LocationInfo: React.FC<LocationInfoProps> = ({ country, region, city, zipCode, timezone }) => (
  <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 space-y-3">
    <div className="flex items-center gap-2 mb-2">
      <MapPin className="w-4 h-4 text-green-400" />
      <span className="text-gray-300 font-medium">Location</span>
    </div>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-400">Country:</span>
        <span className="text-white">{displayValue(country)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Region:</span>
        <span className="text-white">{displayValue(region)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">City:</span>
        <span className="text-white">{displayValue(city)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Zip Code:</span>
        <span className="text-white">{displayValue(zipCode)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Timezone:</span>
        <span className="text-white">{displayValue(timezone)}</span>
      </div>
    </div>
  </div>
);

export default LocationInfo; 