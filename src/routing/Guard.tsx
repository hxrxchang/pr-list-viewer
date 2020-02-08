import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useTokenQuery } from '../hooks/TokenQuery';

const Guard: React.FC<{
  children: React.ReactNode;
  path: string;
}> = ({ children, path }) => {
  const { token } = useTokenQuery();
  return (
    <Route
      path={path}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect to={{ pathname: 'sign-in', state: { from: location } }} />
        )
      }
    />
  );
};

export default Guard;
