import React, { Component } from 'react';

class LetterBox extends Component {
  render() {
    return (
      <span style={{ margin: '5px', fontSize: '24px' }}>
        {this.props.guessed ? this.props.letter : '_'}
      </span>
    );
  }
}

export default LetterBox;
