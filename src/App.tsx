import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div``;

const App: React.FC<{}> = () => {
  const [url] = useState<string>('http://localhost:3000/');
  const [count, setCount] = useState<number>(0);
  const [tasks, setTasks] = useState<string[]>([]);

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
        {tasks.map(task => (
          <p key={task}>{task}</p>
        ))}
      </div>
    </Container>
  );
};

export default App;
