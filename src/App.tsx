import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./app/home";
import Chat from "./app/chat";
import Talk from "./app/talk";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/ws/chat" element={<Chat />}></Route>
          <Route path="/ws/talk" element={<Talk />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
