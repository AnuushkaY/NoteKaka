import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { VoiceProvider } from './context/VoiceContext';
import Header from './components/Header';
import Footer from './components/Footer';
import { api } from './utils/apiHelper';
import config from './config';

// Import Pages
import LandingPage from './pages/LandingPage';
import PersonalityTest from './pages/PersonalityTest';
import Dashboard from './pages/Dashboard';
import StoryLearning from './pages/StoryLearning';
import DigitalPayments from './pages/DigitalPayments';
import SchemesPage from './pages/SchemesPage';
import AICoach from './pages/AICoach';
import HelpPage from './pages/HelpPage';

// Initialize API health check
api.checkApiHealth().then(isAvailable => {
  console.log(`Frontend initialized. API mode: ${config.useApi ? 'Enabled' : 'Disabled'}`);
  console.log(`API available: ${isAvailable}`);
});

function App() {
  return (
    <Router>
      <LanguageProvider>
        <UserProvider>
          <VoiceProvider>
            <div className="app">
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/test" element={<PersonalityTest />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/stories" element={<StoryLearning />} />
                  <Route path="/payments" element={<DigitalPayments />} />
                  <Route path="/schemes" element={<SchemesPage />} />
                  <Route path="/coach" element={<AICoach />} />
                  <Route path="/help" element={<HelpPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </VoiceProvider>
        </UserProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;