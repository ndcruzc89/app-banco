import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function BackButton(props) {
  const navigate = useNavigate();

  function back() {
    navigate("/home");
  }

  return (
    <Button variant="danger" className={props.className} onClick={() => back()}>
      Volver
    </Button>
  );
}

export default BackButton;
