import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import InstructorComponent from './indexComponent';
import AddInstructorPage from './AddInstructorPage';
import ViewInstructorPage from './ViewInstructorPage';

const InstructorPage = props => (
  <Switch>
    <Route
      exact
      path="/instructor"
      render={() => <InstructorComponent {...props} />}
    />
    <Route
      exact
      path="/instructor/add"
      render={() => <AddInstructorPage {...props} />}
    />
    <Route
      exact
      path="/instructor/edit/:id"
      render={() => <AddInstructorPage {...props} />}
    />
    <Route
      exact
      path="/instructor/view/:id"
      render={() => <ViewInstructorPage {...props} />}
    />
  </Switch>
);

export default withRouter(InstructorPage);
