import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class AlbumArtists extends React.Component {
  render() {
    const { album } = this.props;
    const { artistName, artworkUrl100, collectionId, collectionName } = album;
    console.log(album);
    return (
      <div>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <img src={ artworkUrl100 } alt="Capa do Album" />
          <p>{ collectionName }</p>
          <p>{ artistName }</p>
        </Link>
      </div>
    );
  }
}

AlbumArtists.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionId: PropTypes.number,
  }).isRequired,
};

export default AlbumArtists;
