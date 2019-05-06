import React from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';
import Home from './components/Home';
import About from './components/About';

const container = document.getElementById('app');

render(
  <Router>
    <Home path="/" />
    <About path="/about" />
  </Router>
    , container);