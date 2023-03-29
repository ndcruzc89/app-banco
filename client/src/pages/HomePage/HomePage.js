import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import config from '../../config/config';

import axios from "axios";
import Cookies from "js-cookie";

import "./HomePage.css";

import ActionButton from "../../components/ActionButton/ActionButton";
import NavBar from "../../components/NavBar/NavBar";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

function HomePage() {
  const [accounts, setAccounts] = useState([]);
  const user = JSON.parse(Cookies.get("userInfo"));
  const navigate = useNavigate();

  useEffect(() => {
    loadAccounts();
  }, []);

  async function loadAccounts() {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    let url = `${config.API_URL}/api/account/` + user.id;
    axios
      .get(url, { headers })
      .then((res) => {
        setAccounts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function accountDetails(accountId) {
    const account = accounts.find((acc) => acc.id === accountId);
    const accountDetails = {
      accountType: account.accountType,
      accountNumber: account.accountNumber,
      availableBalance: account.availableBalance,
    };
    navigate("/account/" + accountId, {
      state: {
        accountDetails: accountDetails,
        accounts: accounts,
        update: true,
      },
    });
  }

  function deposit() {
    navigate("/transaction/deposit", {
      state: { accounts: accounts, update: true },
    });
  }

  function withdrawal() {
    navigate("/transaction/withdrawal", {
      state: { accounts: accounts, update: true },
    });
  }

  return (
    <div>
      <NavBar accounts={accounts} />
      <main>
        <Container className="home-container text-center">
          <h1 className="d-none">EstuBanco</h1>
          <div className="home-header d-flex justify-content-center align-items-center mb-3">
            <i className="bi bi-person-fill me-4"></i>
            <h2 className="home-title text-center">
              Bienvenido(a),{" "}
              <span className="d-block d-md-inline">
                {user.name + " " + user.lastName}
              </span>
            </h2>
          </div>
          <div>
            <SectionTitle title="Mis Cuentas"></SectionTitle>
            <Table responsive striped hover className="mt-2">
              <tbody>
                {React.Children.toArray(
                  accounts.map((account) => (
                    <tr key={account.id} className="align-middle">
                      <td>{account.accountType}</td>
                      <td>{"Cuenta #" + account.accountNumber}</td>
                      <td>
                        {account.availableBalance.toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                        }) + " Disponible"}
                      </td>
                      <td>
                        <ActionButton
                          variant="success"
                          type="button"
                          classNameButton=""
                          onClick={() => accountDetails(account.id)}
                          disabled={false}
                          classNameIcon="bi bi-chevron-right"
                          label=""
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
          <div className="mb-3">
            <SectionTitle title="Operaciones"></SectionTitle>
            <div className="mt-4">
              <ActionButton
                variant="primary"
                type="button"
                classNameButton="deposit-btn border-0 me-4 p-2"
                onClick={() => deposit()}
                disabled={false}
                classNameIcon="bi bi-arrow-left-right me-2"
                label="Depósito"
              />
              <ActionButton
                variant="primary"
                type="button"
                classNameButton="withdrawal-btn border-0 p-2"
                onClick={() => withdrawal()}
                disabled={false}
                classNameIcon="bi bi-cash-coin me-2"
                label="Retiro"
              />
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}

export default HomePage;
