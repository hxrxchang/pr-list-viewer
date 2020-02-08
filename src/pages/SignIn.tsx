import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import HeaderComponent from '../components/Header';

type FormData = {
  token: string;
};

const Container = styled.div`
  .page-content {
    padding: 0 20%;
    display: flex;
    flex-direction: column;
  }

  .token-form-wrapper {
    margin-top: 120px;
    display: flex;
    justify-content: center;
  }

  .token-form {
    width: 100%;
  }

  .form-label {
    display: block;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .token-form-input-wrapper {
    width: 80%;
    margin: 0 auto;
  }

  .token-form-input {
    display: block;
    width: 100%;
    height: 36px;
    border: 1px solid #d1d5da;
    border-radius: 0.25rem;
    font-size: 16px;
    margin-bottom: 12px;
  }

  .error-message {
    text-align: center;
    color: red;
  }

  .form-button {
    display: block;
    width: 100%;
    height: 32px;
    text-align: center;
    border: 1px solid #d1d5da;
    border-radius: 0.25rem;
    font-size: 16px;
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

const SignInPage: React.FC<{}> = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = handleSubmit(({ token }) => {
    localStorage.setItem('token', token);
    history.push('/');
  });

  return (
    <Container>
      <HeaderComponent></HeaderComponent>
      <div className="page-content">
        {/* todo: formは別コンポーネントに切り出す */}
        <div className="token-form-wrapper">
          <form className="token-form" onSubmit={onSubmit}>
            <div className="token-form-input-wrapper">
              <label className="form-label">GitHub token</label>
              <input
                className="token-form-input"
                name="token"
                type="text"
                ref={register({ required: true })}
              />
              <button type="submit" className="form-button">
                Submit
              </button>
              {errors.token && (
                <p className="error-message">token is required</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default SignInPage;
