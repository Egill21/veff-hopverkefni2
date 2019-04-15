import React, { Children } from 'react';
import { Link } from 'react-router-dom';

import Input from './../../components/input/Input';
import Button from './../../components/button/Button';

import './Register.scss';

export default function Register() {
  async function makeUser() {}
  return (
    <React.Fragment>
      <h1>Nýskráning</h1>
      <Input name="userName" type="text" text="Notendanafn:" />
      <Input name="password" type="password" text="Lykilorð:" />
      <Input name="email" type="email" text="Netfang:" />
      <Button onClick={makeUser}>Nýskrá</Button>
      <Link to="/login">Innskráning</Link>
    </React.Fragment>
  );
}
