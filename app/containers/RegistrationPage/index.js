import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { Redirect } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import saga from './saga';
import reducer from './reducer';
import Registration from '../../components/Registration';
import {
  requestRegister,
  requestVerifyOtp,
  clearVerifyOtp,
  resetRegister,
} from './actions';

class RegistrationPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      role: '',
      password: '',
      phone: '',
      code: '+91',
      isOTP: false,
      otp: '',
      isVerify: false,
    };
  }

  static getDerivedStateFromProps(newProps, state) {
    const { registerSuccess, propsIsVerify } = newProps;
    if (registerSuccess && !state.otp && !state.isOTP) {
      return {
        isOTP: true,
      };
    }
    if (!state.isVerify && propsIsVerify) {
      newProps.clearVerifyOtp();
      newProps.history.push('/login');
      return {
        isVerify: true,
      };
    }
    return state;
  }

  handleSubmit = () => {
    const { email, password, role, username, phone, code } = this.state;
    const countryCode = code.concat('', phone);
    if (username && email && password && countryCode) {
      this.props.requestRegister({
        email,
        password,
        role,
        username,
        phone: countryCode,
      });
    }
  };

  componentWillUnmount() {
    this.props.resetRegister();
  }

  handleOTP = () => {
    const { phone, isOTP, otp, code } = this.state;
    const countryCode = code.concat('', phone);
    if (countryCode && otp && isOTP) {
      const payload = {
        phone: countryCode,
        otp,
      };
      this.props.requestVerifyOtp(payload);
    }
  };

  updateState = data => {
    if (data.success) {
      this.setState({
        isOTP: true,
      });
    }
  };

  handleRedirect = path => {
    const { history } = this.props;
    history.push(path);
  };

  handleChange = (event, Selection) => {
    const { name, value } = Selection;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { phone, isOTP, otp, isVerify, code } = this.state;
    return (
      <Fragment>
        <Registration
          code={code}
          phone={phone}
          isOTP={isOTP}
          otp={otp}
          isVerify={isVerify}
          error={this.props.user.error}
          state={this.state}
          loading={this.props.loading}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          handleOTP={this.handleOTP}
          handleRedirect={this.handleRedirect}
          message={this.props.user.message}
          success={this.props.user.success}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const {
    user,
    user: { registerSuccess, isVerify: propsIsVerify },
  } = state;
  return { user, registerSuccess, propsIsVerify };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestRegister: user => dispatch(requestRegister(user)),
    resetRegister: () => dispatch(resetRegister()),
    requestVerifyOtp: user => dispatch(requestVerifyOtp(user)),
    clearVerifyOtp: () => dispatch(clearVerifyOtp()),
    dispatch,
  };
}

const withReducer = injectReducer({ key: 'user', reducer });
const withSaga = injectSaga({ key: 'user', saga });

RegistrationPage.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  requestRegister: PropTypes.func,
  resetRegister: PropTypes.func,
  user: PropTypes.object,
  success: PropTypes.bool,
  message: PropTypes.string,
  history: PropTypes.object,
  requestVerifyOtp: PropTypes.func,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(RegistrationPage);
