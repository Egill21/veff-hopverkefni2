import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { logOut } from '../../api/index';
import { connect } from 'react-redux';

import './Header.scss';
import { string } from 'prop-types';

function Header(props: {
  dispatch: any;
  isFetching: boolean;
  isAuthenticated: boolean;
  message: Array<string>;
}) {
  const { isAuthenticated } = props;
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__title">
          <Link className="header__titleLink" to="/">
            Vefforritunarbúðin
          </Link>
        </h1>
        <div className="header__navigation">
          {isAuthenticated && (
            <Fragment>
              <NavLink className="header__link" exact to="/register">
                Nýskrá
              </NavLink>
              <NavLink className="header__link" exact to="/login">
                Innskrá
              </NavLink>
            </Fragment>
          )}
          {!isAuthenticated && (
            <NavLink
              onClick={logOut}
              className="header__link"
              exact
              to="/login"
            >
              siggi{' '}
            </NavLink>
          )}
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

const mapStateToProps = (state: any) => {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message
  };
};
export default connect(mapStateToProps)(Header);
