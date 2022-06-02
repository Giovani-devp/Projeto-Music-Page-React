import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  state = {
    inputSearchMusic: [],
    carregando: true,
  };

  componentDidMount = async () => {
    // const { inputSearchMusic } = this.state;
    const { name } = await getUser();
    this.setState({ inputSearchMusic: name, carregando: false });
  };

  render() {
    const { inputSearchMusic, carregando } = this.state;
    return (
      <header data-testid="header-component">
        {carregando && <Carregando />}
        <h4 data-testid="header-user-name">
          { inputSearchMusic }
        </h4>
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
