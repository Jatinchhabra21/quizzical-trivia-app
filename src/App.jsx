import './App.css';
import Start from './components/Start';
import React, { useState } from 'react';
import Error from './components/Error';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Quiz from './components/quiz/Quiz';

function App() {
  const renderedElements = (
    <Router>
      <Routes>
        <Route exact path="/" element={<Start />} />
        <Route path="/start" element={<Quiz />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </Router>
  );

  return renderedElements;
}

export default App;
