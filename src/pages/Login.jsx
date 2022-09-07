import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isLoginButtonDisabled: true,
      carregando: false,
      userName: '',
      click: false,
    };
  }

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({ userName: value });
    const number = 3;
    if (value.length >= number) {
      this.setState({
        isLoginButtonDisabled: false,
      });
    }
  };

  onInputClick = () => {
    this.setState({ click: true });
    const { userName } = this.state;
    console.log(userName);
    this.setState({ carregando: true }, async () => {
      await createUser({ name: userName });
      this.setState({ carregando: false });
    });
  };

  render() {
    const {
      isLoginButtonDisabled,
      carregando,
      click,
    } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            onChange={ this.onInputChange }
          />
          <input
            type="button"
            data-testid="login-submit-button"
            value="Entrar"
            disabled={ isLoginButtonDisabled }
            onClick={ this.onInputClick }
          />
          {/* { !carregando === true && click ? <Carregando /> : <Redirect to="/search" /> } */}
          { carregando === true && <Carregando /> }
          { !carregando && click && <Redirect to="/search" /> }
        </form>
      </div>
    );
  }
}

export default Login;
