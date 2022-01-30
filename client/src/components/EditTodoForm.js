import { useState } from 'react';
import api from '../utils/api';

import Button from './Button';
import Input from './Input';

const EditTodoForm = ({ taskValue, taskId, setTodos }) => {
  const [task, setTask] = useState(taskValue);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await api.put(
      `/todos/${taskId}`,
      JSON.stringify({ task }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    setTodos(Object.values(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="task" value={task} onChange={handleChange} />
      <Button submit>Update</Button>
    </form>
  );
};

export default EditTodoForm;
