import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useForm } from 'react-hook-form';

type FormData = {
  token: string;
};

const Container = styled.div`
  .error-message {
    color: red;
  }
`;

const SignInPage: React.FC<{}> = () => {
  const [url] = useState<string>('http://localhost:3000/');
  const [count, setCount] = useState<number>(0);
  const [tasks, setTasks] = useState<string[]>([]);
  const { register, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = handleSubmit(({ token }) => {
    localStorage.setItem('token', token);
  });

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  const fetchTasks = () => {
    axios.get(url).then(response => {
      const tasks: string[] = response.data;
      setTasks(tasks);
    });
  };

  return (
    <Container>
      {url}
      <div>
        {count}
        <button
          onClick={() => {
            setCount(count + 1);
            fetchTasks();
          }}
        >
          click
        </button>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <input name="token" ref={register({ required: true })} />
          <button type="submit">submit</button>
          {errors.token && <p className="error-message">token is required</p>}
        </form>
      </div>

      <div>
        {tasks.map(task => (
          <p key={task}>{task}</p>
        ))}
      </div>
    </Container>
  );
};

export default SignInPage;
