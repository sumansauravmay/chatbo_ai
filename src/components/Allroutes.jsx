import React from "react";
import { Route, Routes } from "react-router-dom";
import Did from "../Pages/Did";
import Chatbot from "../Pages/Chatbot";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Chatbot />}></Route>
      <Route path="/generateavatar" element={<Did />}></Route>
    </Routes>
  );
};

export default Allroutes;
