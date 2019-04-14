import React from 'react';
import { Link } from 'react-router-dom';
import Input from './../../components/input/Input';
import Button from './../../components/button/Button';

import './Login.scss';

export default function Login() {
  function hallo() {
    console.log('LOGIN');
  }
  return (
    <React.Fragment>
      <div className="login__container">
        <h1 className="login__title">Innskráning</h1>
        <div className="login__input">
          <Input text="Notendanafn:" type="text" name="userName" />
          <Input text="Lykilorð:" type="password" name="password" />
        </div>
        <Button onClick={hallo} className="login__button">Skrá inn</Button>
        <Link to="/register" className="login__register">Nýskráning</Link>
      </div>
    </React.Fragment>
  );
}
