import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import saga from './saga';
import reducer from './reducer';

import Login from '../../components/Login';
import { requestLogin } from './actions';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      // eslint-disable-next-line react/no-unused-state
      show: false,
    };
  }

  componentDidUpdate(prevProps) {
    this.checkLogin();
    const { user } = this.props;
    if (user.error !== prevProps.user.error && user.isError) {
      if (user && !user.isAuthenticated) {
        this.checkError();
      }
    }
  }

  checkError = () => {
    const { user } = this.props;
    if (user && !user.isAuthenticated) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ show: true });
    }
  };

  handleError = () => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ show: false });
  };

  checkLogin = () => {
    const { user, history } = this.props;
    if (user && user.isAuthenticated) {
      history.push('/');
    }
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    if (email && password) {
      this.props.requestLogin({ email, password });
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleRedirect = path => {
    const { history } = this.props;
    history.push(path);
  };

  render() {
    const authUser = sessionStorage.getItem('userToken');
    if (authUser) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <Login
          // locale={locale}
          error={this.props.user.error}
          state={this.state}
          loading={this.props.loading}
          onSubmit={this.handleSubmit}
          handleError={this.handleError}
          onChange={this.handleChange}
          handleRedirect={this.handleRedirect}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { user, language } = state;
  return { user, locale: language && language.locale };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestLogin: user => dispatch(requestLogin(user)),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'user', reducer });
const withSaga = injectSaga({ key: 'user', saga });

LoginPage.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  requestLogin: PropTypes.func,
  user: PropTypes.object,
  history: PropTypes.object,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(LoginPage);
