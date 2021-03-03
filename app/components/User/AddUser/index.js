import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import moment from 'moment';
import SweetAlert from 'react-bootstrap-sweetalert';
import AddUser from '../../../images/svg/Add-user.svg';
import '../styles.scss';

const AddUsers = props => (
  <div className="card">
    <div
      className="content d-flex flex-column flex-column-fluid"
      id="kt_content"
    >
      <div className="d-flex flex-column-fluid">
        <div className="container">
          <div className="card card-custom">
            <div className="card-header">
              <div className="card-title">
                <span className="card-icon">
                  <img src={AddUser} alt="" />
                </span>
                <h3 className="card-label">
                  {props.state.editUserId ? 'Edit User' : 'Add User'}
                </h3>
              </div>
            </div>
            <form onSubmit={props.handleSubmit}>
              <div className="card-body">
                <div className="form-group row">
                  <div className="col-lg-6">
                    <label htmlFor="name">User Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Enter user name"
                      value={props.state.name}
                      onChange={props.handleChange}
                      required=""
                      autoComplete="off"
                    />
                    {props.validator.message(
                      'name',
                      props.state.name,
                      'required',
                      {
                        messages: {
                          required: 'Name is required',
                          name: 'Please enter name',
                        },
                      },
                    )}
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter email"
                      value={props.state.email}
                      onChange={props.handleChange}
                      required=""
                    />
                    {props.validator.message(
                      'email',
                      props.state.email,
                      'required|email',
                      {
                        messages: {
                          required: 'Please Enter Email',
                          email: 'Please enter Email',
                        },
                      },
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      placeholder="Enter phone number"
                      value={props.state.phone}
                      onChange={props.handleChange}
                      required=""
                    />
                    {props.validator.message(
                      'phone',
                      props.state.phone,
                      'required',
                      {
                        messages: {
                          required: 'Phone number is required',
                          phone: 'Please enter phone number',
                        },
                      },
                    )}
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="dob">Date of Birth</label>
                    <div className="input-group date">
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        required=""
                        className="form-control"
                        value={moment(props.state.dob).format('yyyy-MM-DD')}
                        onChange={props.handleChange}
                      />
                    </div>
                    {props.validator.message(
                      'dob',
                      props.state.dob,
                      'required',
                      {
                        messages: {
                          required: 'DOB is required',
                          dob: 'Please enter DOB',
                        },
                      },
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <label htmlFor="gender">Gender</label>
                    <div className="radio-inline" onChange={props.handleChange}>
                      <label className="radio radio-solid">
                        <input
                          type="radio"
                          name="gender"
                          checked={props.state.gender === 'MALE'}
                          value="MALE"
                          required=""
                        />
                        <span />
                        Male
                      </label>
                      <label className="radio radio-solid">
                        <input
                          type="radio"
                          name="gender"
                          value="FEMALE"
                          required=""
                          checked={props.state.gender === 'FEMALE'}
                        />
                        <span />
                        Female
                      </label>
                      <label className="radio radio-solid">
                        <input
                          type="radio"
                          name="gender"
                          value="NON-BINARY"
                          required=""
                          checked={props.state.gender === 'NON-BINARY'}
                        />
                        <span />
                        Non-binary
                      </label>
                      <label className="radio radio-solid">
                        <input
                          type="radio"
                          name="gender"
                          value="PREFER NOT TO ANSWER"
                          checked={
                            props.state.gender === 'PREFER NOT TO ANSWER'
                          }
                          required=""
                        />
                        <span />
                        Prefer Not to Answer
                      </label>
                    </div>
                  </div>
                  {!props.state.editUserId && (
                    <div className="col-lg-6">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={props.state.password}
                        placeholder="Enter password"
                        onChange={props.handleChange}
                        required=""
                      />
                      <span className="srv-validation-message">
                        {props.passError}
                      </span>
                    </div>
                  )}
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="image">Profile Image</label>
                    </div>
                    <div
                      className="image-input-field image-input image-input-outline"
                      id="profile_image"
                    >
                      <div
                        className="image-input-wrapper"
                        style={{
                          backgroundImage: `url(${props.state.imagePreview})`,
                        }}
                      />

                      <label
                        className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                        data-action="change"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="Change avatar"
                      >
                        <i className="fa fa-pen icon-sm text-muted" />
                        <input
                          type="file"
                          name="image"
                          onChange={props.onImageChange}
                          accept=".png, .jpg, .jpeg"
                          required=""
                        />
                        <input type="hidden" name="profile_avatar_remove" />
                      </label>
                      <span
                        className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                        data-action="cancel"
                        data-toggle="tooltip"
                        title="Cancel avatar"
                      >
                        <i className="ki ki-bold-close icon-xs text-muted" />
                      </span>
                      <span
                        className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                        data-action="remove"
                        role="button"
                        tabIndex={0}
                        data-toggle="tooltip"
                        title="Remove avatar"
                        onClick={() => props.onImageRemove('image')}
                        onKeyPress={() => props.onImageRemove('image')}
                      >
                        <i className="ki ki-bold-close icon-xs text-muted" />
                      </span>
                    </div>
                    {props.validator.message(
                      'image',
                      props.state.imagePreview,
                      'required',
                      {
                        messages: {
                          required: 'Image is required',
                          image: 'Please select Image',
                        },
                      },
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <label htmlFor="country">Country</label>
                    <select
                      className="form-control"
                      name="country"
                      value={props.state.country}
                      onChange={props.handleChange}
                      required=""
                    >
                      <option>Select Country</option>
                      <option value="USA">USA</option>
                    </select>
                    {props.validator.message(
                      'country',
                      props.state.country,
                      'required',
                      {
                        messages: {
                          required: 'Country is required',
                          country: 'Please Select Country',
                        },
                      },
                    )}
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      value={props.state.address}
                      placeholder="Enter address"
                      required=""
                      onChange={props.handleChange}
                    />
                    {props.validator.message(
                      'address',
                      props.state.address,
                      'required',
                      {
                        messages: {
                          required: 'Address is required',
                          address: 'Please enter address',
                        },
                      },
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      value={props.state.city}
                      placeholder="Enter city"
                      onChange={props.handleChange}
                      required=""
                    />
                    {props.validator.message(
                      'city',
                      props.state.city,
                      'required',
                      {
                        messages: {
                          required: 'City is required',
                          city: 'Please enter city',
                        },
                      },
                    )}
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="state">State/Province</label>
                    <select
                      name="state"
                      className="form-control"
                      value={props.state.state}
                      onChange={props.handleChange}
                      required=""
                    >
                      <option>Select State </option>
                      {props.getstate &&
                        props.getstate.map(row => (
                          // eslint-disable-next-line no-underscore-dangle
                          <option value={row._id}>
                            {row.subdivision_name}
                          </option>
                        ))}
                    </select>
                    {props.validator.message(
                      'state',
                      props.state.state,
                      'required',
                      {
                        messages: {
                          required: 'State is required',
                          state: 'Please select State',
                        },
                      },
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <label htmlFor="postcode">Post Code</label>
                    <input
                      type="text"
                      name="postcode"
                      className="form-control"
                      value={props.state.postcode}
                      placeholder="Enter zip code"
                      required=""
                      onChange={props.handleChange}
                    />
                    {props.validator.message(
                      'postcode',
                      props.state.postcode,
                      'required',
                      {
                        messages: {
                          required: 'Postcode is required',
                          postcode: 'Please enter Postcode',
                        },
                      },
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <button type="submit" className="btn btn-primary mr-2">
                      {props.isLoading && (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={props.handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    {props.addUser && (
      <SweetAlert
        show={props.state.show}
        success={props.isSuccess}
        danger={!props.isSuccess}
        confirmBtnText="Ok, got it!"
        confirmBtnBsStyle="primary"
        onConfirm={props.handleModal}
      >
        {props.message}
      </SweetAlert>
    )}
  </div>
);

AddUsers.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  state: PropTypes.object,
  onImageChange: PropTypes.func,
  isLoading: PropTypes.bool,
  handleCancel: PropTypes.func,
  validator: PropTypes.func,
  handleModal: PropTypes.func,
  message: PropTypes.string,
  isSuccess: PropTypes.bool,
  onImageRemove: PropTypes.func,
  getstate: PropTypes.object,
  passError: PropTypes.string,
  addUser: PropTypes.object,
};

export default AddUsers;
