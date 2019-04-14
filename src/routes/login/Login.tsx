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
      <h1>Innskráning</h1>
      <Input text="Notendanafn:" type="text" name="userName" />
      <Input text="Lykilorð:" type="password" name="password" />
      <Button onClick={hallo}>Skrá inn</Button>
      <Link to="/register">Nýskráning</Link>
    </React.Fragment>
  );
}
