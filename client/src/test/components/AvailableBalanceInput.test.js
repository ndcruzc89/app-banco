import React from "react";
import { render, screen } from "@testing-library/react";
import AvailableBalanceInput from "../../components/AvailableBalanceInput/AvailableBalanceInput";

describe("AvailableBalanceInput", () => {
  it("Renderiza un input con el label 'Saldo disponible'", () => {
    render(
      <AvailableBalanceInput
        controlId="availableBalanceInputFormDeposit"
        value=""
      />
    );
    const availableBalanceInput = screen.getByLabelText("Saldo disponible");
    expect(availableBalanceInput).toBeInTheDocument();
  });

  it("Renderiza un input con valor de 15000", () => {
    render(
      <AvailableBalanceInput
        controlId="availableBalanceInputFormDeposit"
        value="15000"
      />
    );
    const amountInput = screen.getByLabelText("Saldo disponible");
    expect(amountInput.value).toBe("15000");
  });
});
