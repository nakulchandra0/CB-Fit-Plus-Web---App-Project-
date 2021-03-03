import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SimpleReactValidator from 'simple-react-validator';
import saga from '../saga';
import reducer from '../reducer';
import AddInstructor from '../../../components/Instructor/Add';
import {
  requestAddInstructor,
  requestInstructor,
  requestViewInstructor,
} from '../actions';

class AddInstructorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: 'MALE',
      fullImage: [],
      image: [],
      isEdit: false,
      editUserId: '',
      name: '',
      email: '',
      phone: '',
      altPhone: '',
      dob: '',
      instaUserName: '',
      password: '',
      statement: '',
      show: false,
      passError: '',
    };
  }

  validator = new SimpleReactValidator({});

  // eslint-disable-next-line consistent-return
  static getDerivedStateFromProps(newProps, state) {
    const { singleInstructor, loading } = newProps;
    const { isEdit } = state;
    if (singleInstructor && !loading && isEdit && !state.name) {
      return {
        name: singleInstructor.name || '',
        email: singleInstructor.email || '',
        phone: singleInstructor.phone || '',
        altPhone: singleInstructor.altPhone || '',
        gender:
          singleInstructor.gender !== ''
            ? singleInstructor.gender.toUpperCase()
            : 'MALE',
        instaUserName: singleInstructor.instaUserName || '',
        password: singleInstructor.password || '',
        imagePreview: singleInstructor.image || [],
        image: singleInstructor.image || [],
        fullImage: singleInstructor.fullImage || [],
        fullImagePreview: singleInstructor.fullImage || [],
        isEdit: false,
        dob: singleInstructor.dob || '',
        statement: singleInstructor.statement || '',
      };
    }
  }

  componentDidMount() {
    const {
      // eslint-disable-next-line react/prop-types
      location: { pathname },
    } = this.props;
    if (pathname.includes('edit')) {
      const splitedArr = pathname.split('/');
      const userId = splitedArr[splitedArr.length - 1];
      if (userId) {
        this.setState({ isEdit: true, editUserId: userId });
        this.props.requestViewInstructor({ userId });
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { addInstructor } = this.props;
    const { addInstructor: prevAddCategory } = prevProps;
    if (
      addInstructor &&
      prevAddCategory !== addInstructor &&
      !addInstructor.loading
    ) {
      if (addInstructor.success) {
        this.handleError();
      } else {
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
    const { addInstructor, history } = this.props;
    this.setState({ show: !show }, () => {
      if (addInstructor.success) {
        history.push('/instructor');
      }
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

  onImageChange = event => {
    const { name } = event.target;
    if (event.target.files && event.target.files[0]) {
      this.setState({ [name]: event.target.files });
      const reader = new FileReader();
      reader.onload = e => {
        const PreviewName = `${name}Preview`;
        this.setState({ [PreviewName]: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  onImageRemove = name => {
    this.setState({ [name]: [] });
    const PreviewName = `${name}Preview`;
    this.setState({ [PreviewName]: '' });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      name,
      email,
      phone,
      altPhone,
      dob,
      gender,
      instaUserName,
      password,
      image,
      fullImage,
      statement,
      editUserId,
    } = this.state;
    const formData = new FormData();
    if (editUserId) {
      formData.append('id', editUserId);
    }
    formData.append('role', 'INSTRUCTOR');
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('altPhone', altPhone);
    formData.append('dob', dob);
    formData.append('gender', gender);
    formData.append('instaUserName', instaUserName);
    if (!editUserId) {
      formData.append('password', password);
    }
    formData.append('statement', statement);
    if (typeof image === 'object') {
      formData.append('image', image[0]);
    }
    if (typeof fullImage === 'object') {
      formData.append('fullImage', fullImage[0]);
    }
    if (!editUserId && password.length < 8) {
      this.setState({ passError: 'Please enter password atleast 8 character' });
    }
    if (this.validator.allValid()) {
      this.props.requestAddInstructor({ editUserId, formData });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const { addInstructor } = this.props;
    const { passError } = this.state;
    return (
      <Fragment>
        <AddInstructor
          validator={this.validator}
          isLoading={addInstructor && addInstructor.loading}
          isSuccess={addInstructor && addInstructor.success}
          message={addInstructor && addInstructor.message}
          handleSubmit={this.handleSubmit}
          handleCancel={this.handleCancel}
          handleChange={this.handleChange}
          onImageChange={this.onImageChange}
          handleModal={this.handleModal}
          onImageRemove={this.onImageRemove}
          state={this.state}
          passError={passError}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { instructor } = state;
  return {
    instructor,
    addInstructor: instructor && instructor.addInstructor,
    singleInstructor:
      instructor && instructor.viewInstructor && instructor.viewInstructor.user,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestAddInstructor: obj => dispatch(requestAddInstructor(obj)),
    requestViewInstructor: payload => dispatch(requestViewInstructor(payload)),
    requestInstructor: () => dispatch(requestInstructor()),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'instructor', reducer });
const withSaga = injectSaga({ key: 'instructor', saga });

AddInstructorPage.propTypes = {
  history: PropTypes.object,
  requestAddInstructor: PropTypes.func,
  requestViewInstructor: PropTypes.func,
  addInstructor: PropTypes.object,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(AddInstructorPage);
