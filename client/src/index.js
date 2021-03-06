import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './queries.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import actioncable from 'actioncable';

const cableApp = {}
cableApp.cable = actioncable.createConsumer('ws://localhost:3000/cable')

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <App cableApp={cableApp}/>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
