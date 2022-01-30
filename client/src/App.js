import { useState, useEffect } from 'react';
import api from './utils/api';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const { data } = await api.get('/todos');
      setTodos(Object.values(data));

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && todos.length === 0 && <p>No todos</p>}
      {!isLoading && todos.length > 0 && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.task}>{todo.task}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
