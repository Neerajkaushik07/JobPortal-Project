import React from 'react';

function DisplayResults({ results }) {
  return (
    <ul>
      {results.map((result, index) => (
        <li key={index}>
          {result.position} in {result.location}
        </li>
      ))}
    </ul>
  );
}

export default DisplayResults;
