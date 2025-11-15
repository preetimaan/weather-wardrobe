import React from 'react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  code?: string;
  variant?: 'error' | 'warning';
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title,
  message,
  code,
  variant = 'error',
  className = '',
}) => {
  const isWarning = variant === 'warning';
  const defaultTitle = isWarning ? 'Notice' : 'Connection Error';
  
  const bgColor = isWarning 
    ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-500'
    : 'bg-gradient-to-r from-red-50 to-red-100 border-red-500';
  const iconBg = isWarning ? 'bg-yellow-100' : 'bg-red-100';
  const iconColor = isWarning ? 'text-yellow-600' : 'text-red-600';
  const titleColor = isWarning ? 'text-yellow-900' : 'text-red-900';
  const textColor = isWarning ? 'text-yellow-800' : 'text-red-800';
  const codeColor = isWarning ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className={`${bgColor} border-l-4 rounded-lg shadow-md p-5 transition-all duration-300 ease-in-out ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className={`flex items-center justify-center h-10 w-10 rounded-full ${iconBg}`}>
            {isWarning ? (
              <svg
                className={`h-6 w-6 ${iconColor}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className={`h-6 w-6 ${iconColor}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className={`text-base font-semibold ${titleColor} mb-1`}>
            {title || defaultTitle}
          </h3>
          <p className={`text-sm ${textColor} leading-relaxed`}>
            {message}
          </p>
          {code && (
            <p className={`text-xs ${codeColor} mt-2 font-mono opacity-75`}>
              Error Code: {code}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

