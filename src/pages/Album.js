import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
 state = {
   artistName: [],
   artistAlbum: [],
   musicsList: [],
   musicFav: [],
   carregando: false,
 };

 componentDidMount = async () => {
   this.getMusics();
   await this.favoriteSongsFetch();
 };

  favoriteSongsFetch = async () => {
    const musicFav = await getFavoriteSongs();
    if (musicFav) {
      this.setState({ musicFav });
    }
  }

 getMusics = async () => {
   const { match } = this.props;
   const { id } = match.params;
   const getMusicFromApi = await getMusics(id);
   this.setState({
     musicsList: getMusicFromApi.filter((music) => music.trackId),
     artistName: getMusicFromApi[0].artistName,
     artistAlbum: getMusicFromApi[0].collectionName,
   });
 }

 render() {
   const { artistName, artistAlbum, carregando, musicsList, musicFav } = this.state;
   //  console.log(musicFav);

   return (
     <div data-testid="page-album">
       <Header />
       <h2 data-testid="album-name">
         {artistAlbum}
         {' '}
       </h2>
       <h3 data-testid="artist-name">
         {artistName}
         {' '}
       </h3>
       <div>
         {carregando && <Carregando />}
         {musicsList.map((music, index) => (
           <MusicCard
             key={ index }
             music={ music }
             favoriteSongsFetch={ this.favoriteSongsFetch }
             isFav={ musicFav.some((musica) => musica.trackId === music.trackId) }
           />
         ))}
       </div>
     </div>
   );
 }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
