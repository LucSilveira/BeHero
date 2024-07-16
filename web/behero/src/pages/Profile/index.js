import React, { useEffect, useState } from "react";
import "./styles.css";
import api from "../../services/api.js"

import { FiPower, FiTrash2 } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom";

import logoImg from "../../assets/logo.svg";

export default function Profile() {
  const navigate = useNavigate();
  const name = localStorage.getItem("ong_name");
  const ong_id = localStorage.getItem("ong_id");

  const [ incidents, setIncidents ] = useState([]);

  useEffect(() => {
    api.get("/profile", {
      headers : {
        Authorization : ong_id 
      }
    }).then( response => {
      setIncidents(response.data.incidents);
    });
  }, [ong_id]);

  async function handleDeleteIncident(id){
    try{
      await api.delete(`/incidents/${id}`, {
        headers : { 
          Authorization : ong_id 
        }
      });

      setIncidents(incidents.filter(incidents => incidents.id !== id))

    }catch(e){
      alert('Erro ao deletar caso, tente novamente.')
    }
  }

  async function handleLogout(){
    localStorage.clear();

    navigate("/")
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Bem vinda, {name}</span>

        <Link to="/incidents/new" className="button">
          Cadastrar um novo caso
        </Link>

        <button onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {
          incidents.map( incident => (
            <li key={incident.id}>
              <strong>CASO :</strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO :</strong>
              <p>{incident.description}</p>

              <strong>VALOR:</strong>
              <p>{Intl.NumberFormat('pt-BR', { style : 'currency', currency : 'BRL' }).format(incident.value)}</p>

              <button onClick={() => handleDeleteIncident(incident.id)}>
                <FiTrash2 size={22} color="#a8a8b3" />
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
