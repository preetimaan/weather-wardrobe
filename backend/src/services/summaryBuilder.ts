import { WeatherData, Gender } from './types';

export function getSummaryAdvice(weatherData: WeatherData, gender: Gender = 'unisex'): string {
  const temp = weatherData.main.temp;

  let baseAdvice = '';
  if (temp < 0) {
    baseAdvice = 'Bundle up! It\'s very cold out there.';
  } else if (temp < 10) {
    baseAdvice = 'Wear warm layers - it\'s chilly today.';
  } else if (temp < 20) {
    baseAdvice = 'A light jacket should keep you comfortable.';
  } else if (temp < 25) {
    baseAdvice = 'Perfect weather for light layers.';
  } else if (temp < 30) {
    baseAdvice = 'Dress lightly - it\'s warm out!';
  } else {
    baseAdvice = 'Stay cool with minimal, breathable clothing.';
  }

  // Add gender-specific advice
  if (gender === 'male') {
    return `${baseAdvice} Consider men's specific styles for the best fit.`;
  } else if (gender === 'female') {
    return `${baseAdvice} Look for women's cuts that complement your style.`;
  } else {
    return `${baseAdvice} Choose unisex options for versatile styling.`;
  }
}

