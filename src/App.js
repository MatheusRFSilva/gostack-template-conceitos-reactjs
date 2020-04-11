import React,{useState,useEffect} from "react";
import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories,setRepositories] = useState([]);
  useEffect(()=>{
    api.get('/repositories').then(response=>{
      setRepositories(response.data);
    })
  },[]);
  async function handleAddRepository() {
    const response = await api.post('/repositories',{
      
      title : `New Project ${Date.now()}`,
      url : "https://github.com/MatheusRFSilva/desafio-conceitos-nodejs",
      techs : ["Node.JS","JavaScript Vanilla",".Net Core","Sql Serever"]
    });
    const repositorie = response.data;
    setRepositories([...repositories,repositorie]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repositorie =>{
      if(repositorie.id !== id)return repositorie;
      return false
    }));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositore=>{
          return (
            <li key={repositore.id}>
              {repositore.title}
              <button onClick={() => handleRemoveRepository(repositore.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
