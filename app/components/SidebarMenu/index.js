/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../images/logo-light.png';
import AngleLeft from '../../images/svg/Angle-double-left.svg';
import SideInstructor from '../../images/svg/side-instructor.svg';
import SideDashboard from '../../images/svg/side-dashboard.svg';
import SideClass from '../../images/svg/side-class.svg';
import SideReview from '../../images/svg/side-review.svg';

const SidebarMenu = props => {
  const handleItemClick = path => {
    props.history.push(path);
  };
  const pathname = props && props.match && props.match.url;
  return (
    <div
      className={`${props.menu &&
        'aside-on'} aside aside-left aside-fixed d-flex flex-column flex-row-auto`}
      id="kt_aside"
    >
      <div className="brand flex-column-auto" id="kt_brand">
        <a href="/" className="brand-logo">
          <img alt="Logo" src={logo} />
        </a>
        <button
          type="button"
          className="brand-toggle btn btn-sm px-0"
          id="kt_aside_toggle"
        >
          <span className="svg-icon svg-icon svg-icon-xl">
            <img src={AngleLeft} alt="" />
          </span>
        </button>
      </div>
      <div
        className="aside-menu-wrapper flex-column-fluid"
        id="kt_aside_menu_wrapper"
      >
        <div
          id="kt_aside_menu"
          className="aside-menu my-4"
          data-menu-vertical="1"
          data-menu-scroll="1"
          data-menu-dropdown-timeout="500"
        >
          <ul className="menu-nav">
            <li
              className={`${pathname === '/' && 'menu-item-active'} menu-item`}
              aria-haspopup="true"
              onClick={() => handleItemClick('/')}
            >
              <a className="menu-link ">
                <span className="svg-icon menu-icon">
                  <img src={SideDashboard} alt="" />
                </span>
                <span className="menu-text">Dashboard</span>
              </a>
            </li>
            <li
              className={`${pathname === '/instructor' &&
                'menu-item-active'} menu-item menu-item-submenu menu-item-her`}
              aria-haspopup="true"
              data-menu-toggle="hover"
              onClick={() => handleItemClick('/instructor')}
            >
              <a className="menu-link menu-toggle">
                <span className="svg-icon menu-icon">
                  <img src={SideInstructor} alt="" />
                </span>
                <span className="menu-text">Instructors</span>
                <i className="menu-arrow" />
              </a>
              <div className="menu-submenu">
                <i className="menu-arrow" />
                <ul className="menu-subnav">
                  <li
                    className="menu-item menu-item-parent"
                    aria-haspopup="true"
                  >
                    <span className="menu-link">
                      <span className="menu-text">Instructors</span>
                    </span>
                  </li>
                  <li className="menu-item" aria-haspopup="true">
                    <a href="/instructor" className="menu-link">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">All Instructors</span>
                    </a>
                  </li>
                  <li className="menu-item" aria-haspopup="true">
                    <a href="/instructor/add" className="menu-link">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Add Instructor</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li
              className={`${pathname === '/class' &&
                'menu-item-active'} menu-item menu-item-submenu`}
              onClick={() => handleItemClick('/class')}
              aria-haspopup="true"
              data-menu-toggle="hover"
            >
              <a className="menu-link menu-toggle">
                <span className="svg-icon menu-icon">
                  <img src={SideClass} alt="" />
                </span>
                <span className="menu-text">Class</span>
                <i className="menu-arrow" />
              </a>
              <div className="menu-submenu">
                <i className="menu-arrow" />
                <ul className="menu-subnav">
                  <li
                    className="menu-item menu-item-parent"
                    aria-haspopup="true"
                  >
                    <span className="menu-link">
                      <span className="menu-text">All Classes</span>
                    </span>
                  </li>
                  <li className="menu-item" aria-haspopup="true">
                    <a href="/class" className="menu-link">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">All Classes</span>
                    </a>
                  </li>
                  <li className="menu-item" aria-haspopup="true">
                    <a href="/class/add" className="menu-link">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Add Class</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li
              className={`${pathname === '/users' &&
                'menu-item-active'} menu-item menu-item-submenu`}
              aria-haspopup="true"
              data-menu-toggle="hover"
              onClick={() => handleItemClick('/users')}
            >
              <a className="menu-link menu-toggle">
                <span className="svg-icon menu-icon">
                  <img src={SideInstructor} alt="" />
                </span>
                <span className="menu-text">Users</span>
                <i className="menu-arrow" />
              </a>

              <div className="menu-submenu">
                <i className="menu-arrow" />
                <ul className="menu-subnav">
                  <li
                    className="menu-item menu-item-parent"
                    aria-haspopup="true"
                  >
                    <span className="menu-link">
                      <span className="menu-text">User</span>
                    </span>
                  </li>
                  <li className="menu-item" aria-haspopup="true">
                    <a href="/user" className="menu-link">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">All User</span>
                    </a>
                  </li>
                  <li className="menu-item" aria-haspopup="true">
                    <a href="/user/add" className="menu-link">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Add User</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li
              className={`${pathname === '/reviews' &&
                'menu-item-active'} menu-item`}
              aria-haspopup="true"
              onClick={() => handleItemClick('/')}
            >
              <a href="reviews" className="menu-link ">
                <span className="svg-icon menu-icon">
                  <img src={SideReview} alt="" />
                </span>
                <span className="menu-text">All Review</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

SidebarMenu.protoTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};
export default SidebarMenu;
