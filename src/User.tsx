import React, { Component } from "react";
import { login } from "./api/index";
import { IContext, IErrorArray, ILogInInfo } from "./api/types";

// Ef það er notandi í localStorage erum við með innskráðan notanda
// hér gætum við líka sótt token
const user = JSON.parse(localStorage.getItem("user") || "null");
const token = JSON.parse(localStorage.getItem("token") || "null");

export const Context = React.createContext<IContext>({
  authenticated: !!user,
  fetching: false,
  user: user, // tslint:disable-line
  token: token, // tslint:disable-line
  message: null,
  logginUser: () => { }, // tslint:disable-line
  loggoutUser: () => { }, // tslint:disable-line
});

export default class User extends Component {
  state = { // tslint:disable-line
    authenticated: !!user,
    fetching: false,
    message: null,
    token: token, // tslint:disable-line
    user: user, // tslint:disable-line
  };

  logginUser: any = async (username: string, password: string) => { // tslint:disable-line
    this.setState({ fetching: true });
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

    if (loginUser && !loginUser.loggedin) {
      this.setState({ message: loginUser, fetching: false });
    }

    if (loginUser && loginUser.loggedin) {
      const { user, token } = loginUser; // tslint:disable-line
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
      this.setState({ user, token, fetching: false, authenticated: true });
    }
  }

  loggoutUser = async () => { // tslint:disable-line
    localStorage.removeItem("user");
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
