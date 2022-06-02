import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    musicFav: [],
    carregando: false,
  };

  componentDidMount = async () => {
    await this.favoriteSongsFetch();
  };

  favoriteSongsFetch = async () => {
    const musicFav = await getFavoriteSongs();
    this.setState({ carregando: true });
    if (musicFav) {
      this.setState({ musicFav, carregando: false });
    }
  }

  render() {
    const { carregando, musicFav } = this.state;
    return (

      <div data-testid="page-favorites">
        <Header />
        <div>
          {carregando && <Carregando />}
          {musicFav.map((music, index) => (
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

export default Favorites;
