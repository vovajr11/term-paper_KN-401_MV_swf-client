import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '@components/Button';
import Title from './components/Title';
import Articles from './components/Articles';

const articles = [
  {
    id: uuidv4(),
    title: 'Title 1',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, harum.',
  },
  {
    id: uuidv4(),
    title: 'Title 2',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, harum.',
  },
  {
    id: uuidv4(),
    title: 'Title 3',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, harum.',
  },
];

const data = [
  {
    id: uuidv4(),
    name: 'Todo 1',
  },
  {
    id: uuidv4(),
    name: 'Todo 2',
  },
  {
    id: uuidv4(),
    name: 'Todo 3',
  },
];

interface ITodo {
  id: string;
  name: string;
}

export const Example = () => {
  const [todos, setTodo] = useState<ITodo[]>(data);
  const [todoName, setTodoName] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);

  const createTodo = () => {
    const newTodo = {
      id: uuidv4(),
      name: todoName,
      completed: false,
    };

    setTodo([...todos, newTodo]);
    setTodoName('');
  };

  const removeTodo = (id: string) => {
    const filter = todos.filter(todo => todo.id !== id);

    setTodo([...filter]);
  };

  const handleNameChange = (e: any) => {
    setTodoName(e.target.value);
  };

  useEffect(() => {
    console.log(todoName.length, 'todoName.length');

    todoName.length > 0 ? setDisabledBtn(false) : setDisabledBtn(true);
  }, [todoName.length]);

  return (
    <div>
      <Title title="TODO LIST" />

      <input type="text" value={todoName} onChange={handleNameChange} />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.name}
            <p onClick={() => removeTodo(todo.id)}>X</p>
          </li>
        ))}
      </ul>

      <Button onClick={createTodo} disabled={disabledBtn}>
        Add todo
      </Button>

      <Articles data={articles}/>
    </div>
  );
};
