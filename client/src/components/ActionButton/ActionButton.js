import React from "react";
import { Button } from "react-bootstrap";

function ActionButton(props) {
  return (
    <Button
      variant={props.variant}
      type={props.type}
      className={props.classNameButton}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <i className={props.classNameIcon}></i>
      {props.label}
    </Button>
  );
}

export default ActionButton;
