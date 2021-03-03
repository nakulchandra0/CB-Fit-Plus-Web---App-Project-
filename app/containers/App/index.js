/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import RegistrationPage from 'containers/RegistrationPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ClassPage from '../ClassPage';
import InstructorPage from '../InstructorPage';
import UserPage from '../UserPage';
import ForgotPass from '../../components/ForgotPass';
import AuthenticateRoute from '../../components/AuthenticateRoute';
import '../../Styles/globle-bundle.css';
import '../../Styles/sidebar.styles.css';
import '../../Styles/iconBundle.css';

export default function App() {
  return (
    <Fragment>
      <Switch>
        <AuthenticateRoute exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <AuthenticateRoute path="/instructor" component={InstructorPage} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/forgot" component={ForgotPass} />
        <AuthenticateRoute path="/class" component={ClassPage} />
        <AuthenticateRoute path="/users" component={UserPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Fragment>
  );
}
