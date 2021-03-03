import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import SimpleReactValidator from 'simple-react-validator';
import saga from '../saga';
import reducer from '../reducer';
import AddUsers from '../../../components/User/AddUser';
import {
  requestAddUser,
  requestUser,
  requestUserById,
  requestState,
} from '../actions';

class AddUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      phone: '',
      dob: '',
      image: [],
      country: '',
      address: '',
      city: '',
      state: '',
      postcode: '',
      gender: 'MALE',
      isEdit: false,
      editUserId: '',
      show: false,
      passError: '',
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validator = new SimpleReactValidator({});

  static getDerivedStateFromProps(newProps, state) {
    const {
      user: { singleUser },
      loading,
    } = newProps;
    const { isEdit } = state;
    const data = singleUser && singleUser.user;
    if (data && !loading && isEdit && !state.name) {
      return {
        name: data.name || '',
        imagePreview: data.image || [],
        email: data.email || '',
        gender: data.gender !== '' ? data.gender.toUpperCase() : 'MALE',
        phone: data.phone || '',
        dob: data.dob || '',
        isEdit: false,
        country: data.country || '',
        state: data.state || '',
        address: data.address || '',
        city: data.city || '',
        postcode: data.postcode || '',
        password: data.password || '',
      };
    }
    return null;
  }

  handleSubmit = event => {
    event.preventDefault();
    const {
      name,
      email,
      password,
      phone,
      dob,
      image,
      country,
      address,
      city,
      state,
      postcode,
      gender,
      editUserId,
      altPhone,
    } = this.state;
    const formData = new FormData();
    if (editUserId) {
      formData.append('id', editUserId);
    }
    formData.append('role', 'USER');
    formData.append('name', name);
    formData.append('email', email);
    if (!editUserId) {
      formData.append('password', password);
    }
    formData.append('phone', phone);
    formData.append('dob', dob);
    if (image.length > 0) {
      formData.append('image', image[0]);
    }
    formData.append('country', country);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('postcode', postcode);
    formData.append('gender', gender);
    formData.append('altPhone', altPhone);
    if (!editUserId && password.length < 8) {
      this.setState({ passError: 'Please enter password atleast 8 character' });
    }

    if (this.validator.allValid()) {
      this.props.requestAddUser({ editUserId, formData });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  componentDidMount() {
    this.props.requestState();
    const {
      location: { pathname },
    } = this.props;
    if (pathname.includes('edit')) {
      const splitedArr = pathname.split('/');
      const userId = splitedArr[splitedArr.length - 1];
      if (userId) {
        this.setState({ isEdit: true, editUserId: userId });
        this.props.requestUserById({ userId });
      }
    }
  }

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

  componentDidUpdate(prevProps) {
    const { addUser } = this.props;
    const { addUser: prevAddUser } = prevProps;
    if (addUser && prevAddUser !== addUser && !addUser.loading) {
      if (addUser.success) {
        this.handleError();
      }
      if (!addUser.success) {
        this.handleError();
      }
    }
  }

  handleError = () => {
    this.setState({ show: true });
  };

  handleCancel = () => {
    const { history } = this.props;
    history.push('/users');
  };

  handleModal = () => {
    const { show } = this.state;
    const { addUser, history } = this.props;
    this.setState({ show: !show }, () => {
      if (addUser.success) {
        history.push('/users');
      }
    });
  };

  handleRedirect = path => {
    const { history } = this.props;
    history.push(path);
  };

  render() {
    const { addUser, getstate } = this.props;
    const { passError } = this.state;
    return (
      <Fragment>
        <AddUsers
          isLoading={addUser && addUser.loading}
          handleSubmit={this.handleSubmit}
          state={this.state}
          handleChange={this.handleChange}
          onImageChange={this.onImageChange}
          handleCancel={this.handleCancel}
          validator={this.validator}
          handleModal={this.handleModal}
          message={addUser && addUser.message}
          isSuccess={addUser && addUser.success}
          onImageRemove={this.onImageRemove}
          getstate={getstate}
          passError={passError}
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
    addUser: user && user.addUser,
    singleUser,
    getstate: user && user.state && user.state.data,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestAddUser: payload => dispatch(requestAddUser(payload)),
    requestUser: obj => dispatch(requestUser(obj)),
    requestUserById: payload => dispatch(requestUserById(payload)),
    requestState: obj => dispatch(requestState(obj)),
    dispatch,
  };
}

const withReducer = injectReducer({ key: 'user', reducer });
const withSaga = injectSaga({ key: 'user', saga });

AddUserPage.propTypes = {
  requestAddUser: PropTypes.func,
  history: PropTypes.object,
  addUser: PropTypes.object,
  requestUserById: PropTypes.func,
  requestState: PropTypes.func,
  getstate: PropTypes.object,
  location: PropTypes.object,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(AddUserPage);
