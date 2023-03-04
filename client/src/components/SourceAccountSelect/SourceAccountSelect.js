import React from "react";
import { Form } from "react-bootstrap";

function SourceAccountSelect(props) {
  return (
    <Form.Group
      className="mt-4 mb-3 text-start"
      controlId={props.controlId}
    >
      <Form.Label className="">No Cuenta de Origen</Form.Label>
      <Form.Select
        value={props.value}
        onChange={props.onChange}
      >
        <option value="">--</option>
        {props.accounts &&
          props.accounts.map((account) => (
            <option key={account.id} value={account.accountNumber}>
              {`#${account.accountNumber}`}
            </option>
          ))}
      </Form.Select>
    </Form.Group>
  );
}

export default SourceAccountSelect;
