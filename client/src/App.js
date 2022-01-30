import styles from './App.module.css';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <div className={styles.app}>
      <TodoList />
    </div>
  );
};

export default App;
