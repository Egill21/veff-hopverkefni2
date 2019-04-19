import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";

import "./Header.scss";

import { Context } from "../../User";

export default function Header() {
  function loggingOut(loggoutUser: any) {
    loggoutUser();
  }

  return (
    <Context.Consumer>
      {({ loggoutUser, user }) => { // tslint:disable-line
        return (
          <header className="header">
            <div className="header__content">
              <h1 className="header__title">
                <Link className="header__titleLink" to="/">
                  Vefforritunarbúðin
                </Link>
              </h1>
              <div className="header__navigation">
                {!user && (
                  <Fragment>
                    <NavLink activeClassName="header__link--selected" exact to="/register">
                      <p className="header__link">Nýskrá</p>
                    </NavLink>
                    <NavLink activeClassName="header__link--selected" exact to="/login">
                      <p className="header__link">Innskrá</p>
                    </NavLink>
                  </Fragment>
                )}
                {user && (
                  <Fragment>
                    <NavLink
                      onClick={() => loggingOut(loggoutUser)}
                      activeClassName="header__link--selected"
                      exact
                      to="/login"
                    >
                      <p className="header__link">{user.username} (útskrá)</p>
                    </NavLink>
                    <NavLink activeClassName="header__link--selected" exact to="/orders" >
                      <p className="header__link">Pantanir</p>
                    </NavLink>
                  </Fragment>
                )}
                <NavLink activeClassName="header__link--selected" exact to="/cart">
                  <p className="header__link">Karfa</p>
                </NavLink>
                <NavLink activeClassName="header__link--selected" exact to="/">
                  <p className="header__link">Nýjar vörur</p>
                </NavLink>
                <NavLink activeClassName="header__link--selected" exact to="/categories">
                  <p className="header__link">Flokkar</p>
                </NavLink>
              </div>
            </div>
          </header>
        );
      }}
    </Context.Consumer>
  );
}
