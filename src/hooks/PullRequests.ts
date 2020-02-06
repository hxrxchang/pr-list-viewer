import { useState } from 'react';
import { Axios } from 'axios-observable';
import { map } from 'rxjs/operators';

import { useTokenQuery as fetchToken } from './TokenQuery';

const baseUrl = 'https://api.github.com';

export function usePullRequests() {
  const [pullRequests, setPullRequests] = useState<any[]>([]);

  const fetchPullRequests = async (
    teamName: string,
    reposotoryName: string,
    baseBranch: string
  ) => {
    const url = `${baseUrl}/repos/${teamName}/${reposotoryName}/pulls?base=${baseBranch}&state=closed`;
    return Axios.get(url, {
      headers: {
        Authorization: `Bearer ${fetchToken()}`
      }
    })
      .pipe(map(respnse => respnse.data))
      .toPromise()
      .then(pullRequests => setPullRequests(pullRequests));
  };

  return { pullRequests, fetchPullRequests };
}
