import { useState } from 'react';
import { Axios } from 'axios-observable';
import { map } from 'rxjs/operators';

const baseUrl = 'https://api.github.com';
type PullRequest = {
  url: string;
  title: string;
};

export function usePullRequests() {
  const [pullRequests, setPullRequests] = useState<PullRequest[] | null>(null);

  const fetchPullRequests = async (
    teamName: string,
    reposotoryName: string,
    baseBranch: string,
    token: string
  ) => {
    const url = `${baseUrl}/repos/${teamName}/${reposotoryName}/pulls?base=${baseBranch}&state=closed`;
    return Axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .pipe(map(respnse => respnse.data as PullRequest[]))
      .toPromise()
      .then(pullRequests => setPullRequests(pullRequests));
  };

  return { pullRequests, fetchPullRequests };
}
