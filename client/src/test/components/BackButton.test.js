import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";

describe("BackButton", () => {
  it("Renderiza sin errores", () => {
    render(
      <Router>
        <BackButton />
      </Router>
    );
    const buttonElement = screen.getByText(/Volver/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("Llama a la función navigate al hacer clic en el botón", () => {
    render(
      <Router>
        <BackButton />
      </Router>
    );
    const buttonElement = screen.getByText(/Volver/i);
    fireEvent.click(buttonElement);
    expect(window.location.pathname).toBe("/home");
  });
});
