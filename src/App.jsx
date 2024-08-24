import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import UserInfoForm from './components/UserInfoForm';
import LifeTracker from './components/LifeTracker';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getUserData } from './firebase';

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const data = await getUserData(user.uid);
        setUserData(data);
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) return <LoginPage />;

  if (!userData) {
    return <UserInfoForm user={user} onUserDataSaved={setUserData} />;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl mb-4">How close are you to your death?</h1>
        <LifeTracker dob={userData.dob} />
      </div>
    </div>
  );
}

export default App;
