import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    carregando: false,
  }

  handleChange = async ({ target }) => {
    const { checked } = target;
    // console.log(checked);
    const { music, favoriteSongsFetch } = this.props;
    this.setState({
      carregando: true,
    });
    if (checked) {
      await addSong(music);
      await favoriteSongsFetch();
      this.setState({ carregando: false });
    } else {
      await removeSong(music);
      await favoriteSongsFetch();
    }
    this.setState({ carregando: false });
  }

  render() {
    // console.log(this.props);
    const { carregando } = this.state;
    const { music: { trackName, previewUrl, trackId }, isFav } = this.props;
    console.log(isFav);
    return (
      <div>
        <p>{trackName}</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        {carregando && <Carregando />}
        <label htmlFor="Favorita">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="Favorita"
            id="Favorita"
            onChange={ this.handleChange }
            checked={ isFav }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  isFav: PropTypes.bool.isRequired,
  favoriteSongsFetch: PropTypes.func.isRequired,
};

export default MusicCard;
