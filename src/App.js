import React, { useState } from 'react';
import WeatherDisplay from './WeatherDisplay';
import HailStormNotification from './HailStormNotification';
import './App.css';

const API_KEY = 'a8846647f3704390912210139231106';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isHailStormPredicted, setIsHailStormPredicted] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data);

      // Simulate weather condition mapping (replace with actual mapping)
      const weatherCondition = data.current.condition.text.toLowerCase();
      setBackgroundImage(getBackgroundImageForWeatherCondition(weatherCondition));

      // Simulate hail storm prediction logic (replace with actual logic)
      setIsHailStormPredicted(data.current.temp_c < 4); // Celsius to Fahrenheit conversion if necessary
    } catch (error) {
      setError('An error occurred while fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundImageForWeatherCondition = (condition) => {
    // Replace with your actual mapping of weather conditions to image URLs
    // Example: return "url_to_sunny_image" for "sunny" condition
    switch (condition) {
      case 'sunny':
        return 'https://images.unsplash.com/photo-1563630381190-77c336ea545a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=389&q=80';
      case 'partly cloudy':
        return 'https://images.unsplash.com/photo-1604042404568-ebbc6bfed7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80';
      case 'cloudy':
          return 'https://images.unsplash.com/photo-1500390365106-166bb67248d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80';
      case 'rainy':
        return 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1951&q=80';
      case 'clear':
        return 'https://images.unsplash.com/photo-1528757980793-e9642d47816a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMwfHxzdW4lMjBpbiUyMHNreXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60';
      case 'overcast':
          return 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1951&q=80';
        // more cases for other weather conditions
      default:
        return null;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    fetchWeatherData(city);
  };

  const appStyles = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
  };

  return (
    <div className="container" style={appStyles}>
      <h1>Storm Tracker</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="city" placeholder="Enter city" required />
        <button type="submit">Get Weather</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && !isHailStormPredicted && (
        <p>No hail storms predicted in your area.</p>
      )}
      {isHailStormPredicted && <HailStormNotification />}
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
};

export default App;


