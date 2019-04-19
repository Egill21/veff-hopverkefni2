import React, { Fragment, useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import Home from '../home/Home';
import Button from './../../components/button/Button';
import Input from './../../components/input/Input';

import { Context } from '../../User';

import './Login.scss';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let userError: boolean = false;
  let passError: boolean = false;

  function changeUserName(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function changePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function logging(logginUser: any) {
    logginUser(username, password);
  }

  return (
    <Context.Consumer>
      {({ logginUser, message, message2, user }) => {
        if (user) {
          return <Home />;
        }
        if (message) {
          userError = false;
          passError = false;
        }
        return (
          <Fragment>
            <Helmet title="Innskráning" />
            <div className="login__col">
              <h1 className="login__title">Innskráning</h1>
              {message &&
                message.map((singleError: any, i: any) => {
                  if (singleError.field === 'username') {
                    userError = true;
                  } else if (singleError.field === 'password') {
                    passError = true;
                  }
                  return (
                    <p key={i}>{`${singleError.field}, ${
                      singleError.error
                    }`}</p>
                  );
                })}
              {message2 && <p>{message2.error}</p>}
              <div className="login__input">
                <Input
                  onChange={changeUserName}
                  text="Notendanafn:"
                  type="text"
                  name="userName"
                  error={userError}
                />
                <Input
                  onChange={changePassword}
                  text="Lykilorð:"
                  type="password"
                  name="password"
                  error={passError}
                />
              </div>
              <Button
                onClick={() => logging(logginUser)}
                className="login__button"
              >
                Skrá inn
              </Button>
            </div>
            <Link to="/register" className="login__register">
              Nýskráning
            </Link>
          </Fragment>
        );
      }}
    </Context.Consumer>
  );
}
