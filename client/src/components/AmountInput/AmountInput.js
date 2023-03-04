import React from "react";
import { Form, FormControl } from "react-bootstrap";

function AmountInput(props) {
  return (
    <Form.Group className="mt-3 mb-4 text-start" controlId={props.controlId}>
    <Form.Label >{props.label}</Form.Label>
    <FormControl
      type="number"
      name={props.name}
      placeholder={props.placeholder}
      value={props.value|| ""}
      onChange={props.onChange}
      step="0.01"
      inputMode="decimal"
      onBlur={props.onBlur}
      onKeyUp={props.onKeyUp}
    />
    <Form.Text className="text-danger">{props.errorInputAmount}</Form.Text>
  </Form.Group>
  );

}

export default AmountInput;
