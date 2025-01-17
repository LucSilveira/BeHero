import React, { useState, useEffect } from "react";
import "./styles.css";
import api from '../../services/api'

import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import logoImg from "../../assets/logo.svg";

export default function Register() {
  const navigate = useNavigate(); 

  const [ uf, setUf ] = useState('');
  const [ name, setName ] = useState('');
  const [ city, setCity ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ whatsapp, setWhatsapp ] = useState('');

  async function handleRegister(e){
    e.preventDefault();
    
    try{
      const response = await api.post("/ongs", {
        name, email, whatsapp, city, uf
      });
  
      alert(`Seu id de acesso ${response.data.id}`);
      navigate("/", { idOng : response.data.id });

    }catch(e){
      alert("Dados inválidos, tente novamente");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos de sua ONG.
          </p>

          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </section>

        <form action="" onSubmit={handleRegister}>
          <input
            type="text" placeholder="Nome da ONG"
            value={name} onChange={e => setName(e.target.value)}
          />

          <input
            type="email" placeholder="E-mail"
            value={email} onChange={e => setEmail(e.target.value)}
          />
          <input
            type="number" placeholder="Whatsapp"
            value={whatsapp} onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              type="text" placeholder="Cidade"
              value={city} onChange={e => setCity(e.target.value)}
            />

            <input
              type="text" placeholder="UF" style={{ width : 80, textTransform : "uppercase" }}
              value={uf} onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
