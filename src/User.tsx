import React, { Component } from 'react'
import { login } from './api/index';
import { IContext } from './api/types';

const user = JSON.parse(localStorage.getItem('user') || 'null');
const token = JSON.parse(localStorage.getItem('token') || 'null');

export const Context = React.createContext<IContext>({
  fetching: false,
  authenticated: !!user,
  user: user,
  token: token,
  message: null,
  message2: null,
  logginUser: () => {},
  loggoutUser: () => {},
});

export default class User extends Component {
  state = {
    fetching: false,
    authenticated: !!user,
    message: null,
    message2: null,
    user: user,
    token: token,
  }

  logginUser:any = async (username: string, password: string) => {
    this.setState({ fetching: true });

    const loginUser = await login(username, password);

    if (loginUser && !loginUser.user) {
      if (Array.isArray(loginUser)) {
        this.setState({ message: loginUser, message2: null, fetching: false });
      } else {
        this.setState({ message: null, message2: loginUser, fetching: false });
      }
    }

    if (loginUser && loginUser.user) {
      const { user, token } = loginUser;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(token));
      this.setState({ user, token, fetching: false, authenticated: true, message: null, message2: null });
    }
  };

  loggoutUser = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
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