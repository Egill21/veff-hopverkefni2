import React, { Children } from 'react';
import { Link } from 'react-router-dom';

import Input from './../../components/input/Input';
import Button from './../../components/button/Button';

import './Register.scss';

export default function Register() {
  async function makeUser() {
    console.log('hallo');
  }
  return (
    <React.Fragment>
      <div className="register__container">
        <h1 className="register__title">Nýskráning</h1>
        <Input name="userName" type="text" text="Notendanafn:" />
        <Input name="password" type="password" text="Lykilorð:" />
        <Input name="email" type="email" text="Netfang:" />
        <Button onClick={makeUser} className="register__button">Nýskrá</Button>
        <Link to="/login" className="register__login">Innskráning</Link>
      </div>
    </React.Fragment>
  );
}
