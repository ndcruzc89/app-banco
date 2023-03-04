import React from "react";
import { Form } from "react-bootstrap";

function TextInput(props) {
  return (
    <Form.Group className={props.classNameGroup} controlId={props.controlId}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.email}
        onChange={props.onChange}
        className={props.classNameControl}

      />
      <i className={props.classNameIcon}></i>
    </Form.Group>
  );
}

export default TextInput;
