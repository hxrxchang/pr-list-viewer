import React from 'react';
import { Axios } from 'axios-observable';
import { map } from 'rxjs/operators';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { useTokenQuery as fetchToken } from '../queries/token-query';

const baseUrl = 'https://api.github.com';

const fetchPullRequests = async (
  teamName: string,
  reposotoryName: string,
  baseBranch: string
) => {
  const url = `${baseUrl}/repos/${teamName}/${reposotoryName}/pulls?base=${baseBranch}`;
  return Axios.get(url, {
    headers: {
      Authorization: `Bearer ${fetchToken()}`
    }
  })
    .pipe(map(respnse => respnse.data))
    .toPromise();
};

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

  const onSubmit = handleSubmit(({ teamName, repositoryName, baseBranch }) => {
    fetchPullRequests(teamName, repositoryName, baseBranch).then(res =>
      console.log(res)
    );
  });

  return (
    <Container>
      <h1>SearchPage work</h1>
      <form onSubmit={onSubmit}>
        <input
          name="teamName"
          ref={register({ required: true })}
          placeholder="GitHub Team Name"
        />
        {errors.teamName && <p className="error-message">token is required</p>}
        <br />
        <input
          name="repositoryName"
          ref={register({ required: true })}
          placeholder="repository name"
        />
        {errors.repositoryName && (
          <p className="error-message">token is required</p>
        )}
        <br />
        <input
          name="baseBranch"
          ref={register({ required: true })}
          placeholder="base branch"
        />
        {errors.baseBranch && (
          <p className="error-message">token is required</p>
        )}
        <br />
        <button type="submit">submit</button>
      </form>
    </Container>
  );
};

export default SearchPage;
