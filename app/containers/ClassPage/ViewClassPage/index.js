import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import saga from '../saga';
import reducer from '../reducer';
import { requestViewClass } from '../actions';
import ViewClass from '../../../components/Class/View';

class ViewClassPage extends Component {
  componentDidMount() {
    const {
      // eslint-disable-next-line react/prop-types
      location: { pathname },
    } = this.props;
    if (pathname.includes('view')) {
      const splitedArr = pathname.split('/');
      const classId = splitedArr[splitedArr.length - 1];
      if (classId) {
        this.props.requestViewClass({ classId });
      }
    }
  }

  handleCancel = () => {
    const { history } = this.props;
    history.push('/class');
  };

  render() {
    const { viewClass } = this.props;
    return (
      <Fragment>
        <ViewClass viewClass={viewClass} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { classes } = state;
  return {
    classes,
    viewClass: classes && classes.viewClass && classes.viewClass.class,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestViewClass: payload => dispatch(requestViewClass(payload)),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'classes', reducer });
const withSaga = injectSaga({ key: 'classes', saga });

ViewClassPage.propTypes = {
  history: PropTypes.object,
  requestViewClass: PropTypes.func,
  viewClass: PropTypes.array,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ViewClassPage);
