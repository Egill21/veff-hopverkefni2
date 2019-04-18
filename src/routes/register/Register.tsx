import React, { Fragment, Children, useState } from 'react';
import { Link } from 'react-router-dom';

import Input from './../../components/input/Input';
import Button from './../../components/button/Button';
import { post2 } from '../../api/index';

import './Register.scss';
import { IFieldError } from '../../api/types';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Array<IFieldError>>([]);

  let status = 200;
  let errorMessages;

  function changeUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function changePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function changeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  async function makeUser() {
    const data = {
      username: username,
      password: password,
      email: email
    };
    const response = await post2('users/register', data);
    console.log('TCL: makeUser -> response', response);

    status = response.status;
    console.log('TCL: makeUser -> status', status);
    if (status !== 200) {
      const final: IFieldError[] = response.response.errors;
      console.log(final);
      setErrors(final);
    }
  }
  return (
    <React.Fragment>
      <div className="register__col">
        <h1 className="register__title">Nýskráning</h1>
        {errors &&
          errors.map((i: IFieldError, index: number) => {
            return (
              <label className="register__errors__item" key={index}>
                {i.field}: {i.error}
              </label>
            );
          })}
        <div className="register__input">
          <Input
            onChange={changeUsername}
            name="userName"
            type="text"
            text="Notendanafn:"
          />
          <Input
            onChange={changePassword}
            name="password"
            type="password"
            text="Lykilorð:"
          />
          <Input
            onChange={changeEmail}
            name="email"
            type="email"
            text="Netfang:"
          />
          <Button onClick={makeUser} className="register__button">
            Nýskrá
        </Button>
        </div>
      </div>
      <Link to="/login" className="register__login">Innskráning</Link>
    </React.Fragment>
  );
}
