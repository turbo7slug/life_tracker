import React, { useState, useEffect } from 'react';
import { saveUserData } from '../firebase';

// Array of grim death quotes
const quotes = [
  "“The fear of death follows from the fear of life. A man who lives fully is prepared to die at any time.” — Mark Twain",
  "“It is not death that a man should fear, but he should fear never beginning to live.” — Marcus Aurelius",
  "“Death never takes the wise man by surprise; He is always ready to go.” — Jean de La Fontaine",
  "“To the well-organized mind, death is but the next great adventure.” — J.K. Rowling",
  "“Our dead are never dead to us until we have forgotten them.” — George Eliot"
];

const UserInfoForm = ({ user, onUserDataSaved }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Set initial quote immediately and then change every 5 seconds
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    const interval = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && dob) {
      await saveUserData(user, name, dob);
      onUserDataSaved({ name, dob });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h2 className="text-2xl mb-6">Tell us about yourself</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center text-white mb-8">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="bg-gray-800 border border-gray-600 text-white p-2 mb-4 rounded w-64"
          required
        />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="bg-gray-800 border border-gray-600 text-white p-2 mb-4 rounded w-64"
          required
        />
        <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300">
          Save
        </button>
      </form>
      <p className="text-sm text-gray-400 italic">{quote}</p>
    </div>
  );
};

export default UserInfoForm;
