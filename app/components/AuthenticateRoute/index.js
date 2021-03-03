import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import './styles.scss';
import SidebarMenu from '../SidebarMenu';
import HeaderLogo from '../../images/svg/header.svg';
import Logo from '../../images/logo-light.png';
import Footer from '../Footer';
import Header from '../Header';

const AuthenticateRoute = ({ component: Component, ...rest }) => {
  const authUser = sessionStorage.getItem('userToken');
  const isAuthenticated = authUser || false;
  const [menu, setMenu] = useState(false);

  const toggle = React.useCallback(() => setMenu(!menu), [menu, setMenu]);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <div className="body_content header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed aside-minimize-hoverable page-loading">
            <div className="header-mobile align-items-center header-mobile-fixed">
              {/* <a> */}
              <img alt="Logo" src={Logo} />
              {/* </a> */}
              <div className="d-flex align-items-center">
                <Button
                  className="btn p-0 burger-icon burger-icon-left"
                  id="kt_aside_mobile_toggle"
                  onClick={toggle}
                >
                  <span />
                </Button>
                <Button
                  className="btn p-0 burger-icon ml-4"
                  id="kt_header_mobile_toggle"
                >
                  <span />
                </Button>
                <Button
                  className="btn btn-hover-text-primary p-0 ml-2"
                  id="kt_header_mobile_topbar_toggle"
                >
                  <span className="svg-icon svg-icon-xl">
                    <img src={HeaderLogo} alt="" />
                  </span>
                </Button>
              </div>
            </div>
            <div className="d-flex flex-column flex-root">
              <div className="d-flex flex-row flex-column-fluid page">
                <SidebarMenu menu={menu} {...props} />
                <div
                  className="d-flex flex-column flex-row-fluid wrapper"
                  id="kt_wrapper"
                >
                  <div id="kt_header" className="header header-fixed">
                    <Header />
                  </div>
                  <div
                    className="content d-flex flex-column flex-column-fluid body_content"
                    id="kt_content"
                  >
                    <Component {...props} />
                  </div>
                  <div
                    className="footer bg-white py-4 d-flex flex-lg-column"
                    id="kt_footer"
                  >
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

AuthenticateRoute.propTypes = {
  component: PropTypes.func,
};
export default AuthenticateRoute;
