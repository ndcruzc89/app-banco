import { fireEvent, render, screen } from "@testing-library/react";
import FinalModal from "../../components/FinalModal/FinalModal";

describe("FinalModal", () => {
  test("Renderiza sin errores", () => {
    render(<FinalModal />);
  });

  test("Muestra las props correctamente", () => {
    const props = {
      show: true,
      handleClose: jest.fn(),
      headerColor: "bg-success text-white",
      titleIcon: "bi bi-check-circle-fill me-3",
      title: "Depósito Exitoso",
      content: "El depósito se ha realizado con exito",
    };
    render(<FinalModal {...props} />);
    expect(screen.getByTestId("modal-header")).toBeInTheDocument();
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.content)).toBeInTheDocument();
  });

  test("Llama a la función handleClose al hacer clic en el botón", () => {
    const handleClose = jest.fn();
    render(<FinalModal show={true} handleClose={handleClose} />);
    fireEvent.click(screen.getByText("Cerrar"));
    expect(handleClose).toHaveBeenCalled();
  });
});
