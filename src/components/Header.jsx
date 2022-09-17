import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      carregando: false,
    };
  }

  async componentDidMount() {
    this.setState({ carregando: true });
    const user = await getUser();
    const { name } = user;
    // console.log(name);
    this.setState({ userName: name, carregando: false });
  }

  render() {
    const { userName, carregando } = this.state;
    return (
      <div>
        { carregando === true && <Carregando /> }
        <h1 data-testid="header-component">Astro Tunes</h1>
        <p data-testid="header-user-name">{ userName }</p>
        <Link to="/search" data-testid="link-to-search"> Pesquisa </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favoritos </Link>
        <Link to="/profile" data-testid="link-to-profile"> About </Link>
      </div>
    );
  }
}

export default Header;
