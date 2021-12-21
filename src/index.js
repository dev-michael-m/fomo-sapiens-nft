import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Admin from './pages/Admin';
import AdminPanel from './pages/AdminPanel';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import PasswordProtected from './hoc/PasswordProtected';
import PasswordPage from './pages/PasswordPage';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
          <Route exact path="/password-page" element={<PasswordPage />} />
          <Route exact path="/F58148Aa5" element={<Admin />} />
          <Route exact path="/dashboard" element={<AdminPanel />} />
          <Route exact path="/" element={
          <PasswordProtected enabled>
            <App />
          </PasswordProtected>} />       
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
