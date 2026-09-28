import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import ContentExplorer from './Components/ContentExplorer'; // Import your component

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-bs-theme',
      darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);

  return (
    <div className="app-container min-vh-100 d-flex flex-column">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorer" element={<ContentExplorer />} /> {/* Render full component */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;