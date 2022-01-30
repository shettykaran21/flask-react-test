import { MdDelete, MdEdit } from 'react-icons/md';
import api from '../utils/api';

import styles from './TodoItem.module.css';

const TodoItem = ({ todo, setTodos }) => {
  const { id, task } = todo;

  const deleteTodo = async () => {
    const { data } = await api.delete(`/todos/${id}`);

    setTodos(Object.values(data));
  };

  return (
    <li className={styles.item}>
      <p>{task}</p>
      <div className={styles.actions}>
        <MdDelete className={styles.icon} onClick={deleteTodo} />
        <MdEdit className={styles.icon} />
      </div>
    </li>
  );
};

export default TodoItem;
