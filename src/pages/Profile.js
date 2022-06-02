import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class Profile extends React.Component {
  state = {
    carregando: false,
    userName: '',
    userEmail: '',
    userImage: '',
    userDescription: '',
  };

componentDidMount = async () => {
  await this.getUser();
};

  getUser = async () => {
    const { name, email, image, description } = await getUser();
    this.setState({ carregando: true });
    this.setState({
      userName: name,
      userEmail: email,
      userImage: image,
      userDescription: description,
      carregando: false,
    });
  }

  render() {
    const { userName, userEmail, userImage, userDescription, carregando } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <Link to="/profile/edit">Editar perfil</Link>
        {carregando && <Carregando />}
        <div>
          <h2>Perfil</h2>
          <img data-testid="profile-image" src={ userImage } alt="Imagem do usuario" />
          <h4>
            {' '}
            {userName}
          </h4>
          <h4>
            {' '}
            {userEmail}
          </h4>
          <h4>
            {' '}
            {userDescription}
          </h4>
        </div>
      </div>
    );
  }
}

export default Profile;
