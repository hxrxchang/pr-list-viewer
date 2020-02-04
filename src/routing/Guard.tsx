import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const Guard: React.FC<{
  children: React.ReactNode;
  path: string;
}> = ({ children, path }) => {
  return (
    <Route
      path={path}
      render={({ location }) =>
        // todo: queryを作って条件判定
        true ? (
          children
        ) : (
          <Redirect to={{ pathname: 'sign-in', state: { from: location } }} />
        )
      }
    />
  );
};

export default Guard;
