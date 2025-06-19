import React from 'react';
import './App.css';
import WebTicTacToe from './WebTicTacToe';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            {/* Optionally add other nav items here */}
          </div>
        </div>
      </nav>

      <main>
        <WebTicTacToe />
      </main>
    </div>
  );
}

export default App;