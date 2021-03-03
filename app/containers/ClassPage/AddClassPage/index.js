import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SimpleReactValidator from 'simple-react-validator';
import saga from '../saga';
import reducer from '../reducer';
import {
  requestAddClass,
  requestClass,
  requestViewClass,
  requestInstructor,
} from '../actions';
import AddClass from '../../../components/Class/Add';

class AddClassPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sneakPeek: [],
      forAir: [],
      // eslint-disable-next-line react/no-unused-state
      isEdit: false,
      airDate: '',
      time: '',
      recordingDate: '',
      recordingTime: '',
      classType: '',
      duration: '',
      staffComments: '',
      difficulty: '',
      songAndArtist: '',
      instructorName: '',
      danceClassType: '',
      show: false,
      editclassId: '',
      sneckpickId: '',
      airingId: '',
      isTransCodingSneakPeek: false,
      isTransCoding: false,
    };
  }

  validator = new SimpleReactValidator({});

  static getDerivedStateFromProps(newProps, state) {
    const { loading, singleClass } = newProps;
    const { isEdit } = state;
    if (singleClass && !loading && isEdit && !state.instructorName) {
      return {
        sneakPeek: singleClass.sneakPeek || [],
        forAir: singleClass.forAir || [],
        isEdit: false,
        airDate: singleClass.date || '',
        time: singleClass.airTime || '',
        recordingDate: singleClass.recordingDate || '',
        recordingTime: singleClass.recordingTime || '',
        classType: singleClass.classType || '',
        duration: singleClass.duration || '',
        instructorName: singleClass.instructorId || '',
        staffComments: singleClass.staffComments || '',
        difficulty: singleClass.difficulty || '',
        songAndArtist: singleClass.songAndArtist || '',
        danceClassType: singleClass.danceClassType || '',
      };
    }

    return state;
  }

  componentDidMount() {
    this.props.requestInstructor();
    const {
      // eslint-disable-next-line react/prop-types
      location: { pathname },
    } = this.props;
    if (pathname.includes('edit')) {
      const splitedArr = pathname.split('/');
      const classId = splitedArr[splitedArr.length - 1];
      if (classId) {
        // eslint-disable-next-line react/no-unused-state
        this.setState({ isEdit: true, editclassId: classId });
        this.props.requestViewClass({ classId });
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { addClasses } = this.props;
    const { addClasses: prevAddClasses } = prevProps;
    if (addClasses && prevAddClasses !== addClasses && !addClasses.loading) {
      if (addClasses.success) {
        this.handleError();
      }
      if (!addClasses.success) {
        this.handleError();
      }
    }
  }

  handleError = () => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ show: true });
  };

  handleModal = () => {
    const { show } = this.state;
    const { addClasses, history } = this.props;
    this.setState({ show: !show }, () => {
      if (addClasses.success) {
        history.push('/class');
      }
    });
  };

  removePhoto = i => {
    const photoArray = [...this.state.sneakPeek]; // make a separate copy of the array
    if (i !== -1) {
      const deletedImg = photoArray[i];
      photoArray.splice(i, 1);
      // eslint-disable-next-line no-underscore-dangle
      if (deletedImg._id) {
        const { deletedFiles } = this.state;
        this.setState({
          sneakPeek: photoArray,
          deletedFiles: deletedFiles.concat(deletedImg.filename),
        });
      } else {
        this.setState({ sneakPeek: photoArray });
      }
    }
  };

  removePhotoAir = i => {
    const photoArray = [...this.state.forAir]; // make a separate copy of the array
    if (i !== -1) {
      const deletedImg = photoArray[i];
      photoArray.splice(i, 1);
      // eslint-disable-next-line no-underscore-dangle
      if (deletedImg._id) {
        const { deletedFiles } = this.state;
        this.setState({
          forAir: photoArray,
          deletedFiles: deletedFiles.concat(deletedImg.filename),
        });
      } else {
        this.setState({ forAir: photoArray });
      }
    }
  };

  onDrop = acceptedFiles => {
    const files = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    const { sneakPeek } = this.state;
    const allImageData = sneakPeek.concat(files);
    this.setState({
      sneakPeek: [allImageData[0]],
      isTransCodingSneakPeek: true,
    });
  };

  onDropAir = acceptedFiles => {
    const files = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    const { forAir } = this.state;
    const allImageData = forAir.concat(files);
    this.setState({
      forAir: [allImageData[0]],
      isTransCoding: true,
    });
  };

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

  handleClick = () => {
    const { history } = this.props;
    history.push('/class');
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      airDate,
      time,
      recordingDate,
      recordingTime,
      classType,
      duration,
      staffComments,
      difficulty,
      songAndArtist,
      danceClassType,
      sneakPeek,
      instructorName,
      forAir,
      editclassId,
      airingId,
      sneckpickId,
      isTransCodingSneakPeek,
      isTransCoding,
    } = this.state;

    const formData = new FormData();
    if (editclassId) {
      formData.append('id', editclassId);
    }
    formData.append('role', 'INSTRUCTOR');
    formData.append('date', airDate);
    formData.append('time', time);
    formData.append('recordingDate', recordingDate);
    formData.append('recordingTime', recordingTime);
    formData.append('classType', classType);
    formData.append('duration', duration);
    formData.append('songAndArtist', songAndArtist);
    formData.append('userId', instructorName);
    formData.append('difficulty', difficulty);
    formData.append('staffComments', staffComments);
    formData.append('danceClassType', danceClassType);
    if (typeof forAir === 'object' || typeof forAir.length > 0) {
      formData.append('videoForAiring', forAir[0] || airingId);
    }
    if (isTransCodingSneakPeek) {
      formData.append('isTransCodingSneakPeek', isTransCodingSneakPeek);
    }
    if (isTransCoding) {
      formData.append('isTransCoding', isTransCoding);
    }
    if (typeof sneakPeek === 'object' || typeof sneakPeek.length > 0) {
      formData.append('videoForSneakPeek', sneakPeek[0] || sneckpickId);
    }

    if (this.validator.allValid()) {
      this.props.requestAddClass({ editclassId, formData });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const { instructor, addClasses } = this.props;
    return (
      <Fragment>
        <AddClass
          isLoading={addClasses && addClasses.success}
          message={addClasses && addClasses.message}
          isSuccess={addClasses && addClasses.success}
          handleSubmit={this.handleSubmit}
          handleCancel={this.handleCancel}
          handleChange={this.handleChange}
          onImageChange={this.onImageChange}
          handleModal={this.handleModal}
          onDrop={this.onDrop}
          onDropAir={this.onDropAir}
          removePhotoAir={this.removePhotoAir}
          removePhoto={this.removePhoto}
          state={this.state}
          instructor={instructor}
          handleClick={this.handleClick}
          addClasses
          validator={this.validator}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { classes } = state;
  return {
    classes,
    addClasses: classes && classes.addClass,
    instructor: classes && classes.instructor && classes.instructor.data,
    singleClass: classes && classes.viewClass && classes.viewClass.class,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestAddClass: obj => dispatch(requestAddClass(obj)),
    requestClass: payload => dispatch(requestClass(payload)),
    requestViewClass: payload => dispatch(requestViewClass(payload)),
    requestInstructor: () => dispatch(requestInstructor()),

    dispatch,
  };
}
const withReducer = injectReducer({ key: 'classes', reducer });
const withSaga = injectSaga({ key: 'classes', saga });

AddClassPage.propTypes = {
  history: PropTypes.object,
  requestAddClass: PropTypes.func,
  requestViewClass: PropTypes.func,
  addClasses: PropTypes.object,
  requestInstructor: PropTypes.object,
  instructor: PropTypes.object,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(AddClassPage);
