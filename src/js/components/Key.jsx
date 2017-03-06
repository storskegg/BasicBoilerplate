import React from 'react';

const { Component, PropTypes } = React;

export default class Key extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { letter } = this.props;

    return <div className="key">{letter}</div>;
  }
}

Key.propTypes({
  letter: PropTypes.string
});
