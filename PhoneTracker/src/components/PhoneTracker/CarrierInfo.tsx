import React from 'react';
import { Wifi } from 'lucide-react';

interface CarrierInfoProps {
  carrier: string;
  lineType: string;
  voip: boolean;
  prepaid: boolean;
}

const CarrierInfo: React.FC<CarrierInfoProps> = ({ carrier, lineType, voip, prepaid }) => (
  <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 space-y-3">
    <div className="flex items-center gap-2 mb-2">
      <Wifi className="w-4 h-4 text-purple-400" />
      <span className="text-gray-300 font-medium">Carrier Information</span>
    </div>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-400">Carrier:</span>
        <span className="text-white">{carrier || 'N/A'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Line Type:</span>
        <span className="text-white capitalize">{lineType || 'N/A'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">VOIP:</span>
        <span className="text-white">{voip ? 'Yes' : 'No'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Prepaid:</span>
        <span className="text-white">{prepaid ? 'Yes' : 'No'}</span>
      </div>
    </div>
  </div>
);

export default CarrierInfo; 