import { useState } from 'react';
import api from '../utils/api';

import Button from './Button';
import Input from './Input';

const NewTodoForm = ({ setTodos }) => {
  const [task, setTask] = useState('');

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await api.post(`/todos`, JSON.stringify({ task }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setTodos(Object.values(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="task" value={task} onChange={handleChange} />
      <Button submit>Create</Button>
    </form>
  );
};

export default NewTodoForm;
