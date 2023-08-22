import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const { name, temp_c, temp_f, condition, alerts } = weatherData.current;

  let weatherEmoji;
  if (condition.text.includes('rain')) {
    weatherEmoji = '🌧️';
  } else if (condition.text.includes('thunder')) {
    weatherEmoji = '⛈️';
  } else if (condition.text.includes('sun')) {
    weatherEmoji = '☀️';
  } else if (condition.text.includes('wind')) {
    weatherEmoji = '💨';
  } else {
    weatherEmoji = '🌤️';
  }

  const hailAlert = alerts && alerts.find(alert => alert.event === 'Hail');
  const hailAlertMessage = hailAlert ? `Hail Alert: ${hailAlert.description}` : '';

  return (
    <div className="weather-display">
      <h2>{name}</h2>
      <p>Temperature: {temp_c}°C</p>
      <p>Temperature: {temp_f}°F</p>
      <p>
        Condition: {condition.text} {weatherEmoji}
      </p>
      {hailAlert && <p className="alert-message">{hailAlertMessage}</p>}
    </div>
  );
};

export default WeatherDisplay;

