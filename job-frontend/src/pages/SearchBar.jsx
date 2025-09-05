import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function SearchBar({ onSearch }) {
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    onSearch(position, location);
  };

  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Position (e.g., Manager)"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="mr-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Location (e.g., New York)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="mr-2 p-2 border border-gray-300 rounded"
      />
      <button onClick={handleSearch} className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        <AiOutlineSearch className="mr-2" /> Search
      </button>
    </div>
  );
}

export default SearchBar;
