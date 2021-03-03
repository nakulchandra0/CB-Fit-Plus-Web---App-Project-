import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import saga from '../saga';
import reducer from '../reducer';
import {
  requestAddInstructor,
  requestViewInstructor,
  requestInstructorClass,
  requestInstructor,
} from '../actions';
import ViewInstructor from '../../../components/Instructor/View';

class ViewInstructorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      date: '',
      recordingDate: '',
      danceClassType: '',
      difficulty: '',
      classType: '',
      duration: '',
      limit: 10,
      page: 0,
      isFilter: false,
    };
  }

  componentDidMount() {
    const { limit } = this.state;
    const {
      // eslint-disable-next-line react/prop-types
      location: { pathname },
    } = this.props;
    if (pathname.includes('view')) {
      const splitedArr = pathname.split('/');
      const userId = splitedArr[splitedArr.length - 1];
      if (userId) {
        this.setState({ userId });
        this.props.requestViewInstructor({ userId });
        this.props.requestInstructorClass({ userId, page: 1, limit });
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { addInstructor, history } = this.props;
    const { addInstructor: prevAddCategory } = prevProps;
    if (
      addInstructor &&
      prevAddCategory !== addInstructor &&
      !addInstructor.loading
    ) {
      if (addInstructor.success) {
        history.push('/instructor');
      }
    }
  }

  handleCancel = () => {
    const { history } = this.props;
    history.push('/instructor');
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleReset = () => {
    const { userId, page, limit } = this.state;
    this.setState({
      date: '',
      recordingDate: '',
      danceClassType: '',
      difficulty: '',
      classType: '',
      duration: '',
    });
    this.props.requestInstructorClass({ userId, page, limit });
  };

  handleLimitChange = e => {
    this.setState({ limit: e, page: 1 }, () => this.handleFilter());
  };

  handlePageChange = e => {
    this.setState({ page: e + 1 }, () => this.handleFilter());
  };

  handleFilter = () => {
    const {
      date,
      recordingDate,
      danceClassType,
      difficulty,
      classType,
      duration,
      userId,
      limit,
      page,
      isFilter,
    } = this.state;

    const newDate = date ? moment(date).format('MM/DD/YYYY') : '';
    const newRecordingDate = recordingDate
      ? moment(recordingDate && recordingDate).format('MM/DD/YYYY')
      : '';
    let data;
    if (isFilter) {
      data = {
        userId,
        date: newDate,
        recordingDate: newRecordingDate,
        danceClassType,
        difficulty,
        classType,
        duration,
        page,
        limit,
      };
    } else {
      data = { userId, page, limit };
    }
    this.props.requestInstructorClass(data);
  };

  handleSearch = event => {
    this.setState({ page: 1, isFilter: true }, () => this.handleFilter());
    event.preventDefault();
  };

  handleRedirect = path => {
    const { history } = this.props;
    history.push(path);
  };

  render() {
    const { viewInstructor, instructorClass, instructorCount } = this.props;
    return (
      <Fragment>
        <ViewInstructor
          handleLimitChange={this.handleLimitChange}
          handlePageChange={this.handlePageChange}
          viewInstructor={viewInstructor}
          instructorClass={instructorClass}
          handleRedirect={this.handleRedirect}
          handleChange={this.handleChange}
          handleSearch={this.handleSearch}
          handleReset={this.handleReset}
          state={this.state}
          instructorCount={instructorCount}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { instructor } = state;

  return {
    instructor,
    viewInstructor:
      instructor && instructor.viewInstructor && instructor.viewInstructor.user,
    instructorClass:
      instructor &&
      instructor.instructorClass &&
      instructor.instructorClass.getClasses,
    instructorCount:
      instructor &&
      instructor.instructorClass &&
      instructor.instructorClass.count,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestAddInstructor: obj => dispatch(requestAddInstructor(obj)),
    requestViewInstructor: payload => dispatch(requestViewInstructor(payload)),
    requestInstructorClass: payload =>
      dispatch(requestInstructorClass(payload)),
    requestInstructor: payload => dispatch(requestInstructor(payload)),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'instructor', reducer });
const withSaga = injectSaga({ key: 'instructor', saga });

ViewInstructorPage.propTypes = {
  history: PropTypes.object,
  requestViewInstructor: PropTypes.func,
  requestInstructorClass: PropTypes.func,
  viewInstructor: PropTypes.object,
  instructorClass: PropTypes.object,
  addInstructor: PropTypes.object,
  instructorCount: PropTypes.object,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ViewInstructorPage);
