import { fireEvent, render, screen } from "@testing-library/react";
import ApprovalModal from "../../components/ApprovalModal/ApprovalModal";

describe("ApprovalModal", () => {
  test("Renderiza sin errores", () => {
    render(<ApprovalModal />);
  });

  test("Muestra las props correctamente", () => {
    const props = {
      show: true,
      handleClose: jest.fn(),
      handleSave: jest.fn(),
      headerColor: "bg-warning",
      titleIcon: "bi bi-exclamation-triangle-fill me-3",
      title: "Esta seguro de realizar el depósito?",
      content: "Puede revisar sus datos nuevamente",
    };
    render(<ApprovalModal {...props} />);
    expect(screen.getByTestId("modal-header")).toBeInTheDocument();
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.content)).toBeInTheDocument();
  });

  test("Llama a las funciones handleClose y handleSave al hacer clic en el botón", () => {
    const handleClose = jest.fn();
    const handleSave = jest.fn();
    render(
      <ApprovalModal
        show={true}
        handleClose={handleClose}
        handleSave={handleSave}
      />
    );
    fireEvent.click(screen.getByText("Cancelar"));
    expect(handleClose).toHaveBeenCalled();
    fireEvent.click(screen.getByText("Aprobar"));
    expect(handleSave).toHaveBeenCalled();
  });
});
