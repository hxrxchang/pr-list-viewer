import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useTokenQuery as fetchToken } from '../hooks/TokenQuery';

const Guard: React.FC<{
  children: React.ReactNode;
  path: string;
}> = ({ children, path }) => {
  return (
    <Route
      path={path}
      render={({ location }) =>
        fetchToken() ? (
          children
        ) : (
          <Redirect to={{ pathname: 'sign-in', state: { from: location } }} />
        )
      }
    />
  );
};

export default Guard;
