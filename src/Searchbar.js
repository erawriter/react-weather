import React, { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Implement the logic to fetch weather data for the searched location
    // You can use the searchQuery state to fetch data for the entered location
    // Reset the searchQuery state afterward if needed
    // Example: fetchWeatherData(searchQuery);
    // Remember to define the fetchWeatherData function in the App component

    setSearchQuery(''); // Reset the search query state
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Enter a location"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
