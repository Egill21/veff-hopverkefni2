import React, { Fragment, useState, useEffect, Props } from 'react';
import { Link } from 'react-router-dom';
import Input from './../../components/input/Input';
import Button from './../../components/button/Button';
import { loginUser } from '../../api/thunk/auth';
import { connect } from 'react-redux';
import Home from './../home/Home';
import './Login.scss';

function Login(props: {
  dispatch: any;
  isFetching: boolean;
  isAuthenticated: boolean;
  message: Array<string>;
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function changeUserName(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function changePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function getLogin() {
    const { dispatch } = props;

    dispatch(loginUser(username, password));

    // const user = loginUser(username, password);
  }

  return (
    <React.Fragment>
      <div className="login__container">
        <h1 className="login__title">Innskráning</h1>
        <div className="login__input">
          <Input
            onChange={changeUserName}
            text="Notendanafn:"
            type="text"
            name="userName"
          />
          <Input
            onChange={changePassword}
            text="Lykilorð:"
            type="password"
            name="password"
          />
        </div>
        <Button onClick={getLogin} className="login__button">
          Skrá inn
        </Button>
        <Link to="/register" className="login__register">
          Nýskráning
        </Link>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state: any) => {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message
  };
};
export default connect(mapStateToProps)(Login);
