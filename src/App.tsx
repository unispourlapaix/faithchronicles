import React from 'react';
import { TranslationProvider } from './hooks/useTranslation';
import FaithChronicles from './components/FaithChronicles';
import './App.css';

function App() {
  return (
    <TranslationProvider>
      <div className="App">
        <FaithChronicles />
      </div>
    </TranslationProvider>
  );
}

export default App;