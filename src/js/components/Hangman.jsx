import React from 'react';
import Keyboard from '/components/Keyboard';

const { Component } = React;

export default class Hangman extends Component {
  constructor(props) {
    super(props);
  }

  initHangman() {}

  handleKeyPress() {
    return true;
  }

  render() {
    return (
      <div className="hangman">
        <div className="menu">Menu</div>
        <div className="word">word</div>
        <Keyboard />
      </div>
    );
  }
}
