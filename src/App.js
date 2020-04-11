import React, { useState, useEffect }from "react";

import api from '../src/services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])


  async function listAll() {
    const repo = await api.get("/repositories", {});
    setRepositories(repo.data);
  }

  async function handleAddRepository() {
    // TODO
    
          const response = await api.post('repositories',{
            "title": `Repositório ${Date.now()}`,
            "url": "https://github.com/thiagobarrosrj/",
            "techs": ["Node", "React", "SAP"]
          })

          const repository = response.data

          setRepositories([...repositories, repository])

  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`,{});

    const index = repositories.findIndex((repository) => repository.id === repository.id)

    if(index > -1){
      repositories.splice(index,1);
      setRepositories([...repositories])
    }


    
  }

  async function listAll(){
    const response = await api.get('repositories', {})

    const all = response.data

    setRepositories([...repositories, all])


  }

  return (
    <div>
      <ul data-testid="repository-list">
        <h1>Lista de Repositórios</h1>
        {repositories.map(repository =>
          <li key={repository.id}>{repository.title}</li>)}
          <button onClick={() => handleRemoveRepository('id')}>
            Remover
          </button>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
      
    </div>
  );
}

export default App;
