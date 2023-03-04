import React from "react";
import { Form, FormControl } from "react-bootstrap";

function AvailableBalanceInput(props) {
  return (
    <Form.Group
      className="mt-4 mb-3 ms-auto text-start"
      controlId={props.controlId}
    >
      <Form.Label>Saldo disponible</Form.Label>
      <FormControl disabled value={props.value} />
    </Form.Group>
  );
}

export default AvailableBalanceInput;