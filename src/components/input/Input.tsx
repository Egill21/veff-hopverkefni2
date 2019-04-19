import React from "react";

import "./Input.scss";

interface props { // tslint:disable-line
  name: string;
  type: string;
  text: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: props) { // tslint:disable-line
  return (
    <React.Fragment>
      <div className="input__container">
        <label htmlFor={props.name} className="input__label">{props.text}</label>
        <input onChange={props.onChange} type={props.type} name={props.name} className="input__input" />
      </div>
    </React.Fragment >
  );
}
