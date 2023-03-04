import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import "./WithdrawalPage.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

import AmountInput from "../../components/AmountInput/AmountInput";
import ApprovalModal from "../../components/ApprovalModal/ApprovalModal";
import AvailableBalanceInput from "../../components/AvailableBalanceInput/AvailableBalanceInput";
import Content from "../../components/Content/Content";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import FinalModal from "../../components/FinalModal/FinalModal";
import NavBar from "../../components/NavBar/NavBar";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import SubmitButtons from "../../components/SubmitButtons/SubmitButtons";

function WithdrawalPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const accounts = location.state?.accounts;
  const user = JSON.parse(Cookies.get("userInfo"));
  let dataWithdrawal = {};

  const [selectedSourceAccount, setSelectedSourceAccount] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [amountToWithdrawal, setAmountToWithdrawal] = useState("");
  const [errorInputAmount, setErrorInputAmount] = useState("");
  const [selectedWithdrawalPoint, setselectedWithdrawalPoint] = useState("");
  const [validForm, setValidForm] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [operationStatus, setOperationStatus] = useState(false);

  useEffect(() => {
    setAvailableBalance(getAvailableBalance());
    validateForm();
  }, [
    selectedSourceAccount,
    availableBalance,
    amountToWithdrawal,
    selectedWithdrawalPoint,
    errorInputAmount,
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

  function onChangeAmountToWithdrawal(e) {
    setAmountToWithdrawal(parseFloat(e.target.value));
  }

  function handleInputAmount() {
    if (amountToWithdrawal === "") {
      return;
    }

    const numericAvailableBalance = parseFloat(
      availableBalance.replace(/[^0-9.]/g, "")
    );
    const numericAmountToDeposit = parseFloat(amountToWithdrawal);

    if (
      numericAmountToDeposit < 20000 ||
      numericAmountToDeposit > numericAvailableBalance ||
      !/^[0-9]+(\.[0-9]{1,2})?$/.test(amountToWithdrawal)
    ) {
      setErrorInputAmount(
        "El monto a retirar debe ser un número mayor o igual a 20000 y no debe ser mayor que el saldo disponible."
      );
    } else {
      setErrorInputAmount("");
    }
  }

  function onChangeWithdrawalPoint(e) {
    setselectedWithdrawalPoint(e.target.value);
  }

  function validateForm() {
    if (
      selectedSourceAccount !== "" &&
      availableBalance !== "" &&
      amountToWithdrawal !== "" &&
      errorInputAmount === "" &&
      selectedWithdrawalPoint !== ""
    ) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }

  async function withdrawal(dataWithdrawal) {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const url = "http://localhost:8081/api/transaction/withdrawal";
    const response = await axios.post(url, dataWithdrawal, { headers });
    return response.data;
  }

  const handleCloseApprovalModal = () => setShowApprovalModal(false);

  const handleOpenApprovalModal = (e) => {
    e.preventDefault();
    setShowApprovalModal(true);
  };

  const handleSaveApprovalModal = async () => {
    dataWithdrawal = {
      amount: amountToWithdrawal,
      date: new Date(),
      userId: user.id,
      sourceAccount: selectedSourceAccount,
      withdrawalPointId: parseInt(selectedWithdrawalPoint),
    };

    let withdrawalResponse;
    try {
      withdrawalResponse = await withdrawal(dataWithdrawal);
    } catch (error) {
      withdrawalResponse = false;
    }

    setOperationStatus(withdrawalResponse ? true : false);
    handleCloseApprovalModal();
    setShowFinalModal(true);
  };

  const handleCloseFinalModal = () => {
    setShowFinalModal(false);
    setSelectedSourceAccount("");
    setAvailableBalance("");
    setAmountToWithdrawal("");
    setselectedWithdrawalPoint("");
    setValidForm(false);
    setOperationStatus(false);
    navigate("/home");
  };

  return (
    <div>
      <NavBar accounts={accounts} />
      <Content>
        <SectionTitle title="Retiro"></SectionTitle>
        <Form className="px-5 mt-4">
          <Row className="justify-content-center align-items-center">
            <Col md={5}>
              <CustomSelect
                className="text-start"
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
                controlId="availableBalanceInputFormWithdrawal"
                value={getAvailableBalance()}
              />
            </Col>
          </Row>
          <Row className="justify-content-center mb-3">
            <Col md={5}>
              <AmountInput
                controlId="amountToWithdrawalInput"
                label="Monto a retirar"
                name="amountToWithdrawalInput"
                placeholder="Ingresa el valor del monto a retirar"
                value={amountToWithdrawal || ""}
                onChange={onChangeAmountToWithdrawal}
                onBlur={handleInputAmount}
                onKeyUp={handleInputAmount}
                errorInputAmount={errorInputAmount}
              />
            </Col>
            <Col md={5}>
              <CustomSelect
                className="mt-3 ms-auto text-start"
                controlId="withdrawalPointInput"
                label="Seleccione el punto de retiro"
                value={selectedWithdrawalPoint}
                onChange={onChangeWithdrawalPoint}
                disabled={false}
                options={[
                  { value: "", label: "--" },
                  { value: "1", label: "Grupo Exito" },
                  { value: "2", label: "Puntored" },
                  { value: "3", label: "Efecty" },
                  { value: "4", label: "La Rebaja" },
                  { value: "5", label: "Red Servi" },
                  { value: "6", label: "Multipagas" },
                  { value: "7", label: "Practigiros" },
                  { value: "8", label: "Megared" },
                ]}
              />
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
          headerColor="bg-warning "
          titleIcon="bi bi-exclamation-triangle-fill me-3"
          title="Esta seguro de realizar el retiro?"
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
          title={operationStatus ? "Retiro Exitoso" : "Error"}
          content={
            operationStatus
              ? "El retiro se ha realizado con éxito"
              : "Ha ocurrido un error tratando de realizar el retiro"
          }
        />
      </Content>
    </div>
  );
}

export default WithdrawalPage;
