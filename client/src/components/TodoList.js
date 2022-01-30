import TodoItem from './TodoItem';
import styles from './TodoList.module.css';

const TodoList = ({ todos }) => {
  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem key={todo.task} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
