import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import Header from '../components/Header';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicState: [],
      name: '',
      collection: '',
    };
  }

  componentDidMount() {
    this.requisicao();
  }

  requisicao = async () => {
    const { match: { params: { id } } } = this.props;
    const music = await getMusics(id);
    console.log(music[1].trackName);
    this.setState({
      musicState: music,
      name: music[0].artistName,
      collection: music[0].collectionName,
    });
  };

  render() {
    const { name, collection, musicState } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{name}</p>
        <p data-testid="album-name">{collection}</p>
        {musicState.map((e, i) => (
          i > 0 && (
            <MusicCard
              key={ e.trackId }
              trackName={ e.trackName }
              previewUrl={ e.previewUrl }
            />
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
