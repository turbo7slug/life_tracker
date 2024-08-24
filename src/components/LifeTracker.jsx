import React from 'react';
import dayjs from 'dayjs';
import { logout } from '../firebase'; // Import the logout function

const LifeTracker = ({ dob }) => {
  const calculateWeeksPassed = (dob) => {
    const dobDate = dayjs(dob);
    const today = dayjs();
    return today.diff(dobDate, 'week');
  };

  const weeksPassed = calculateWeeksPassed(dob);
  const totalWeeks = 80 * 52; // assuming an average life expectancy of 80 years

  return (
    <div className="flex flex-col items-center p-4 bg-black min-h-screen">
      <div className="w-full flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="text-xl md:text-2xl text-white mb-2 md:mb-0">Your Life Tracker</h1>
        <button
          onClick={logout}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
        >
          Logout
        </button>
      </div>
      <div className="w-full flex flex-col">
        {[...Array(80)].map((_, year) => (
          <div key={year} className="flex flex-wrap items-center mb-2">
            <span className="text-white text-sm md:text-base mr-2">{year} year</span>
            {[...Array(52)].map((_, week) => (
              <div
                key={week}
                className={`w-3 h-3 md:w-4 md:h-4 m-0.5 ${year * 52 + week < weeksPassed ? 'bg-gray-800' : 'bg-white'}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LifeTracker;
