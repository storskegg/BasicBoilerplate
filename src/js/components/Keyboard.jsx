import React from 'react';
import Key from '/components/Key';

const { Component } = React;

export default class Keyboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: []
    };

    this.initSeries();
  }

  initSeries() {
    for (let n = 65; n < 91; n++) {
      this.state.series.push(n);
    }
  }

  render() {
    const { series } = this.state;
    return (
      <div className="keyboard">
        {
          series.map(letter => <Key letter={letter} key={`keyboard-${letter}`} />)
        }
      </div>
    );
  }
}
