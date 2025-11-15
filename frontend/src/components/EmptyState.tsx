import React from 'react';
import Closet from '../assets/walk-in closet flat background.jpg';

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start h-full pt-12">
      <img
        src={Closet}
        alt="Closet with clothing"
        className="w-72 h-66 mx-auto mb-6 opacity-80"
      />
      <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">
        Ready to get dressed?
      </h3>
      <p className="text-gray-600 text-center">
        Search for a city to see weather and wardrobe suggestions
      </p>
    </div>
  );
};

