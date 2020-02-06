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
  .error-message {
    color: red;
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
      <h1>SearchPage work</h1>
      <form onSubmit={onSubmit}>
        <input
          name="teamName"
          ref={register({ required: true })}
          placeholder="GitHub Team Name"
        />
        {errors.teamName && (
          <p className="error-message">GitHub team name is required</p>
        )}
        <br />
        <input
          name="repositoryName"
          ref={register({ required: true })}
          placeholder="repository name"
        />
        {errors.repositoryName && (
          <p className="error-message">Repository name is required</p>
        )}
        <br />
        <input
          name="baseBranch"
          ref={register({ required: true })}
          placeholder="base branch"
        />
        {errors.baseBranch && (
          <p className="error-message">BaseBranch name is required</p>
        )}
        <br />
        <button type="submit">submit</button>
      </form>
      <div>
        <code>
          {pullRequests.map(pullRequest => (
            <p key={pullRequest.title}>
              - [{pullRequest.title}]({pullRequest.url})
            </p>
          ))}
        </code>
      </div>
    </Container>
  );
};

export default SearchPage;
