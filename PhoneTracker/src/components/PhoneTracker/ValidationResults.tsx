import React from 'react';
import StatusDisplay from './StatusDisplay';
import NumberFormats from './NumberFormats';
import LocationInfo from './LocationInfo';
import CarrierInfo from './CarrierInfo';
import LocationMap from '../LocationMap';
import { CheckCircle } from 'lucide-react';

interface PhoneDetails {
  message: string;
  success: boolean;
  formatted: string;
  local_format: string;
  valid: boolean;
  fraud_score: number;
  recent_abuse: boolean;
  VOIP: boolean;
  prepaid: boolean;
  risky: boolean;
  active: boolean;
  name: string;
  carrier: string;
  line_type: string;
  country: string;
  region: string;
  city: string;
  timezone: string;
  zip_code: string;
  accurate_country_code: boolean;
  dialing_code: number;
  do_not_call: boolean;
  leaked: boolean;
  spammer: boolean;
  active_status: string;
  user_activity: string;
  associated_email_addresses: {
    status: string;
    emails: string[];
  };
  mnc: string;
  mcc: string;
  request_id: string;
  [key: string]: any;
}

interface ValidationResultsProps {
  details: PhoneDetails;
}

const ValidationResults: React.FC<ValidationResultsProps> = ({ details }) => (
  <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex items-center gap-3 mb-4">
      <CheckCircle className="w-6 h-6 text-green-400" />
      <h2 className="text-xl font-semibold text-white">Validation Results</h2>
    </div>
    {/* Display Name from API or fallback */}
    <div className="bg-gray-900/50 border border-cyan-700 rounded-xl p-4 text-center">
      <span className="text-cyan-400 font-bold text-lg">
        {details.name && details.name !== 'N/A' ? details.name : 'No name information available'}
      </span>
    </div>
    <div className="grid gap-4">
      <StatusDisplay valid={details.valid} active={details.active} risky={details.risky} fraudScore={details.fraud_score} />
      <NumberFormats formatted={details.formatted} localFormat={details.local_format} />
      <LocationInfo country={details.country} region={details.region} city={details.city} zipCode={details.zip_code} timezone={details.timezone} />
      <CarrierInfo carrier={details.carrier} lineType={details.line_type} voip={details.VOIP} prepaid={details.prepaid} />
      <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
        <div className="font-semibold text-cyan-400 mb-2">Other Details</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div><span className="text-gray-400">Fraud Score:</span> <span className="text-white">{details.fraud_score}</span></div>
          <div><span className="text-gray-400">Recent Abuse:</span> <span className="text-white">{details.recent_abuse ? 'Yes' : 'No'}</span></div>
          <div><span className="text-gray-400">Risky:</span> <span className="text-white">{details.risky ? 'Yes' : 'No'}</span></div>
          <div><span className="text-gray-400">Active Status:</span> <span className="text-white">{details.active_status}</span></div>
          <div><span className="text-gray-400">User Activity:</span> <span className="text-white">{details.user_activity}</span></div>
          <div><span className="text-gray-400">Do Not Call:</span> <span className="text-white">{details.do_not_call ? 'Yes' : 'No'}</span></div>
          <div><span className="text-gray-400">Leaked:</span> <span className="text-white">{details.leaked ? 'Yes' : 'No'}</span></div>
          <div><span className="text-gray-400">Spammer:</span> <span className="text-white">{details.spammer ? 'Yes' : 'No'}</span></div>
          <div><span className="text-gray-400">Associated Emails:</span> <span className="text-white">{details.associated_email_addresses?.emails?.join(', ') || 'None'}</span></div>
          <div><span className="text-gray-400">Request ID:</span> <span className="text-white">{details.request_id}</span></div>
        </div>
      </div>
    </div>
    {(details.country && details.country !== 'N/A') && (
      <div className="mt-6">
        <LocationMap 
          countryName={details.country || ''}
          location={details.city || ''}
        />
      </div>
    )}
  </div>
);

export default ValidationResults; 