import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import UserComponent from './indexComponent';
import AddUserPage from './AddUser';
import ViewUserPage from './ViewUser';

const UserPage = props => (
  <Switch>
    <Route exact path="/users" render={() => <UserComponent {...props} />} />
    <Route
      exact
      path="/users/add-user"
      render={() => <AddUserPage {...props} />}
    />
    <Route
      exact
      path="/users/view/:id"
      render={() => <ViewUserPage {...props} />}
    />
    <Route
      exact
      path="/users/edit/:id"
      render={() => <AddUserPage {...props} />}
    />
  </Switch>
);

export default withRouter(UserPage);
