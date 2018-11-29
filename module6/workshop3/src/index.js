import React from 'react';
import { render } from 'react-dom';
/* Equivalent of Line 1 */
// const React = require('react');
/* Equivalent of Line 2 */
// const ReactDom = require('react-dom');
// render = ReactDom.render;
import Home from './components/Home';

render(<Home />, document.getElementById('app'));
