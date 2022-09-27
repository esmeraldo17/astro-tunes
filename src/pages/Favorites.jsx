import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from './MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favoriteMusic: [],
      carregando: false,
    };
  }

  componentDidMount() {
    this.pegaFavorito();
  }

  pegaFavorito = async () => {
    this.setState({ carregando: true });
    const favoritos = await getFavoriteSongs();
    this.setState({ favoriteMusic: favoritos, carregando: false });
  };

  removeFavorite = async (musica) => {
    this.setState({ carregando: true }, async () => {
      await removeSong(musica);
      await this.pegaFavorito();
      this.setState({ carregando: false });
    });
  };

  render() {
    const { favoriteMusic, carregando } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {carregando ? <Carregando /> : (favoriteMusic.map((e, i) => (
          <>
            <MusicCard
              key={ e.trackId }
              trackName={ e.trackName }
              previewUrl={ e.previewUrl }
              favoriyo={ e }
            />
            <label htmlFor={ i }>
              Favorita
              <input
                id={ i }
                type="checkbox"
                data-testid={ `checkbox-music-${e.trackId}` }
                onClick={ async () => {
                  await this.removeFavorite(e);
                } }
                checked={ favoriteMusic.length > 0 && (
                  favoriteMusic.some((e2) => e2.trackName === e.trackName)
                ) }
              />
            </label>
          </>
        )))}
      </div>
    );
  }
}
export default Favorites;
