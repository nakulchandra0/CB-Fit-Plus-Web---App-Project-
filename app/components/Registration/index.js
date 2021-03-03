import React from 'react';
import SignLogo from '../../images/sign_logo.png';
import '../Login/styles.scss';

const Registration = () => (
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
          <div className="login-form login-signup">
            <form
              className="form"
              noValidate="novalidate"
              id="kt_login_signup_form"
            >
              <div className="pb-13 pt-lg-0 pt-5">
                <h3 className="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
                  Sign Up
                </h3>
                <p className="text-muted font-weight-bold font-size-h4">
                  Enter your details to create your account
                </p>
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-solid h-auto py-6 px-6 rounded-lg font-size-h6"
                  type="text"
                  placeholder="Fullname"
                  name="fullname"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-solid h-auto py-6 px-6 rounded-lg font-size-h6"
                  type="email"
                  placeholder="Email"
                  name="email"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-solid h-auto py-6 px-6 rounded-lg font-size-h6"
                  type="password"
                  placeholder="Password"
                  name="password"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-solid h-auto py-6 px-6 rounded-lg font-size-h6"
                  type="password"
                  placeholder="Confirm password"
                  name="cpassword"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label className="checkbox mb-0">
                  <input type="checkbox" name="agree" />
                  <span />
                  <div className="ml-2">
                    I Agree the
                    <label htmlFor="tandc"> terms and conditions</label>.
                  </div>
                </label>
              </div>
              <div className="form-group d-flex flex-wrap pb-lg-0 pb-3">
                <button
                  type="button"
                  id="kt_login_signup_submit"
                  className="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
                >
                  Submit
                </button>
                <button
                  type="button"
                  id="kt_login_signup_cancel"
                  className="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Registration.propTypes = {};

export default Registration;
