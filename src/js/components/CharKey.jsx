import React from 'react';

const { Component, PropTypes } = React;

export default class CharKey extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { letter } = this.props;
    return <div className="key">{ letter }</div>;
  }
}

CharKey.propTypes = {
  letter: PropTypes.string
};
