import { useState, useEffect } from 'react';

import TodoItem from './TodoItem';
import api from '../utils/api';
import styles from './TodoList.module.css';

const TodoList = () => {
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
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && todos.length === 0 && <p>No todos</p>}
      {!isLoading && todos.length > 0 && (
        <div>
          <ul className={styles.list}>
            {todos.map((todo) => (
              <TodoItem key={todo.task} todo={todo} setTodos={setTodos} />
            ))}
          </ul>
          <button className={styles.btn}>New Todo</button>
        </div>
      )}
    </>
  );
};

export default TodoList;
