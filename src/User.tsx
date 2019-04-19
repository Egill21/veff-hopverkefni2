<<<<<<< HEAD
import React, { Component } from "react";
import { login } from "./api/index";
import { IContext, IErrorArray, ILogInInfo } from "./api/types";

// Ef það er notandi í localStorage erum við með innskráðan notanda
// hér gætum við líka sótt token
const user = JSON.parse(localStorage.getItem("user") || "null");
const token = JSON.parse(localStorage.getItem("token") || "null");
=======
import React, { Component } from 'react'
import { login } from './api/index';
import { IContext } from './api/types';

const user = JSON.parse(localStorage.getItem('user') || 'null');
const token = JSON.parse(localStorage.getItem('token') || 'null');
>>>>>>> 4f8b7c06368c12b86988a13b36d48c78a006e96a

export const Context = React.createContext<IContext>({
  authenticated: !!user,
  fetching: false,
  user: user, // tslint:disable-line
  token: token, // tslint:disable-line
  message: null,
<<<<<<< HEAD
  logginUser: () => { }, // tslint:disable-line
  loggoutUser: () => { }, // tslint:disable-line
=======
  message2: null,
  logginUser: () => {},
  loggoutUser: () => {},
>>>>>>> 4f8b7c06368c12b86988a13b36d48c78a006e96a
});

export default class User extends Component {
  state = { // tslint:disable-line
    authenticated: !!user,
    fetching: false,
    message: null,
<<<<<<< HEAD
    token: token, // tslint:disable-line
    user: user, // tslint:disable-line
  };
=======
    message2: null,
    user: user,
    token: token,
  }
>>>>>>> 4f8b7c06368c12b86988a13b36d48c78a006e96a

  logginUser: any = async (username: string, password: string) => { // tslint:disable-line
    this.setState({ fetching: true });
<<<<<<< HEAD
    let loginUser: ILogInInfo | IErrorArray | null = null;
    try {
      loginUser = await login(username, password);
    } catch (e) {
      this.setState({
        message: {
          errors: [{
            error: "No such user",
            field: "Username",
          }],
        },
      });
    }
=======
>>>>>>> 4f8b7c06368c12b86988a13b36d48c78a006e96a

    const loginUser = await login(username, password);

    if (loginUser && !loginUser.user) {
      if (Array.isArray(loginUser)) {
        this.setState({ message: loginUser, message2: null, fetching: false });
      } else {
        this.setState({ message: null, message2: loginUser, fetching: false });
      }
    }

<<<<<<< HEAD
    if (loginUser && loginUser.loggedin) {
      const { user, token } = loginUser; // tslint:disable-line
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
      this.setState({ user, token, fetching: false, authenticated: true });
=======
    if (loginUser && loginUser.user) {
      const { user, token } = loginUser;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(token));
      this.setState({ user, token, fetching: false, authenticated: true, message: null, message2: null });
>>>>>>> 4f8b7c06368c12b86988a13b36d48c78a006e96a
    }
  }

<<<<<<< HEAD
  loggoutUser = async () => { // tslint:disable-line
    localStorage.removeItem("user");
=======
  loggoutUser = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
>>>>>>> 4f8b7c06368c12b86988a13b36d48c78a006e96a
    this.setState({ user: null, token: null });
  }

  render() { // tslint:disable-line
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
