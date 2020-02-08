import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { usePullRequests } from '../hooks/PullRequests';
import HeaderComponent from '../components/Header';

type SearchFormData = {
  teamName: string;
  repositoryName: string;
  baseBranch: string;
};

const Container = styled.div`
  .page-content {
    padding: 0 20%;
    display: flex;
    flex-direction: column;
  }

  .search-form-wrapper {
    margin: 20px 0 40px 0;
    display: flex;
    justify-content: center;
  }

  .search-form {
    width: 100%;
  }

  .form-label {
    display: block;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .search-form-input {
    display: block;
    width: 100%;
    height: 36px;
    border: 1px solid #d1d5da;
    border-radius: 0.25rem;
    font-size: 16px;
    margin-bottom: 12px;
  }

  .error-message {
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

  .no-result {
    text-align: center;
  }
`;

const SearchPage: React.FC<{}> = () => {
  const { register, handleSubmit, errors } = useForm<SearchFormData>();
  const { pullRequests, fetchPullRequests } = usePullRequests();

  const onSubmit = handleSubmit(({ teamName, repositoryName, baseBranch }) => {
    fetchPullRequests(teamName, repositoryName, baseBranch);
  });

  return (
    <Container>
      <HeaderComponent></HeaderComponent>
      <div className="page-content">
        {/* TODO: コンポーネント切り出し */}
        <div className="search-form-wrapper">
          <form className="search-form" onSubmit={onSubmit}>
            <div className="search-form-input-wrapper">
              <label className="form-label">Organization Name</label>
              <input
                className="search-form-input"
                name="teamName"
                ref={register({ required: true })}
              />
              {errors.teamName && (
                <p className="error-message">GitHub team name is required</p>
              )}
            </div>

            <div className="search-form-input-wrapper">
              <label className="form-label">Repository Name</label>
              <input
                className="search-form-input"
                name="repositoryName"
                ref={register({ required: true })}
              />
              {errors.repositoryName && (
                <p className="error-message">Repository name is required</p>
              )}
            </div>
            <div className="search-form-input-wrapper">
              <label className="form-label">Base Branch Name</label>
              <input
                className="search-form-input"
                name="baseBranch"
                ref={register({ required: true })}
              />

              {errors.baseBranch && (
                <p className="error-message">Base branch name is required</p>
              )}
            </div>
            <button className="form-button" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="pull-request-list">
          <code>
            {pullRequests !== null &&
              pullRequests.length !== 0 &&
              pullRequests.map(pullRequest => (
                <p key={pullRequest.title}>
                  - [{pullRequest.title}]({pullRequest.url})
                </p>
              ))}

            {pullRequests !== null && pullRequests.length === 0 && (
              <p className="no-result">No Result</p>
            )}
          </code>
        </div>
      </div>
    </Container>
  );
};

export default SearchPage;
