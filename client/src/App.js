import { useState, useEffect } from 'react';

import TodoList from './components/TodoList';
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
    <div style={{ maxWidth: '40rem', margin: '0 auto', padding: '3rem 0' }}>
      {isLoading && <p>Loading...</p>}
      {!isLoading && todos.length === 0 && <p>No todos</p>}
      {!isLoading && todos.length > 0 && <TodoList todos={todos} />}
    </div>
  );
};

export default App;
