import React from 'react';
import styled from 'styled-components';
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
  const { register, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = handleSubmit(({ token }) => {
    localStorage.setItem('token', token);
  });

  return (
    <Container>
      <div>
        <form onSubmit={onSubmit}>
          <input name="token" ref={register({ required: true })} />
          <button type="submit">submit</button>
          {errors.token && <p className="error-message">token is required</p>}
        </form>
      </div>
    </Container>
  );
};

export default SignInPage;
