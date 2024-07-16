import React, { useState } from "react";
import "./styles.css"
import api from "../../services/api"

import { FiLogIn} from "react-icons/fi"
import { Link, useLocation, useNavigate } from "react-router-dom";

//#region  Importando as imagens que usaremos
import heroesImg from "../../assets/heroes.png"
import logoImg from "../../assets/logo.svg"
//#endregion


export default function Login(){
  const location = useLocation();
  const navigate = useNavigate();

  const [ id, setId ] = useState(location.state ? location.state.id : "");

  async function handleLogin(e){
    e.preventDefault();

    try{
      const response = await api.post("/sessions", { id });

      localStorage.setItem("ong_id", id);
      localStorage.setItem("ong_name", response.data.name);
      
      navigate("/profile")

    }catch(err){
      alert("Falha ao realizar o login")
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="BeThe Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            type="text" placeholder="Sua ID"
            value={id} onChange={e => setId(e.target.value)}
          />
          <button type="submit" className="button">Entrar</button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  )
}