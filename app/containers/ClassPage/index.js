import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import ClassComponent from './indexComponent';
import AddClassPage from './AddClassPage';
import ViewClassPage from './ViewClassPage';

const InstructorPage = props => (
  <Switch>
    <Route exact path="/class" render={() => <ClassComponent {...props} />} />
    <Route exact path="/class/add" render={() => <AddClassPage {...props} />} />

    <Route
      exact
      path="/class/edit/:id"
      render={() => <AddClassPage {...props} />}
    />
    <Route
      exact
      path="/class/view/:id"
      render={() => <ViewClassPage {...props} />}
    />
  </Switch>
);

export default withRouter(InstructorPage);
