import React, { Component } from 'react';

class SingleLetterSearchbar extends Component {
  state = {
    guess: ''
  }

  handleChange = (event) => {
    const input = event.target.value.toLowerCase();
    if (input.length <= 1 && /^[a-zA-Z]$/.test(input)) {
      this.setState({ guess: input });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.guess) {
      this.props.onGuess(this.state.guess);
      this.setState({ guess: '' }); // Reset input field after guess
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          value={this.state.guess} 
          onChange={this.handleChange} 
          maxLength="1" 
          placeholder="Enter a letter"
        />
        <button type="submit">Guess</button>
      </form>
    );
  }
}

export default SingleLetterSearchbar;
