import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';
import AlbumArtists from '../components/AlbumArtists';

class Search extends React.Component {
  state = {
    inputSearch: [],
    buttonDisabled: true,
    artists: '',
    albuns: [],
    click: true,
    carregando: false,
  }

  handleInputSearch = ({ target }) => {
    const { value } = target;
    this.setState({ inputSearch: value }, () => {
      if (value.length > 1) {
        this.setState({ buttonDisabled: false });
      } else {
        this.setState({ buttonDisabled: true });
      }
    });
  }

  handleSearchFetch = async () => {
    const { inputSearch } = this.state;
    this.setState({ artists: inputSearch }, async () => {
      this.setState({ carregando: true });
      const albuns = await searchAlbumsAPI(inputSearch);
      this.setState({
        inputSearch: [],
        carregando: false,
        click: true,
        albuns,
      });
    });
  }

  render() {
    const { inputSearch,
      buttonDisabled,
      artists,
      albuns,
      click,
      carregando } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            <input
              type="text"
              data-testid="search-artist-input"
              name="inputSearch"
              value={ inputSearch }
              id="search"
              onChange={ this.handleInputSearch }
            />
          </label>
          <label htmlFor="btn-search">
            Entrar
            <button
              type="button"
              data-testid="search-artist-button"
              id="btn-search"
              name="buttonDisabled"
              disabled={ buttonDisabled }
              onClick={ this.handleSearchFetch }
            >
              {' '}
              Pesquisar

            </button>
          </label>
        </form>
        {carregando && <Carregando /> }
        {click && <p>{ `Resultado de álbuns de: ${artists}` }</p>}
        {albuns.length > 0 ? albuns.map((album, index) => (
          <AlbumArtists album={ album } key={ index } />
        )) : (click && albuns.length === 0) && (<p>Nenhum álbum foi encontrado</p>)}
      </div>
    );
  }
}

export default Search;
