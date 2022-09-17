import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isSearchButtonDisabled: true,
      searchValue: '',
      carregando: false,
      result: [],
      clicou: false,
    };
  }

  onInputChance = ({ target }) => {
    const { value } = target;
    // console.log(value);
    const num = 2;
    if (value.length >= num) {
      this.setState({ isSearchButtonDisabled: false, searchValue: value });
    }
  };

  onShearchButtonClick = async () => {
    const { searchValue } = this.state;
    this.setState({ carregando: true });
    const searchResponse = await searchAlbumsAPI(searchValue);
    this.setState({ carregando: false, result: searchResponse, clicou: true });
    // console.log(searchResponse);
  };

  render() {
    const {
      isSearchButtonDisabled,
      carregando,
      searchValue,
      clicou,
      result,
    } = this.state;

    const resultado = `Resultado de álbuns de: ${searchValue}`;
    const nadaEncontrado = 'Nenhum álbum foi encontrado';
    return (
      <div data-testid="page-search">
        <Header />
        {carregando ? (
          <Carregando />
        ) : (

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
              onClick={ this.onShearchButtonClick }
            />
          </form>

        )}
        {/* {clicou
          && <div>
            <p>{resultado}</p>
            {console.log(result)}
            {result.map(
              ({
                artistId,
                artistName,
                collectionId,
                collectionName,
                collectionPrice,
                artworkUrl100,
                releaseDate,
                trackCount,
              }) => (
                <div key={ collectionId }>
                  <li>{`ID: ${artistId}`}</li>
                  <li>{`Nome: ${artistName}`}</li>
                  <li>{`ID Coleção: ${collectionId}`}</li>
                  <li>{`Nome Coleção: ${collectionName}`}</li>
                  <li>{`Preço: ${collectionPrice}`}</li>
                  <img src={ artworkUrl100 } alt={ artistName } />
                  <li>{`Data de Lançamento: ${releaseDate}`}</li>
                  <li>{`Faixas: ${trackCount}`}</li>
                  <Link
                    data-testid={ `link-to-album-${collectionId}` }
                    to={ `/album/${collectionId}` }
                  >
                    Album
                  </Link>
                </div>
              ),
            )}
          </div>} */}
        {clicou && result.length === 0 ? (
          <h3>{nadaEncontrado}</h3>
        ) : (
          <>
            <h3>{resultado}</h3>
            {result.map(
              ({
                artistId,
                artistName,
                collectionId,
                collectionName,
                collectionPrice,
                artworkUrl100,
                releaseDate,
                trackCount,
              }) => (
                <div key={ collectionId }>
                  <li>{`ID: ${artistId}`}</li>
                  <li>{`Nome: ${artistName}`}</li>
                  <li>{`ID Coleção: ${collectionId}`}</li>
                  <li>{`Nome Coleção: ${collectionName}`}</li>
                  <li>{`Preço: ${collectionPrice}`}</li>
                  <img src={ artworkUrl100 } alt={ artistName } />
                  <li>{`Data de Lançamento: ${releaseDate}`}</li>
                  <li>{`Faixas: ${trackCount}`}</li>
                  <Link
                    data-testid={ `link-to-album-${collectionId}` }
                    to={ `/album/${collectionId}` }
                  >
                    Album
                  </Link>
                </div>
              ),
            )}
          </>
        )}
      </div>
    );
  }
}
export default Search;
