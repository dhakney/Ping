import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Timeline from './components/Timeline';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Ping</h1>
        </header>
        <main>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/" element={<Timeline />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
