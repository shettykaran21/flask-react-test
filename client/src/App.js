import './App.css';
import TodoList from './components/TodoList';
import UploadFile from './components/UploadFile';

const App = () => {
  return (
    <div className="app">
      <TodoList />
      <UploadFile />
    </div>
  );
};

export default App;
