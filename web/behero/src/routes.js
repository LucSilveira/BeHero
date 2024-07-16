import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from "./pages/Login/index";
import Register from "./pages/Register/index"
import Profile from "./pages/Profile";
import NewIncident from "./pages/NewIncident";
  
export default function RoutesHero(){
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Register />} path="/register" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<NewIncident />} path="/incidents/new" />
      </Routes>
    </BrowserRouter>
  )
}