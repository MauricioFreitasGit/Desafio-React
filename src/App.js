import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";


function App() {
  const [repository, setRepository] = useState([]);
  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepository(res.data);
    });
  }, []);
  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      id: "123",
      url: "https://github.com/Mauricio",
      title: `Desafio ReactJS`,
      techs: ["React", "Node.js"],
    });

    const repositorys = response.data
    setRepository([...repository, repositorys]);
  }

  async function handleRemoveRepository(id) {
    // TODO
   const response = await api.delete(`/repositories/${id}`);
   setRepository(repository.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repository.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
      )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
