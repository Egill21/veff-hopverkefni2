import React, { Component } from 'react'
import { login } from './api/index';
import { IlogInInfo, ILogInError, IContext} from './api/types';

// Ef það er notandi í localStorage erum við með innskráðan notanda
// hér gætum við líka sótt token
const user = JSON.parse(localStorage.getItem('user') || 'null');
const token = JSON.parse(localStorage.getItem('token') || 'null');

export const Context = React.createContext<IContext>({
  fetching: false,
  authenticated: !!user,
  user: user,
  token: token,
  message: null,
  logginUser: () => {},
  loggoutUser: () => {},
});

export default class User extends Component {
  state = {
    fetching: false,
    authenticated: !!user,
    message: null,
    user: user,
    token: token,
  }

  logginUser:any = async (username: string, password: string) => {
    this.setState({ fetching: true });
    let loginUser : IlogInInfo | ILogInError | null = null;
    try {
      loginUser = await login(username, password);
    } catch (e) {
      this.setState({ message: {
        errors: [{
          field: 'Username',
          error: 'No such user'
        }]
      }});
    }

    if (loginUser && !loginUser.loggedin) {
      this.setState({ message: loginUser, fetching: false });
    }

    if (loginUser && loginUser.loggedin) {
      const { user, token } = loginUser;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(token));
      this.setState({ user, token, fetching: false, authenticated: true });
    }
  };

  loggoutUser = async () => {
    localStorage.removeItem('user');
    console.log('removing user');
    this.setState({ user: null, token: null });
  };

  render() {
    const { children } = this.props;

    return (
      <Context.Provider value={{
        ...this.state,
        logginUser: this.logginUser,
        loggoutUser: this.loggoutUser,
      }}>
        {children}
      </Context.Provider>
    );
  }
}