import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Loader2, Smartphone } from 'lucide-react';

interface PhoneNumberFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  disabled: boolean;
}

const PhoneNumberForm: React.FC<PhoneNumberFormProps> = ({
  value,
  onChange,
  onSubmit,
  loading,
  disabled,
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Enter Phone Number
      </label>
      <div className="relative">
        <PhoneInput
          international
          defaultCountry="GH"
          value={value}
          onChange={(val) => onChange(val || '')}
          className="phone-input-custom"
          placeholder="Enter phone number"
        />
      </div>
    </div>
    <button
      type="submit"
      disabled={loading || disabled}
      className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 disabled:from-gray-700 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-red-500/25 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Validating...
        </>
      ) : (
        <>
          <Smartphone className="w-5 h-5" />
          Track Phone Number
        </>
      )}
    </button>
  </form>
);

export default PhoneNumberForm; 