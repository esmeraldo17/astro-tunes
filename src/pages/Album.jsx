import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import Header from '../components/Header';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicState: [],
      name: '',
      collection: '',
      carregando: false,
      favorito: [],
    };
  }

  componentDidMount() {
    this.requisicao();
    this.pegaFavorito();
  }

  requisicao = async () => {
    const { match: { params: { id } } } = this.props;
    const music = await getMusics(id);
    // console.log(music[1].trackName);
    this.setState({
      musicState: music,
      name: music[0].artistName,
      collection: music[0].collectionName,
    }, async () => {
      this.setState({ favorito: await getFavoriteSongs() });
    });
  };

  addFavorite = async (musica) => {
    this.setState({ carregando: true });
    // console.log(carregando);
    await addSong(musica);
    this.setState(
      (previwState) => ({ favorito: [musica, ...previwState.favorito] }),
      () => {
        this.setState({ carregando: false });
      },
    );
  };

  removeFavorite = async (musica) => {
    this.setState({ carregando: true }, async () => {
      await removeSong(musica);
      await this.pegaFavorito();
      this.setState({ carregando: false });
    });
  };

  favorite = async (e) => {
    const { favorito } = this.state;
    const isFavorite = favorito.some((e2) => e2.trackName === e.trackName);
    console.log(isFavorite);

    if (isFavorite) {
      await this.removeFavorite(e);
    } else {
      await this.addFavorite(e);
    }
  };

  pegaFavorito = async () => {
    const favoritos = await getFavoriteSongs();
    this.setState({ favorito: favoritos });
    // const { favorito } = this.state;
    // console.log(favorito);
  };

  render() {
    const { name, collection, musicState, carregando, favorito } = this.state;
    // console.log(favorito);
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{name}</p>
        <p data-testid="album-name">{collection}</p>
        {carregando ? <Carregando /> : musicState.map((e, i) => (
          i > 0 && (
            <>
              <MusicCard
                key={ e.trackId }
                trackName={ e.trackName }
                previewUrl={ e.previewUrl }
                favoriyo={ e }
              />
              {/* { console.log(carregando) } */}
              <label htmlFor={ i }>
                Favorita
                <input
                  id={ i }
                  type="checkbox"
                  data-testid={ `checkbox-music-${e.trackId}` }
                  onClick={ async () => {
                    // await this.addFavorite(e);
                    await this.favorite(e);
                    await this.pegaFavorito();
                  } }
                  checked={ favorito.length > 0 && (
                    favorito.some((e2) => e2.trackName === e.trackName)
                  ) }
                />
                {/* {console.log(favorito)} */}
              </label>
            </>
          )))}

      </div>
    );
  }
}
export default Album;

Album.propTypes = {
  match: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
};
