import { MdDelete, MdEdit } from 'react-icons/md';

import styles from './TodoItem.module.css';

const TodoItem = ({ todo }) => {
  const { task } = todo;

  return (
    <li className={styles.item}>
      <p>{task}</p>
      <div className={styles.actions}>
        <MdDelete className={styles.icon} />
        <MdEdit className={styles.icon} />
      </div>
    </li>
  );
};

export default TodoItem;
