import React from 'react';
import ReactDOM from 'react-dom';
import CharKey from './components/CharKey.jsx';

ReactDOM.render(
  (
    <div>
      <h1>Hello, world!</h1>
      <h2>It sure will be nice to have warm weather, again.</h2>
      <CharKey letter='A' />
    </div>
  ),
  document.getElementById('root')
);
