import React, { Component } from 'react';
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
        <h1 data-testid="header-component">Ola</h1>
        <p data-testid="header-user-name">{ userName }</p>
      </div>
    );
  }
}

export default Header;
