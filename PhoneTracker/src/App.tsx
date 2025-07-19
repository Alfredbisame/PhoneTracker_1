import React, { useState } from 'react';
import axios from 'axios';
import 'react-phone-number-input/style.css';
import { Phone } from 'lucide-react';
import PhoneNumberForm from './components/PhoneTracker/PhoneNumberForm';
import ErrorMessage from './components/PhoneTracker/ErrorMessage';
import ValidationResults from './components/PhoneTracker/ValidationResults';

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
  // fallback for any extra fields
  [key: string]: any;
}

function App() {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [details, setDetails] = useState<PhoneDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) {
      setError('Please enter a phone number');
      return;
    }

    setError(null);
    setDetails(null);
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:5001/api/phone-validate?phone=${encodeURIComponent(phoneNumber)}`
      );
      setDetails(response.data);
    } catch (err) {
      setError('Failed to fetch phone details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-red-500 to-red-700 rounded-full">
              <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              PhoneTracker
            </h1>
          </div>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl sm:max-w-2xl mx-auto">
            Advanced phone number validation and carrier lookup with real-time information
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto">
          <div className="card-responsive">
            <PhoneNumberForm
              value={phoneNumber}
              onChange={setPhoneNumber}
              onSubmit={handleSubmit}
              loading={loading}
              disabled={!phoneNumber}
            />

            {error && <ErrorMessage message={error} />}

            {details && <ValidationResults details={details} />}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 sm:mt-12 text-gray-500 text-xs sm:text-sm">
          <p>Powered by Bhankid👨‍💻• Real-time phone validation</p>
        </div>
      </div>
    </div>
  );
}

export default App;