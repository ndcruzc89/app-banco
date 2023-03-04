import React, { useState } from "react";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./LoginPage.css";

import ActionButton from "../../components/ActionButton/ActionButton";
import LoginTextInput from "../../components/LoginTextInput/LoginTextInput";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const navigate = useNavigate();

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  function stateAlertMessage(alertMess, alertVar) {
    setAlertMessage(alertMess);
    setAlertVariant(alertVar);

    setTimeout(() => {
      setAlertMessage("");
      setAlertVariant("");
    }, 3000);
  }

  async function login(user) {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    let url = "http://localhost:8081/api/login";
    return axios
      .post(url, user, { headers })
      .then((res) => {
        Cookies.set("userInfo", JSON.stringify(res.data));
        stateAlertMessage("Login exitoso", "success");
        return res.data;
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          stateAlertMessage(err.response.data, "danger");
        } else {
          console.log(err);
          stateAlertMessage("Ha ocurrido un error", "danger");
        }
      });
  }

  function onSubmit(e) {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    if (!user.email || !user.password) {
      stateAlertMessage("Complete todos los campos correctamente", "danger");
    } else {
      login(user).then((res) => {
        if (res) {
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        }
      });
    }
  }

  return (
    <div>
      <Container className="login-container">
        <Row className="justify-content-center">
          <Col xs="12" sm="10" md="8" lg="5" >
            <Form className="px-5" onSubmit={onSubmit}>
              <div className="logo-container text-white text-center p-2">
                <img className="logo" src={logo} alt={logo}></img>
                <h3>EsTUBANCO</h3>
              </div>
              <LoginTextInput
                classNameGroup="login-input-group mb-3 mt-4"
                controlId="emailInput"
                label="Email"
                type="email"
                name="inputEmail"
                placeholder="Ingresa tu email"
                value={email}
                onChange={onChangeEmail}
                classNameControl="login-input"
                classNameIcon="bi bi-envelope-at-fill"
              />
              <LoginTextInput
                classNameGroup="login-input-group mb-3"
                controlId="passwordInput"
                label="Contraseña"
                type="password"
                name="passwordInput"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={onChangePassword}
                classNameControl="login-input"
                classNameIcon="bi bi-shield-lock-fill"
              />
              <ActionButton
                type="submit"
                classNameButton="login-btn w-100 mt-3 mb-5"
                label="Ingresar"
              />
              <Alert variant={alertVariant}>{alertMessage}</Alert>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
