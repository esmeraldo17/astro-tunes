import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from './Carregando';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      info: {},
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    this.setState({ carregando: true }, async () => {
      const info = await getUser();
      this.setState({ carregando: false, info });
    });
  };

  render() {
    const { info, carregando } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        {carregando ? <Carregando /> : (
          <div>
            <p>{info.name}</p>
            <p>{info.email}</p>
            <p>{info.description}</p>
            <img
              src={ info.image }
              alt=""
              data-testid="profile-image"
            />
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}
export default Profile;
