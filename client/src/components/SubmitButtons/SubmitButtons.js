import React from "react";

import BackButton from "../BackButton/BackButton";
import ActionButton from "../ActionButton/ActionButton";

function SubmitButtons(props) {
  return (
    <div className="d-flex justify-content-center mt-4 mb-5">
      <BackButton className="me-4" />
      <ActionButton
        variant="success"
        type="submit"
        classNameButton=""
        onClick={props.onClick}
        disabled={props.disabled}
        classNameIcon=""
        label="Continuar"
      />
    </div>
  );
}
export default SubmitButtons;
