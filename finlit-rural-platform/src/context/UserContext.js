import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [personalityTest, setPersonalityTest] = useState(null);
  const [learningProgress, setLearningProgress] = useState({});
  const [streak, setStreak] = useState(0);

  // Load user data from localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('finlit_user');
    const savedTest = localStorage.getItem('finlit_personality_test');
    const savedProgress = localStorage.getItem('finlit_learning_progress');
    const savedStreak = localStorage.getItem('finlit_streak');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTest) setPersonalityTest(JSON.parse(savedTest));
    if (savedProgress) setLearningProgress(JSON.parse(savedProgress));
    if (savedStreak) setStreak(parseInt(savedStreak));
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) localStorage.setItem('finlit_user', JSON.stringify(user));
    if (personalityTest) localStorage.setItem('finlit_personality_test', JSON.stringify(personalityTest));
    if (learningProgress) localStorage.setItem('finlit_learning_progress', JSON.stringify(learningProgress));
    localStorage.setItem('finlit_streak', streak.toString());
  }, [user, personalityTest, learningProgress, streak]);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const updatePersonalityTest = (testResults) => {
    setPersonalityTest(testResults);
  };

  const updateLearningProgress = (lessonId, progress) => {
    setLearningProgress(prev => ({
      ...prev,
      [lessonId]: progress
    }));
  };

  const updateStreak = () => {
    const lastActivity = localStorage.getItem('finlit_last_activity');
    const today = new Date().toDateString();
    
    if (lastActivity !== today) {
      setStreak(prev => prev + 1);
      localStorage.setItem('finlit_last_activity', today);
    }
  };

  const resetStreak = () => {
    setStreak(0);
    localStorage.removeItem('finlit_last_activity');
  };

  const logout = () => {
    setUser(null);
    setPersonalityTest(null);
    setLearningProgress({});
    setStreak(0);
    localStorage.removeItem('finlit_user');
    localStorage.removeItem('finlit_personality_test');
    localStorage.removeItem('finlit_learning_progress');
    localStorage.removeItem('finlit_streak');
    localStorage.removeItem('finlit_last_activity');
  };

  return (
    <UserContext.Provider value={{
      user,
      personalityTest,
      learningProgress,
      streak,
      updateUser,
      updatePersonalityTest,
      updateLearningProgress,
      updateStreak,
      resetStreak,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };