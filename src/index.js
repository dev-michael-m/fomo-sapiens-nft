import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Admin from './pages/Admin';
import AdminPanel from './pages/AdminPanel';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import PasswordProtected from './hoc/PasswordProtected';
import PasswordPage from './pages/PasswordPage';

Sentry.init({
  dsn: "https://3094359872bb492eb1c7df5af63c86b5@o1100553.ingest.sentry.io/6125721",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.25,
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
          <Route exact path="/password-page" element={<PasswordPage />} />
          <Route exact path="/adpanel" element={<Admin>
            <AdminPanel />
          </Admin>} />
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
