/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App'; 
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <h1 className="maintext">Your Spotify Statistics</h1>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); 

reportWebVitals();

