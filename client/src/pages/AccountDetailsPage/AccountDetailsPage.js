import React from "react";
import { Container } from "react-bootstrap";
import "./AccountDetailsPage.css";
import { useLocation } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";
import BackButton from "../../components/BackButton/BackButton";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

function AccountDetailsPage() {
  const location = useLocation();
  const accounts = location.state?.accounts;
  const { accountType, accountNumber, availableBalance } =
    location.state.accountDetails;

  return (
    <div>
      <NavBar accounts={accounts}/>
      <main>
        <Container className="account-container text-center">
          <SectionTitle title="Información de la cuenta"></SectionTitle>
          <div className="mt-2">
            <i class="bi bi-bank2 accountType-icon me-3"></i>
            <span className="accountType-value">{accountType}</span>
          </div>
          <div className="mt-3">
            <i className="bi bi-123 accountNumber-icon me-3"></i>
            <span className="accountNumber-value">{accountNumber}</span>
          </div>
          <div className="mt-4 mb-5">
            <p className="accountBalance-label m-0">Saldo Disponible</p>
            <span className="accountBalance-value">
              {availableBalance.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
              })}
            </span>
          </div>
          <BackButton className="p-2"/>
        </Container>
      </main>
    </div>
  );
}

export default AccountDetailsPage;
