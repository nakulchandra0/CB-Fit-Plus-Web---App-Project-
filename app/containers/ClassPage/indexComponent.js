import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import saga from './saga';
import reducer from './reducer';

import {
  requestClass,
  requestDeleteClass,
  requestFeaturedClass,
} from './actions';
import Class from '../../components/Class';

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      isFilter: false,
      // eslint-disable-next-line react/no-unused-state
      userId: '',
      page: 1,
      limit: 10,
      instructorName: '',
      date: '',
      recordingDate: '',
      danceClassType: '',
      difficulty: '',
      classType: '',
      duration: '',
    };
  }

  componentDidMount() {
    const { limit, page } = this.state;
    this.props.requestClass({ page, limit });
  }

  componentDidUpdate(prevProps) {
    const { featuredClass } = this.props;
    const { featuredClass: prevFeaturedClass } = prevProps;
    if (featuredClass && prevFeaturedClass !== featuredClass) {
      if (featuredClass.success) {
        const { limit, page } = this.state;
        this.props.requestClass({ page, limit });
      }
    }
  }

  handleSubmit = event => {
    event.preventDefault();
  };

  handleDelete = userId => {
    if (userId) {
      // eslint-disable-next-line react/no-unused-state
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

  handleRedirect = path => {
    const { history } = this.props;
    history.push(path);
  };

  handlePageChange = e => {
    this.setState({ page: e + 1 }, () => {
      this.handleFilter();
    });
  };

  handleFeaturedClass = userId => {
    if (userId) {
      this.props.requestFeaturedClass({ id: userId });
    }
  };

  handleFilter = () => {
    const {
      instructorName,
      date,
      recordingDate,
      danceClassType,
      difficulty,
      classType,
      duration,
      limit,
      page,
      isFilter,
    } = this.state;
    let data;
    if (isFilter) {
      const newDate = date ? moment(date).format('MM/DD/YYYY') : '';
      const newRecordingDate = recordingDate
        ? moment(recordingDate && recordingDate).format('MM/DD/YYYY')
        : '';
      data = {
        instructorName,
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
      data = { page, limit };
    }
    this.props.requestClass(data);
  };

  handleLimitChange = e => {
    this.setState({ limit: e, page: 1 }, () => {
      this.handleFilter();
    });
  };

  handleReset = () => {
    const { page, limit } = this.state;
    this.setState({
      instructorName: '',
      date: '',
      recordingDate: '',
      danceClassType: '',
      difficulty: '',
      classType: '',
      duration: '',
      isFilter: false,
    });
    this.props.requestClass({ page, limit });
  };

  onDelete = () => {
    const { userId } = this.state;

    this.setState({ show: false }, () => {
      this.props.requestDeleteClass(userId);
    });
  };

  handleSearch = event => {
    this.setState({ isFilter: true, page: 1 }, () => this.handleFilter());
    event.preventDefault();
  };

  render() {
    const { classList } = this.props;
    return (
      <Fragment>
        <Class
          state={this.state}
          classList={classList}
          handleDelete={this.handleDelete}
          onDelete={this.onDelete}
          handleReset={this.handleReset}
          handleSearch={this.handleSearch}
          handleChange={this.handleChange}
          handleRedirect={this.handleRedirect}
          handleLimitChange={this.handleLimitChange}
          handlePageChange={this.handlePageChange}
          handleFeaturedClass={this.handleFeaturedClass}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { classes, language } = state;
  return {
    classes,
    classList: classes && classes.classes && classes.classes,
    locale: language && language.locale,
    featuredClass: classes && classes.featuredClass,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestClass: payload => dispatch(requestClass(payload)),
    requestDeleteClass: payload => dispatch(requestDeleteClass(payload)),
    requestFeaturedClass: payload => dispatch(requestFeaturedClass(payload)),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'classes', reducer });
const withSaga = injectSaga({ key: 'classes', saga });

ClassComponent.propTypes = {
  history: PropTypes.object,
  requestClass: PropTypes.func,
  classList: PropTypes.object,
  requestDeleteClass: PropTypes.func,
  requestFeaturedClass: PropTypes.func,
  featuredClass: PropTypes.object,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ClassComponent);
