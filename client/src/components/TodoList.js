import { useState, useEffect, useRef } from 'react';

import api from '../utils/api';
import TodoItem from './TodoItem';
import Button from './Button';
import styles from './TodoList.module.css';
import Modal from './Modal';
import NewTodoForm from './NewTodoForm';

const TodoList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  const newTodoModal = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const { data } = await api.get('/todos');
      setTodos(Object.values(data));

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleNewTodo = () => {
    newTodoModal.current.open();
  };

  return (
    <>
      <Modal ref={newTodoModal}>
        <NewTodoForm setTodos={setTodos} />
      </Modal>
      {isLoading && <p>Loading...</p>}
      {!isLoading && todos.length === 0 && <p>No todos</p>}
      {!isLoading && todos.length > 0 && (
        <div>
          <ul className={styles.list}>
            {todos.map((todo) => (
              <TodoItem key={todo.task} todo={todo} setTodos={setTodos} />
            ))}
          </ul>
          <Button onClick={handleNewTodo}>New Todo</Button>
        </div>
      )}
    </>
  );
};

export default TodoList;
