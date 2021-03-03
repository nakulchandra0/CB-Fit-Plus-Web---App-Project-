import React from 'react';
import PulseRing from '../../images/svg/pulse-ring.svg';
import './styles.scss';

const Header = () => (
  <div className="container-fluid d-flex align-items-stretch justify-content-between">
    <div
      className="header-menu-wrapper header-menu-wrapper-left"
      id="kt_header_menu_wrapper"
    >
      <div
        id="kt_header_menu"
        className="header-menu header-menu-mobile header-menu-layout-default"
      />
    </div>
    <div className="topbar">
      <div className="dropdown">
        <div
          className="topbar-item"
          data-toggle="dropdown"
          data-offset="10px,0px"
        >
          <div className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1 pulse pulse-primary">
            <span className="svg-icon svg-icon-xl svg-icon-primary">
              <img src={PulseRing} alt="" />
            </span>
            <span className="pulse-ring" />
          </div>
        </div>
        <div className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
          <form>
            <div className="d-flex flex-column pt-12 bgi-size-cover bgi-no-repeat rounded-top">
              <h4 className="d-flex flex-center rounded-top">
                <span className="text-white">User Notifications</span>
              </h4>
            </div>
            <div className="tab-content">
              <div id="topbar_notifications_events">
                <div
                  className="navi navi-hover scroll my-4"
                  data-scroll="true"
                  data-height="300"
                  data-mobile-height="200"
                >
                  <a href className="navi-item">
                    <div className="navi-link">
                      <div className="navi-icon mr-2">
                        <i className="flaticon2-line-chart text-success" />
                      </div>
                      <div className="navi-text">
                        <div className="font-weight-bold">
                          New report has been received
                        </div>
                        <div className="text-muted">23 hrs ago</div>
                      </div>
                    </div>
                  </a>
                  <a href className="navi-item">
                    <div className="navi-link">
                      <div className="navi-icon mr-2">
                        <i className="flaticon2-analytics-1 text-success" />
                      </div>
                      <div className="navi-text">
                        <div className="font-weight-bold">
                          New customer is registered
                        </div>
                        <div className="text-muted">3 days ago</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="topbar-item">
        <div
          className="btn btn-icon btn-icon-mobile w-auto btn-clean d-flex align-items-center btn-lg px-2"
          id="kt_quick_user_toggle"
        >
          <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">
            Hi,
          </span>
          <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">
            Admin
          </span>
          <span className="symbol symbol-lg-35 symbol-25 symbol-light-primary">
            <span className="symbol-label font-size-h5 font-weight-bold">
              A
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
