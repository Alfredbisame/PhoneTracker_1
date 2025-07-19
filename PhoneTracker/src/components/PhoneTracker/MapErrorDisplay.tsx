import React from 'react';
import { MapPin } from 'lucide-react';

interface MapErrorDisplayProps {
  message: string;
}

const MapErrorDisplay: React.FC<MapErrorDisplayProps> = ({ message }) => (
  <div className="p-6 text-center">
    <MapPin className="w-8 h-8 text-red-400 mx-auto mb-2" />
    <p className="text-red-400">{message}</p>
  </div>
);

export default MapErrorDisplay; 