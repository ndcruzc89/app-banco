import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import LoginTextInput from "../../components/LoginTextInput/LoginTextInput";

describe("LoginTextInput", () => {
  it("Renderiza el input con el label 'Email'", () => {
    render(
      <LoginTextInput
        classNameGroup="login-input-group mb-3 mt-4"
        controlId="emailInput"
        label="Email"
        type="email"
        name="inputEmail"
        placeholder="Ingresa tu email"
        value=""
        onChange={() => {}}
        classNameControl="login-input"
        classNameIcon="bi bi-envelope-at-fill"
      />
    );

    const textInput = screen.getByLabelText("Email");
    expect(textInput).toBeInTheDocument();
  });

  it("Renderiza un input con el placeholder 'Ingresa tu email'", () => {
    render(
      <LoginTextInput
        classNameGroup="login-input-group mb-3 mt-4"
        controlId="emailInput"
        label="Email"
        type="email"
        name="inputEmail"
        placeholder="Ingresa tu email"
        value=""
        onChange={() => {}}
        classNameControl="login-input"
        classNameIcon="bi bi-envelope-at-fill"
      />
    );
    const textInput = screen.getByPlaceholderText("Ingresa tu email");
    expect(textInput).toBeInTheDocument();
  });
});
