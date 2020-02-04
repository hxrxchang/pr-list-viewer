import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignInPage from '../pages/SignIn';
import SearchPage from '../pages/Search';
import Guard from './Guard';

const Routes: React.FC<{}> = () => {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/sign-in" component={SignInPage} />
        <Guard path="/">
          <SearchPage />
        </Guard>
      </Switch>
    </Router>
  );
};

export default Routes;
