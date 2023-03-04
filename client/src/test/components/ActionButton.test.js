import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ActionButton from "../../components/ActionButton/ActionButton";

describe("ActionButton", () => {
  it("Renderiza un botón con el label 'Continuar'", () => {
    render(<ActionButton label="Continuar" />);
    expect(screen.getByText("Continuar")).toBeInTheDocument();
  });

  it("Renderiza un botón con un variant 'success'", () => {
    render(<ActionButton variant="success" label="Continuar" />);
    const buttonElement = screen.getByRole("button", { name: /Continuar/i });
    expect(buttonElement).toHaveClass("btn-success");
  });

  it("Renderiza un botón de tipo submit", () => {
    const handleSubmit = jest.fn();
    render(
      <ActionButton type="submit" label="Submit" onClick={handleSubmit} />
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("Llama a la función onClick al producirse un evento de tipo clic en el botón", () => {
    const handleClick = jest.fn();
    render(<ActionButton label="Continuar" onClick={handleClick} />);
    const button = screen.getByText("Continuar");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("Deshabilita el botón cuando la propiedad disabled es verdadera", () => {
    render(<ActionButton label="Continuar" disabled={true} />);
    const button = screen.getByText("Continuar");
    expect(button).toBeDisabled();
  });
});
