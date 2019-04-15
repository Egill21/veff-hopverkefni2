import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Header.scss';

export default function Home() {
  const loggedInt: boolean = localStorage.getItem('user') === undefined;
  console.log(loggedInt);
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__title">
          <Link className="header__titleLink" to="/">
            Vefforritunarbúðin
          </Link>
        </h1>
        <div className="header__navigation">
          <NavLink className="header__link" exact to="/register">
            Nýskrá
          </NavLink>
          <NavLink className="header__link" exact to="/login">
            Innskrá
          </NavLink>
          <NavLink className="header__link" exact to="/cart">
            Karfa
          </NavLink>
          <NavLink className="header__link selected" exact to="/cart">
            Nýjar vörur
          </NavLink>
          <NavLink className="header__link" exact to="/cart">
            Flokkar
          </NavLink>
        </div>
      </div>
    </header>
  );
}
