import React from 'react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Connection Error',
  message,
  className = '',
}) => {
  return (
    <div className={`bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-lg shadow-md p-5 transition-all duration-300 ease-in-out ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
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
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-base font-semibold text-red-900 mb-1">
            {title}
          </h3>
          <p className="text-sm text-red-800 leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

