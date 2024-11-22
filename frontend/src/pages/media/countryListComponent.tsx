import React, { useState } from 'react';

// List of countries with lowercase abbreviations
const countries = [
  { name: "United Kingdom", code: "uk" },
  { name: "United States", code: "us" },
  { name: "Argentina", code: "ar" },
  { name: "Austria", code: "at" },
  { name: "Belgium", code: "be" },
  { name: "Brazil", code: "br" },
  { name: "Canada", code: "ca" },
  { name: "Germany", code: "de" },
  { name: "Spain", code: "es" },
  { name: "France", code: "fr" },
  { name: "Ireland", code: "ie" },
  { name: "Indonesia", code: "id" },
  { name: "Italy", code: "it" },
  { name: "Iceland", code: "is" },
  { name: "South Korea", code: "kr" },
  { name: "Malaysia", code: "my" },
  { name: "Mexico", code: "mx" },
  { name: "Norway", code: "no" },
  { name: "Netherlands", code: "nl" },
  { name: "Portugal", code: "pt" },
  { name: "Sweden", code: "se" },
  { name: "Singapore", code: "sg" },
];

const CountryDropdown = ({ setSelectedCountryCode }) => {

  const handleChange = (event) => {
    setSelectedCountryCode(event.target.value);
  };

  return (
    <div>
      <label>Select Country:</label>
      <select onChange={handleChange}>
        <option value="">--Choose a Country--</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryDropdown;
