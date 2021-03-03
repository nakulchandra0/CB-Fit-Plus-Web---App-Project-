import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import saga from './saga';
import reducer from './reducer';

import Instructor from '../../components/Instructor';
import { requestInstructor, requestDeleteInstructor } from './actions';

class InstructorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      show: false,
      isFilter: false,
      userId: '',
      id: '',
      name: '',
      email: '',
      phone: '',
      gender: '',
      status: '',
    };
  }

  componentDidMount() {
    const { page, limit } = this.state;
    this.props.requestInstructor({ page, limit });
  }

  componentDidUpdate(prevProps) {
    const { deleteInstructor } = this.props;
    const { deleteInstructor: prevAddCategory } = prevProps;
    if (
      deleteInstructor &&
      prevAddCategory !== deleteInstructor &&
      !deleteInstructor.loading
    ) {
      if (deleteInstructor.success) {
        const { page, limit } = this.state;
        this.props.requestInstructor({ page, limit });
      }
    }
  }

  handleLimitChange = e => {
    this.setState({ limit: e, page: 1 }, () => this.handleFilter());
  };

  handlePageChange = e => {
    this.setState({ page: e + 1 }, () => this.handleFilter());
  };

  handleDelete = userId => {
    if (userId) {
      this.setState(prevState => ({ userId, show: !prevState.show }));
    } else {
      this.setState(prevState => ({ show: !prevState.show }));
    }
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
      isFilter: false,
    });
    this.props.requestInstructor({ page: 1, limit });
  };

  handleFilter = () => {
    const {
      id,
      name,
      email,
      phone,
      gender,
      status,
      limit,
      page,
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
        status,
        page,
        limit,
      };
    } else {
      data = { page, limit };
    }
    this.props.requestInstructor(data);
  };

  handleSearch = event => {
    this.setState({ page: 1, isFilter: true }, () => this.handleFilter());
    event.preventDefault();
  };

  deleteFile = () => {
    const { userId } = this.state;
    this.setState({ show: false }, () => {
      this.props.requestDeleteInstructor({ id: userId });
    });
  };

  handleRedirect = path => {
    const { history } = this.props;
    history.push(path);
  };

  render() {
    const { instructorList } = this.props;
    return (
      <Fragment>
        <Instructor
          state={this.state}
          instructorList={instructorList}
          handleDelete={this.handleDelete}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handleReset={this.handleReset}
          handleLimitChange={this.handleLimitChange}
          handleRedirect={this.handleRedirect}
          handlePageChange={this.handlePageChange}
          handleSearch={this.handleSearch}
          deleteFile={this.deleteFile}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { instructor, language } = state;
  return {
    instructor,
    instructorList:
      instructor && instructor.instructor && instructor.instructor,
    deleteInstructor: instructor && instructor.deleteInstructor,
    locale: language && language.locale,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestInstructor: payload => dispatch(requestInstructor(payload)),
    requestDeleteInstructor: payload =>
      dispatch(requestDeleteInstructor(payload)),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'instructor', reducer });
const withSaga = injectSaga({ key: 'instructor', saga });

InstructorComponent.propTypes = {
  history: PropTypes.object,
  requestInstructor: PropTypes.func,
  requestDeleteInstructor: PropTypes.func,
  instructorList: PropTypes.object,
  deleteInstructor: PropTypes.object,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(InstructorComponent);
