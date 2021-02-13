import React from 'react';
import './App.css';
import Layout from './pages/Layout';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
