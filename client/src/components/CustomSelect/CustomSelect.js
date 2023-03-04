import React from "react";
import { Form } from "react-bootstrap";

function CustomSelect(props) {
  

  return (
    <Form.Group className={props.className} controlId={props.controlId} data-testid={props.controlId}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Select value={props.value} onChange={props.onChange} disabled={props.disabled}>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default CustomSelect;