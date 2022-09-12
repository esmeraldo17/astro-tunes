import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isSearchButtonDisabled: true,
    };
  }

  onInputChance = ({ target }) => {
    const { value } = target;
    console.log(value);
    const num = 2;
    if (value.length >= num) {
      this.setState({ isSearchButtonDisabled: false });
    }
  };

  render() {
    const { isSearchButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.onInputChance }
          />
          <input
            type="button"
            data-testid="search-artist-button"
            value="Pesquisar"
            disabled={ isSearchButtonDisabled }
          />
        </form>
      </div>
    );
  }
}
export default Search;
