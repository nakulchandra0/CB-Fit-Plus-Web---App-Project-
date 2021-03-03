/* eslint-disable camelcase */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import saga from '../saga';
import reducer from '../reducer';
import {
  requestUserById,
  requestBookClass,
  requestCompletedClass,
} from '../actions';
import ViewUser from '../../../components/User/ViewUser';
import { requestClass } from '../../ClassPage/actions';

class ViewUserPage extends Component {
  constructor() {
    super();
    this.state = {
      // page: 1,
      limit: 10,
      name: '',
      // email: '',
      // gender: '',
      // password: '',
      // phone: '',
      // dob: '',
      // image: [],
      // country: '',
      // address: '',
      // city: '',
      // state: '',
      // zipcode: '',
      // role: '',
      // classes_id: '',
      hasData: false,
      type: 'attend_classes',
    };
  }

  handleLimitChange = event => {
    const { type, userId } = this.state;
    this.setState({ limit: event });
    if (type === 'attend_classes') {
      this.props.requestCompletedClass({ userId, page: 1, limit: event });
    } else if (type === 'book_classes') {
      this.props.requestClass({ userId, page: 1, limit: event });
    } else if (type === 'bookmark_classes') {
      this.props.requestBookClass({ userId, page: 1, limit: event });
    }
  };

  handlePageChange = e => {
    const { limit } = this.state;
    this.props.requestCompletedClass({ page: e + 1, limit });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      user: { singleUser },
    } = nextProps;
    const data = singleUser && singleUser[0];
    const { name, hasData } = prevState;
    if (data && data.name && name !== data.name && !hasData) {
      return {
        userId: '',
        name: data.name,
        image: data.image,
        email: data.weight,
        gender: data.gender,
        phone: data.phone,
        dob: data.dob,
        country: data.country,
        state: data.state,
        address: data.country,
        city: data.country,
        classes_id: data.classes_id,
        postcode: data.country,
        hasData: true,
      };
    }
    return null;
  }

  handleRedirect = path => {
    this.setState({ type: path });
  };

  componentDidMount() {
    const {
      location: { pathname },
    } = this.props;
    if (pathname.includes('view')) {
      const splitedArr = pathname.split('/');
      const userId = splitedArr[splitedArr.length - 1];
      if (userId) {
        this.setState({ userId });
        this.props.requestBookClass({ userId });
        this.props.requestClass({ userId });
        this.props.requestUserById({ userId });
        this.props.requestCompletedClass({ userId });
      }
    }
  }

  render() {
    const {
      singleUser,
      singleClass,
      bookmarkClass,
      bookClass,
      completedClass,
      user,
    } = this.props;
    const { type } = this.state;
    return (
      <Fragment>
        <ViewUser
          state={this.state}
          singleUser={singleUser}
          singleClass={singleClass}
          bookmarkClass={bookmarkClass}
          bookClass={bookClass}
          completedClass={completedClass}
          type={type}
          handleRedirect={this.handleRedirect}
          handleLimitChange={this.handleLimitChange}
          handlePageChange={this.handlePageChange}
          user={user}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const {
    user,
    user: { singleUser },
  } = state;
  return {
    user,
    singleUser,

    singleClass: user && user.class && user.class.getClasses,

    bookClass: user && user.bookClass && user.bookClass.getClasses,
    completedClass:
      user && user.completedClass && user.completedClass.getClasses,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestUserById: payload => dispatch(requestUserById(payload)),
    requestClass: obj => dispatch(requestClass(obj)),
    requestBookClass: obj => dispatch(requestBookClass(obj)),
    requestCompletedClass: obj => dispatch(requestCompletedClass(obj)),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'user', reducer });
const withSaga = injectSaga({ key: 'user', saga });

ViewUserPage.propTypes = {
  requestUserById: PropTypes.func,
  requestClass: PropTypes.func,
  singleUser: PropTypes.object,
  singleClass: PropTypes.object,
  bookClass: PropTypes.object,
  bookmarkClass: PropTypes.object,
  completedClass: PropTypes.object,
  requestBookClass: PropTypes.func,
  requestCompletedClass: PropTypes.func,
  user: PropTypes.object,
  location: PropTypes.object,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ViewUserPage);
