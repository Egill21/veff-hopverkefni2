import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Header.scss';

import { Context } from '../../User';

export default function Header() {

  function loggingOut(loggoutUser: any) {
    loggoutUser();
  }

  return (
    <Context.Consumer>
      {({ loggoutUser, user }) => {
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
                    <NavLink className="header__link" exact to="/register">
                      Nýskrá
                    </NavLink>
                    <NavLink className="header__link" exact to="/login">
                      Innskrá
                    </NavLink>
                  </Fragment>
                )}
                {user && (
                  <NavLink
                    onClick={() => loggingOut(loggoutUser)}
                    className="header__link"
                    exact
                    to="/login"
                  >
                    {user.username} (útskrá)
                  </NavLink>
                )}
                <NavLink className="header__link" exact to="/cart">
                  Karfa
                </NavLink>
                <NavLink className="header__link selected" exact to="/cart">
                  Nýjar vörur
                </NavLink>
                <NavLink className="header__link" exact to="/categories">
                  Flokkar
                </NavLink>
              </div>
            </div>
          </header>
        )
      }}
    </Context.Consumer>
  );
}

