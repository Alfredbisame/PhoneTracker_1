import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface StatusDisplayProps {
  valid: boolean;
  active: boolean;
  risky: boolean;
  fraudScore: number;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ valid, active, risky, fraudScore }) => (
  <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Valid</span>
        <div className="flex items-center gap-2">
          {valid ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-medium">Yes</span>
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-400 font-medium">No</span>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Active</span>
        <span className={active ? 'text-green-400' : 'text-red-400'}>{active ? 'Yes' : 'No'}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Risky</span>
        <span className={risky ? 'text-yellow-400' : 'text-green-400'}>{risky ? 'Yes' : 'No'}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Fraud Score</span>
        <span className={fraudScore > 50 ? 'text-red-400' : fraudScore > 20 ? 'text-yellow-400' : 'text-green-400'}>{fraudScore}</span>
      </div>
    </div>
  </div>
);

export default StatusDisplay; 