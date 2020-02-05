import React, { useEffect } from 'react';
import { Axios } from 'axios-observable';
import { map } from 'rxjs/operators';
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

const SearchPage: React.FC<{}> = () => {
  useEffect(() => {
    fetchPullRequests(
      'hxrxchang',
      'rails-spa-cookie-session-sample',
      'master'
    ).then(res => console.log(res));
  }, []);
  return <h1>SearchPage workd</h1>;
};

export default SearchPage;
