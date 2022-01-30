import { useRef } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

import api from '../utils/api';
import styles from './TodoItem.module.css';
import Modal from './Modal';
import EditTodoForm from './EditTodoForm';

const TodoItem = ({ todo, setTodos }) => {
  const { id, task } = todo;

  const editModal = useRef(null);

  const deleteTodo = async () => {
    const { data } = await api.delete(`/todos/${id}`);

    setTodos(Object.values(data));
  };

  const editTodo = () => {
    editModal.current.open();
  };

  return (
    <>
      <Modal ref={editModal}>
        <EditTodoForm taskValue={task || ''} setTodos={setTodos} taskId={id} />
      </Modal>
      <li className={styles.item}>
        <p>{task}</p>
        <div className={styles.actions}>
          <MdDelete className={styles.icon} onClick={deleteTodo} />
          <MdEdit className={styles.icon} onClick={editTodo} />
        </div>
      </li>
    </>
  );
};

export default TodoItem;
