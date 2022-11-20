import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SampleLoader from './App';
import Header from './Header';
import reportWebVitals from './reportWebVitals';
import Massa from './Massa';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <SampleLoader />
    <Massa />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// window.addEventListener('click', function (e) {
//   if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
//     e.preventDefault();
//   }
// });
