import React from 'react';

import './Input.scss';

interface props {
  // tslint:disable-line
  name: string;
  type: string;
  text: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

export default function Input(props: props) {
  console.log(props.error !== true);
  // tslint:disable-line
  return (
    <React.Fragment>
      <div className="input__container">
        <label
          htmlFor={props.name}
          className={
            props.error !== true ? 'input__label' : 'input__label--error'
          }
        >
          {props.text}
        </label>
        <input
          onChange={props.onChange}
          type={props.type}
          name={props.name}
          className={
            props.error !== true ? 'input__input' : 'input__input--error'
          }
        />
      </div>
    </React.Fragment>
  );
}
