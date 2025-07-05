import type { TemperatureUnit } from '../components/TemperatureToggle';

export const convertTemperature = (temp: number, unit: TemperatureUnit): number => {
  if (unit === 'fahrenheit') {
    return (temp * 9/5) + 32;
  }
  return temp;
};

export const formatTemperature = (temp: number, unit: TemperatureUnit): string => {
  const convertedTemp = convertTemperature(temp, unit);
  const symbol = unit === 'celsius' ? '°C' : '°F';
  return `${Math.round(convertedTemp)}${symbol}`;
};

export const convertWindSpeed = (speed: number, unit: TemperatureUnit): number => {
  // Convert m/s to mph for Fahrenheit users, keep m/s for Celsius
  if (unit === 'fahrenheit') {
    return speed * 2.237; // m/s to mph
  }
  return speed;
};

export const formatWindSpeed = (speed: number, unit: TemperatureUnit): string => {
  const convertedSpeed = convertWindSpeed(speed, unit);
  const unitText = unit === 'celsius' ? 'm/s' : 'mph';
  return `${Math.round(convertedSpeed)} ${unitText}`;
}; 