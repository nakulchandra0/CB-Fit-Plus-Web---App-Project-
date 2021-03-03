import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import saga from './saga';
import reducer from './reducer';
import {
  requestUser,
  requestDeleteUser,
  requestDeactiveClass,
} from './actions';
import Users from '../../components/User';

class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      show: false,
      userId: '',
      name: '',
      email: '',
      phone: '',
      gender: '',
      id: '',
      status: '',
      subscriptionType: '',
    };
  }

  handleRedirect = path => {
    const { history } = this.props;
    history.push(path);
  };

  handleDelete = userId => {
    if (userId) {
      this.setState(prevState => ({ userId, show: !prevState.show }));
    } else {
      this.setState(prevState => ({ show: !prevState.show }));
    }
  };

  handleDeactivate = (id, isActive) => {
    if (id) {
      this.props.requestDeactiveClass({ id, isActive: !isActive });
    }
  };

  handleFilter = () => {
    const {
      id,
      name,
      email,
      phone,
      gender,
      subscriptionType,
      limit,
      page,
      status,
      isFilter,
    } = this.state;
    let data;
    if (isFilter) {
      data = {
        id,
        name,
        email,
        phone,
        gender,
        subscriptionType,
        page,
        status,
        limit,
      };
    } else {
      data = { page, limit };
    }
    this.props.requestUser(data);
  };

  onSearch = event => {
    this.setState({ page: 1, isFilter: true }, () => this.handleFilter());
    event.preventDefault();
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleReset = () => {
    const { limit } = this.state;
    this.setState({
      id: '',
      name: '',
      email: '',
      phone: '',
      gender: '',
      status: '',
      subscriptionType: '',
    });
    this.props.requestUser({ page: 1, limit });
  };

  componentDidMount() {
    const { page, limit } = this.state;
    this.props.requestUser({ page, limit });
  }

  componentDidUpdate(prevProps) {
    const { deleteUser, activeUser } = this.props;
    const {
      deleteUser: prevAddCategory,
      activeUser: prevActiveUser,
    } = prevProps;
    if (deleteUser && prevAddCategory !== deleteUser && !deleteUser.loading) {
      if (deleteUser.success) {
        const { page, limit } = this.state;
        this.props.requestUser({ page, limit });
      }
    }
    if (activeUser && prevActiveUser !== activeUser) {
      if (activeUser.success) {
        const { page, limit } = this.state;
        this.props.requestUser({ page, limit });
      }
    }
  }

  handleLimitChange = e => {
    this.setState({ limit: e, page: 1 }, () => this.handleFilter());
  };

  handlePageChange = e => {
    this.setState({ page: e + 1 }, () => this.handleFilter());
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  onDelete = () => {
    const { userId } = this.state;
    this.setState({ show: false }, () => {
      this.props.requestDeleteUser({ id: userId });
    });
  };

  render() {
    const { user, isLoading } = this.props;

    return (
      <Fragment>
        <Users
          user={user}
          isLoading={isLoading}
          state={this.state}
          handleDelete={this.handleDelete}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handleRedirect={this.handleRedirect}
          onDelete={this.onDelete}
          onSearch={this.onSearch}
          handleReset={this.handleReset}
          handleLimitChange={this.handleLimitChange}
          handlePageChange={this.handlePageChange}
          handleDeactivate={this.handleDeactivate}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { user, language } = state;
  return {
    user: user && user.user && user.user,
    locale: language && language.locale,
    activeUser: user && user.activeUser,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestUser: payload => dispatch(requestUser(payload)),
    requestDeleteUser: payload => dispatch(requestDeleteUser(payload)),
    requestDeactiveClass: payload => dispatch(requestDeactiveClass(payload)),
    dispatch,
  };
}

const withReducer = injectReducer({ key: 'user', reducer });
const withSaga = injectSaga({ key: 'user', saga });

UserComponent.propTypes = {
  isLoading: PropTypes.bool,
  requestUser: PropTypes.func,
  user: PropTypes.object,
  history: PropTypes.object,
  requestDeleteUser: PropTypes.func,
  requestDeactiveClass: PropTypes.func,
  deleteUser: PropTypes.object,
  activeUser: PropTypes.object,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(UserComponent);
