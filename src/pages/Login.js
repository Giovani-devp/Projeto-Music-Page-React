import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class Login extends React.Component {
  state={
    inputNome: [],
    buttonDisabled: true,
    carregando: false,
  }

  handleInputName = ({ target }) => {
    const { value } = target;
    this.setState({ inputNome: value }, () => {
      if (value.length > 2) {
        this.setState({ buttonDisabled: false });
      } else {
        this.setState({ buttonDisabled: true });
      }
    });
  }

   handleSubmit = () => {
     const { inputNome } = this.state;
     const { history } = this.props;
     this.setState({ carregando: true }, async () => {
       await createUser({ name: inputNome });
       history.push('/search');
     });
   }

   render() {
     const { inputNome, buttonDisabled, carregando } = this.state;

     return (

       <div data-testid="page-login">
         <form>

           <label htmlFor="login-name">
             Nome
             <input
               type="text"
               data-testid="login-name-input"
               name="inputNome"
               value={ inputNome }
               id="login-name"
               onChange={ this.handleInputName }
             />
           </label>
           <label htmlFor="btn-submit">
             Entrar
             <input
               type="button"
               data-testid="login-submit-button"
               id="btn-submit"
               name="buttonDisabled"
               disabled={ buttonDisabled }
               onClick={ this.handleSubmit }
             />
           </label>
         </form>
         {carregando && <Carregando />}
       </div>
     );
   }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
