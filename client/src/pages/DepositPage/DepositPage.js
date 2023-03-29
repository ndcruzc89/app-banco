import React, { useEffect, useState } from "react";
import { Col, Form, FormControl, Row } from "react-bootstrap";
import "./DepositPage.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import config from '../../config/config';

import AmountInput from "../../components/AmountInput/AmountInput";
import ApprovalModal from "../../components/ApprovalModal/ApprovalModal";
import AvailableBalanceInput from "../../components/AvailableBalanceInput/AvailableBalanceInput";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import Content from "../../components/Content/Content";
import FinalModal from "../../components/FinalModal/FinalModal";
import NavBar from "../../components/NavBar/NavBar";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import SubmitButtons from "../../components/SubmitButtons/SubmitButtons";

function DepositPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const accounts = location.state?.accounts;
  const user = JSON.parse(Cookies.get("userInfo"));

  const [selectedSourceAccount, setSelectedSourceAccount] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [amountToDeposit, setAmountToDeposit] = useState("");
  const [errorInputAmount, setErrorInputAmount] = useState("");
  const [sameBank, setSameBank] = useState(true);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedAccountType, setselectedAccountType] = useState("");
  const [destinationAccountPrefix, setDestinationAccountPrefix] = useState("");
  const [destinationAccountSuffix, setDestinationAccountSuffix] = useState("");
  const [errorInputDestAccSuffix, setErrorInputDestAccSuffix] = useState("");
  const [validForm, setValidForm] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [operationStatus, setOperationStatus] = useState(false);

  useEffect(() => {
    setAvailableBalance(getAvailableBalance());

    setDestinationAccountPrefix(getDestinationAccountPrefix());

    handleInputAmount();
    handleInputDestAccSuffix();
    validateForm();
  }, [
    selectedSourceAccount,
    availableBalance,
    amountToDeposit,
    destinationAccountPrefix,
    destinationAccountSuffix,
    errorInputAmount,
    errorInputDestAccSuffix,
    sameBank,
    selectedBank,
    selectedAccountType,
    validForm,
  ]);

  function onChangeSelectedSourceAccount(e) {
    setSelectedSourceAccount(e.target.value);
  }

  const getAvailableBalance = () => {
    const account =
      accounts &&
      accounts.find(
        (account) => account.accountNumber === selectedSourceAccount
      );
    return account
      ? account.availableBalance.toLocaleString("es-US", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          useGrouping: true,
          groupingSeparator: ".",
          decimalSeparator: ",",
          currencyDisplay: "symbol",
        })
      : "0";
  };

  function onChangeAmountToDeposit(e) {
    setAmountToDeposit(parseFloat(e.target.value));
  }

  function handleInputAmount() {
    if (amountToDeposit === "") {
      return;
    }

    const numericAvailableBalance = parseFloat(
      availableBalance.replace(/[^0-9.]/g, "")
    );
    const numericAmountToDeposit = parseFloat(amountToDeposit);

    if (
      numericAmountToDeposit < 1000 ||
      numericAmountToDeposit > numericAvailableBalance ||
      !/^[0-9]+(\.[0-9]{1,2})?$/.test(amountToDeposit)
    ) {
      setErrorInputAmount(
        "El monto a depositar debe ser un número mayor o igual a 1000 y no debe ser mayor que el saldo disponible."
      );
    } else {
      setErrorInputAmount("");
    }
  }

  function onChangeSameBank(e) {
    setSameBank(e.target.checked);
  }

  function onChangeSelectedBank(e) {
    if (sameBank) {
      setSelectedBank("");
    } else {
      setSelectedBank(e.target.value);
    }
  }

  function onChangeSelectedAccountType(e) {
    setselectedAccountType(e.target.value);
  }

  const destinationPrefixes = {
    "": {
      "": "",
      1: "",
      2: "",
    },
    1: {
      "": "",
      1: "111",
      2: "211",
    },
    2: {
      "": "",
      1: "112",
      2: "212",
    },
    3: {
      "": "",
      1: "113",
      2: "213",
    },
    4: {
      "": "",
      1: "114",
      2: "214",
    },
    5: {
      "": "",
      1: "115",
      2: "215",
    },
    6: {
      "": "",
      1: "116",
      2: "216",
    },
    7: {
      "": "",
      1: "117",
      2: "217",
    },
    8: {
      "": "",
      1: "118",
      2: "218",
    },
    9: {
      "": "",
      1: "119",
      2: "219",
    },
    10: {
      "": "",
      1: "120",
      2: "220",
    },
  };

  const getDestinationAccountPrefix = () => {
    const sameBankPrefixes = {
      1: "101",
      2: "201",
    };

    return sameBank
      ? sameBankPrefixes[selectedAccountType] || ""
      : destinationPrefixes[selectedBank][selectedAccountType] || "";
  };

  function onChangeDestinationAccountSuffix(e) {
    setDestinationAccountSuffix(e.target.value.replace(/\D/, ""));
  }

  function handleInputDestAccSuffix() {
    if (destinationAccountSuffix === "") {
      return;
    }
    const regex = /^\d{7}$/;
    regex.test(destinationAccountSuffix)
      ? setErrorInputDestAccSuffix("")
      : setErrorInputDestAccSuffix(
          "Debes ingresar los 7 últimos números de la cuenta"
        );
  }

  function validateForm() {
    if (
      selectedSourceAccount !== "" &&
      availableBalance !== "" &&
      amountToDeposit !== undefined &&
      errorInputAmount === "" &&
      ((sameBank && selectedAccountType !== "") ||
        (!sameBank && selectedBank !== "" && selectedAccountType !== "")) &&
      destinationAccountSuffix !== "" &&
      errorInputDestAccSuffix === ""
    ) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }

  async function deposit(dataDeposit) {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const url = `${config.API_URL}/api/transaction/deposit`;
    const response = await axios.post(url, dataDeposit, { headers });
    return response.data;
  }

  const handleCloseApprovalModal = () => setShowApprovalModal(false);

  const handleOpenApprovalModal = (e) => {
    e.preventDefault();
    setShowApprovalModal(true);
  };

  const handleSaveApprovalModal = async () => {
    const dataDeposit = {
      amount: amountToDeposit,
      date: new Date(),
      sameBank: sameBank,
      userId: user.id,
      sourceAccount: selectedSourceAccount,
      accountType: parseInt(selectedAccountType),
      destinationAccount: destinationAccountPrefix + destinationAccountSuffix,
      bankId: selectedBank !== "" ? parseInt(selectedBank) : null,
    };

    let depositResponse;
    try {
      depositResponse = await deposit(dataDeposit);
    } catch (error) {
      depositResponse = false;
    }

    setOperationStatus(depositResponse ? true : false);
    handleCloseApprovalModal();
    setShowFinalModal(true);
  };

  const handleCloseFinalModal = () => {
    setShowFinalModal(false);
    setSelectedSourceAccount("");
    setAvailableBalance("");
    setAmountToDeposit("");
    setSameBank(true);
    setSelectedBank("");
    setselectedAccountType("");
    setDestinationAccountPrefix("");
    setDestinationAccountSuffix("");
    setValidForm(false);
    setOperationStatus(false);
    navigate("/home");
  };

  return (
    <div>
      <NavBar accounts={accounts} />
      <Content>
        <SectionTitle title="Depósito"></SectionTitle>
        <Form className="px-5">
          <Row className="justify-content-center">
            <Col md={5}>
              <CustomSelect
                className="mt-4 mb-3 text-start"
                controlId="sourceAccountSelectFormDeposit"
                label="No Cuenta de Origen"
                value={selectedSourceAccount}
                onChange={onChangeSelectedSourceAccount}
                disabled={false}
                options={[
                  { value: "", label: "--" },
                  ...(accounts
                    ? accounts.map((account) => ({
                        value: account.accountNumber,
                        label: `#${account.accountNumber}`,
                      }))
                    : []),
                ]}
              />
            </Col>
            <Col md={5}>
              <AvailableBalanceInput
                controlId="availableBalanceInputFormDeposit"
                value={getAvailableBalance()}
              />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={5}>
              <AmountInput
                controlId="amountToDepositInput"
                label="Monto a depositar"
                name="amountToDepositInput"
                placeholder="Ingresa el valor del monto a depositar"
                value={amountToDeposit}
                onChange={onChangeAmountToDeposit}
                onBlur={handleInputAmount}
                onKeyUp={handleInputAmount}
                errorInputAmount={errorInputAmount}
              />
            </Col>
            <Col md={5}></Col>
          </Row>

          <Row className="justify-content-center align-items-center">
            <Col md={5}>
              <Form.Group
                className="mt-3 mb-3 text-start"
                controlId="sameBankInput"
              >
                <Form.Check
                  type="checkbox"
                  label="La cuenta destino pertenece a este mismo banco?"
                  checked={sameBank}
                  onChange={onChangeSameBank}
                />
              </Form.Group>
            </Col>
            <Col md={5}>
              <CustomSelect
                className="mb-3 ms-auto text-start"
                controlId="bankInput"
                label="Seleccione el banco de la cuenta destino"
                value={sameBank ? "" : selectedBank}
                onChange={onChangeSelectedBank}
                disabled={sameBank}
                options={[
                  { value: "", label: "--" },
                  { value: "1", label: "Banco Caja Social" },
                  { value: "2", label: "Bancolombia" },
                  { value: "3", label: "Banco AV Villas" },
                  { value: "4", label: "Banco de Bogotá" },
                  { value: "5", label: "BBVA" },
                  { value: "6", label: "Davivienda" },
                  { value: "7", label: "Banco de Occidente" },
                  { value: "8", label: "Banco Pichincha" },
                  { value: "9", label: "Bancamia" },
                  { value: "10", label: "Banco Popular" },
                ]}
              />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={5} className="mt-4">
              <CustomSelect
                className="mb-3 text-start"
                controlId="accountTypeInput"
                label="Tipo de la cuenta destino"
                value={selectedAccountType}
                onChange={onChangeSelectedAccountType}
                disabled={false}
                options={[
                  { value: "", label: "--" },
                  { value: "1", label: "Ahorros" },
                  { value: "2", label: "Corriente" },
                ]}
              />
            </Col>
            <Col md={5}>
              <Form.Group
                className="mt-4 mb-3 ms-auto text-start"
                controlId="inputDestinationAccount"
              >
                <Form.Label className="">No Cuenta a depositar</Form.Label>
                <Row className="align-items-start">
                  <Col md={3} className="mb-3 mb-md-0">
                    <FormControl
                      disabled
                      value={getDestinationAccountPrefix()}
                      className="col-md-2"
                    ></FormControl>
                  </Col>
                  <Col md={9}>
                    <FormControl
                      type="text"
                      placeholder="Ingresa el No de cuenta a depositar"
                      maxLength={7}
                      value={destinationAccountSuffix}
                      onChange={onChangeDestinationAccountSuffix}
                      onBlur={handleInputDestAccSuffix}
                      onKeyUp={handleInputDestAccSuffix}
                    ></FormControl>
                    <Form.Text className="text-danger">
                      {errorInputDestAccSuffix}
                    </Form.Text>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <SubmitButtons
            onClick={handleOpenApprovalModal}
            disabled={!validForm}
          />
        </Form>
        <ApprovalModal
          show={showApprovalModal}
          handleClose={handleCloseApprovalModal}
          handleSave={handleSaveApprovalModal}
          headerColor="bg-warning"
          titleIcon="bi bi-exclamation-triangle-fill me-3"
          title="Esta seguro de realizar el depósito?"
          content="Puede revisar sus datos nuevamente"
        />
        <FinalModal
          show={showFinalModal}
          handleClose={handleCloseFinalModal}
          headerColor={
            operationStatus ? "bg-success text-white" : "bg-danger text-white"
          }
          titleIcon={
            operationStatus
              ? "bi bi-check-circle-fill me-3"
              : "bi bi-x-circle-fill me-3"
          }
          title={operationStatus ? "Depósito Exitoso" : "Error"}
          content={
            operationStatus
              ? "El depósito se ha realizado con exito"
              : "Ha ocurrido un error tratando de realizar el depósito"
          }
        />
      </Content>
    </div>
  );
}

export default DepositPage;
