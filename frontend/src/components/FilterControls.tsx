import React from 'react';
import TemperatureToggle from './TemperatureToggle';
import type { TemperatureUnit } from './TemperatureToggle';
import GenderFilter from './GenderFilter';
import type { Gender } from './GenderFilter';

interface FilterControlsProps {
  temperatureUnit: TemperatureUnit;
  gender: Gender;
  onTemperatureUnitChange: (unit: TemperatureUnit) => void;
  onGenderChange: (gender: Gender) => void;
  className?: string;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  temperatureUnit,
  gender,
  onTemperatureUnitChange,
  onGenderChange,
  className = '',
}) => {
  return (
    <div className={`flex flex-col space-y-4 p-5 ${className}`}>
      <TemperatureToggle
        unit={temperatureUnit}
        onUnitChange={onTemperatureUnitChange}
      />
      <GenderFilter
        gender={gender}
        onGenderChange={onGenderChange}
      />
    </div>
  );
};

