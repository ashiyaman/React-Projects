import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css');
var App = require('./components/App.js');

// index.js is only responsible for requiring app.js and rendering it to the DOM

ReactDOM.render (
  <App />, document.getElementById('app')
)
