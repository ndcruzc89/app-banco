import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import AccountDetailsPage from "../pages/AccountDetailsPage/AccountDetailsPage";
import DepositPage from "../pages/DepositPage/DepositPage";
import WithdrawalPage from "../pages/WithdrawalPage/WithdrawalPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/account/:id" element={<AccountDetailsPage />} />
      <Route path="/transaction/deposit" element={<DepositPage />} />
      <Route path="/transaction/withdrawal" element={<WithdrawalPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
