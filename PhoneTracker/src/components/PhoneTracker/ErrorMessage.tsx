import React from 'react';
import { XCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="mt-6 p-4 bg-red-900/50 border border-red-700 rounded-xl flex items-center gap-3">
    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
    <p className="text-red-200">{message}</p>
  </div>
);

export default ErrorMessage; 