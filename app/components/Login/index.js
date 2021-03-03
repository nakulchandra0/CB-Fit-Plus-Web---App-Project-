import React from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import SignLogo from '../../images/sign_logo.png';
// import dancer from '../../images/dancer.png';
import './styles.scss';

const Login = props => (
  <div className="d-flex flex-column flex-root">
    <div
      className="login login-1 d-flex flex-column flex-lg-row flex-column-fluid bg-white login-signin-on"
      id="kt_login"
    >
      <div className="login-forms login-aside d-flex flex-column flex-row-auto">
        <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <a href className="text-center mb-10">
            <img src={SignLogo} className="max-h-70px" alt="" />
          </a>
          <h3
            className="border-class font-weight-bolder text-center font-size-h4 font-size-h1-lg"
            style={{ color: 'white' }}
          >
            Discover Amazing Metronic
            <br />
            with great build tools
          </h3>
        </div>
      </div>
      <div className="login-content flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
        <div className="d-flex flex-column-fluid flex-center">
          <div className="login-form login-signin">
            <form
              className="form"
              noValidate="novalidate"
              id="kt_login_signin_form"
            >
              <div className="pb-13 pt-lg-0 pt-5">
                <h3 className="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
                  Welcome to ChoreoNation
                </h3>
              </div>
              <div className="form-group">
                <label
                  htmlFor="email"
                  className="font-size-h6 font-weight-bolder text-dark"
                >
                  Email
                </label>
                <input
                  className="form-control form-control-solid h-auto py-6 px-6 rounded-lg"
                  type="text"
                  onChange={props.onChange}
                  name="email"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <div className="d-flex justify-content-between mt-n5">
                  <label
                    htmlFor="password"
                    className="font-size-h6 font-weight-bolder text-dark pt-5"
                  >
                    Password
                  </label>
                  <a
                    href
                    className="text-primary font-size-h6 font-weight-bolder text-hover-primary pt-5"
                    id="kt_login_forgot"
                  >
                    Forgot Password ?
                  </a>
                </div>
                <input
                  className="form-control form-control-solid h-auto py-6 px-6 rounded-lg"
                  type="password"
                  name="password"
                  onChange={props.onChange}
                  autoComplete="off"
                />
              </div>
              <div className="pb-lg-0 pb-5">
                <button
                  type="button"
                  onClick={props.onSubmit}
                  id="kt_login_signin_submit"
                  className="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="d-flex justify-content-lg-start justify-content-center align-items-end py-7 py-lg-0">
          <div className="text-dark-50 font-size-lg font-weight-bolder mr-10">
            <span className="mr-1">2021©</span>
            <a
              href="evolvor.com"
              target="_blank"
              className="text-dark-75 text-hover-primary"
            >
              Evolvor
            </a>
          </div>
        </div>
      </div>
    </div>
    <SweetAlert
      show={props.state.show}
      danger
      confirmBtnText="Ok, got it!"
      confirmBtnBsStyle="primary"
      onConfirm={props.handleError}
    >
      {props.error}
    </SweetAlert>
  </div>
);

Login.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  handleError: PropTypes.func,
  state: PropTypes.object,
  error: PropTypes.string,
};

export default Login;
