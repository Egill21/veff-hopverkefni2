import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from './../../components/input/Input';
import Button from './../../components/button/Button';
import Home from '../home/Home';

import { Context } from '../../User';

import './Login.scss';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      {({ logginUser, message, user }) => {
        if (user) {
          return (
            <Home />
          );
        }
        return (
          <div className="login__container">
            <h1 className="login__title">Innskráning</h1>
            {message && 
              <Fragment>
                {message.errors && 
                  message.errors.map((singleError, i) => {
                    return <p key={i}>{`${singleError.field}, ${singleError.error}`}</p>;
                  })
                }
              </Fragment>
            }
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
            <Button onClick={() => logging(logginUser)} className="login__button">
              Skrá inn
            </Button>
            <Link to="/register" className="login__register">
              Nýskráning
            </Link>
          </div>
        );
      }}
    </Context.Consumer>
  );
}
