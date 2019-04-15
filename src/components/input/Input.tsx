import React from 'react';

import './Input.scss';

interface props {
  name: string;
  type: string;
  text: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: props) {
  return (
    <React.Fragment>
      <label htmlFor={props.name}>{props.text}</label>
      <input onChange={props.onChange} type={props.type} name={props.name} />
    </React.Fragment>
  );
}
