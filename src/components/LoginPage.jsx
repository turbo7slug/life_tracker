import React, { useState, useEffect } from 'react';
import { signInWithGoogle } from '../firebase';
import { FcGoogle } from 'react-icons/fc'; // Import Google icon

const quotes = [
  "“The fear of death follows from the fear of life. A man who lives fully is prepared to die at any time.” — Mark Twain",
  "“It is not death that a man should fear, but he should fear never beginning to live.” — Marcus Aurelius",
  "“Death never takes the wise man by surprise; He is always ready to go.” — Jean de La Fontaine",
  "“To the well-organized mind, death is but the next great adventure.” — J.K. Rowling",
  "“Our dead are never dead to us until we have forgotten them.” — George Eliot"
];

const LoginPage = () => {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl mb-6">Welcome to the Life Tracker</h1>
      <button
        onClick={signInWithGoogle}
        className="flex items-center justify-center bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300 shadow-lg"
      >
        <FcGoogle className="mr-2" size={24} /> Sign in with Google
      </button>
      <p className="text-sm text-gray-400 italic mt-4">{quote}</p>
    </div>
  );
};

export default LoginPage;
