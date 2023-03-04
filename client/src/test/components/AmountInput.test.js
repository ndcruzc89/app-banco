import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AmountInput from "../../components/AmountInput/AmountInput";

describe("AmountInput", () => {
  it("Renderiza un input con el label 'Monto a depositar'", () => {
    render(
      <AmountInput
        controlId="amountToDepositInput"
        label="Monto a depositar"
        name="amountToDepositInput"
        placeholder="Ingresa el valor del monto a depositar"
        value=""
        onChange={() => {}}
        onBlur={() => {}}
        onKeyUp={() => {}}
        errorInputAmount=""
      />
    );
    const amountInput = screen.getByLabelText("Monto a depositar");
    expect(amountInput).toBeInTheDocument();
  });

  it("Renderiza un input con el placeholder 'Ingresa el valor del monto a depositar'", () => {
    render(
      <AmountInput
        controlId="amountToDepositInput"
        label="Monto a depositar"
        name="amountToDepositInput"
        placeholder="Ingresa el valor del monto a depositar"
        value=""
        onChange={() => {}}
        onBlur={() => {}}
        onKeyUp={() => {}}
        errorInputAmount=""
      />
    );
    const amountInput = screen.getByPlaceholderText(
      "Ingresa el valor del monto a depositar"
    );
    expect(amountInput).toBeInTheDocument();
  });

  it("Renderiza un input con valor de 15000", () => {
    render(
      <AmountInput
        controlId="amountToDepositInput"
        label="Monto a depositar"
        name="amountToDepositInput"
        placeholder="Ingresa el valor del monto a depositar"
        value="15000"
        onChange={() => {}}
        onBlur={() => {}}
        onKeyUp={() => {}}
        errorInputAmount=""
      />
    );
    const amountInput = screen.getByLabelText("Monto a depositar");
    expect(amountInput.value).toBe("15000");
  });

  it("Llama a la función onChange al presentarse algún cambio de valor en el input", () => {
    const handleChange = jest.fn();
    render(
      <AmountInput
        controlId="amountToDepositInput"
        label="Monto a depositar"
        name="amountToDepositInput"
        placeholder="Ingresa el valor del monto a depositar"
        value=""
        onChange={handleChange}
        onBlur={() => {}}
        onKeyUp={() => {}}
        errorInputAmount=""
      />
    );
    const amountInput = screen.getByLabelText("Monto a depositar");
    fireEvent.change(amountInput, { target: { value: "15000" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("Llama a la función onBlur al perder el foco del input", () => {
    const handleBlur = jest.fn();
    render(
      <AmountInput
        controlId="amountToDepositInput"
        label="Monto a depositar"
        name="amountToDepositInput"
        placeholder="Ingresa el valor del monto a depositar"
        value=""
        onChange={() => {}}
        onBlur={handleBlur}
        onKeyUp={() => {}}
        errorInputAmount=""
      />
    );
    const amountInput = screen.getByLabelText("Monto a depositar");
    fireEvent.blur(amountInput);
    expect(handleBlur).toHaveBeenCalled();
  });

  it("Llama a la función onKeyUp al soltar una tecla mientras el foco está en el input", () => {
    const handleKeyUp = jest.fn();
    render(
      <AmountInput
        controlId="amountToDepositInput"
        label="Monto a depositar"
        name="amountToDepositInput"
        placeholder="Ingresa el valor del monto a depositar"
        value=""
        onChange={() => {}}
        onBlur={() => {}}
        onKeyUp={handleKeyUp}
        errorInputAmount=""
      />
    );
    const amountInput = screen.getByLabelText("Monto a depositar");
    fireEvent.keyUp(amountInput, { key: "a", code: 65 });
    expect(handleKeyUp).toHaveBeenCalledTimes(1);
  });

  it("Muestra un mensaje de error cuando se le pasa un string a la prop errorInputAmount", () => {
    const errorInputAmount =
      "El monto a depositar debe ser un número mayor o igual a 1000 y no debe ser mayor que el saldo disponible.";
    render(
      <AmountInput
        controlId="amountToDepositInput"
        label="Monto a depositar"
        name="amountToDepositInput"
        placeholder="Ingresa el valor del monto a depositar"
        value=""
        onChange={() => {}}
        onBlur={() => {}}
        onKeyUp={() => {}}
        errorInputAmount={errorInputAmount}
      />
    );
    const errorMessage = screen.getByText(errorInputAmount);
    expect(errorMessage).toBeInTheDocument();
  });
});
