import React from "react";
import { Container } from "react-bootstrap";
import "./Content.css";

function Content(props) {
  return (
    <main>
      <Container className="main-container text-center">
        {props.children}
      </Container>
    </main>
  );
}

export default Content;
