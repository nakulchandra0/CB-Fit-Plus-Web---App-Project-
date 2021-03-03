/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import SweetAlert from 'react-bootstrap-sweetalert';
import moment from 'moment';

import AddUser from '../../../images/svg/Add-user.svg';
import '../styles.scss';

const AddInstructor = props => (
  <div className="d-flex flex-column-fluid">
    <div className="container">
      <div className="card card-custom">
        <div className="card-header">
          <div className="card-title">
            <span className="card-icon">
              <img src={AddUser} alt="" />
            </span>
            <h3 className="card-label">
              {props.state.editUserId ? 'Edit Instructor' : 'Add Instructor'}
            </h3>
          </div>
        </div>
        <form onSubmit={props.handleSubmit}>
          <div className="card-body">
            <div className="form-group row">
              <div className="col-lg-6">
                <label htmlFor="fname">First Name</label>
                <input
                  type="text"
                  name="name"
                  value={props.state.name}
                  onChange={props.handleChange}
                  className="form-control"
                  placeholder="Enter first name"
                  required=""
                />
                {props.validator.message(
                  'name',
                  props.state.name,
                  'required|name',
                  {
                    messages: {
                      required: 'First Name is required',
                      name: 'Please enter valid First Name',
                    },
                  },
                )}
              </div>
              <div className="col-lg-6">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={props.state.email}
                  onChange={props.handleChange}
                  className="form-control"
                  placeholder="Enter email"
                  required=""
                />
                {props.validator.message(
                  'email',
                  props.state.email,
                  'required|email',
                  {
                    messages: {
                      required: 'Email is required',
                      email: 'Please enter valid Email-Id',
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
                  name="phone"
                  value={props.state.phone}
                  onChange={props.handleChange}
                  className="form-control"
                  placeholder="Enter phone number"
                  required=""
                />
                {props.validator.message(
                  'phone',
                  props.state.phone,
                  'required|phone',
                  {
                    messages: {
                      required: 'Phone is required',
                      phone: 'Please Enter Valid Number',
                    },
                  },
                )}
              </div>
              <div className="col-lg-6">
                <label htmlFor="alt-phone">Alt Phone</label>
                <input
                  type="tel"
                  name="altPhone"
                  value={props.state.altPhone}
                  onChange={props.handleChange}
                  className="form-control"
                  placeholder="Enter alt phone number"
                  required=""
                />
                {props.validator.message(
                  'altPhone',
                  props.state.altPhone,
                  'required|altPhone',
                  {
                    messages: {
                      required: 'Alt phone is required',
                      altPhone: 'Please Enter Valid Alternate Number',
                    },
                  },
                )}
              </div>
            </div>
            <div className="form-group row">
              <div className="col-lg-6">
                <label htmlFor="date">Date of Birth</label>
                <div className="input-group date">
                  <input
                    type="date"
                    id="start"
                    value={moment(props.state.dob).format('yyyy-MM-DD')}
                    className="form-control"
                    onChange={props.handleChange}
                    name="dob"
                    required=""
                  />
                </div>
                {props.validator.message(
                  'dob',
                  props.state.dob,
                  'required|dob',
                  {
                    messages: {
                      required: 'Date of Birth is required',
                      dob: 'Please Enter Valid Date of Birth',
                    },
                  },
                )}
              </div>
              <div className="col-lg-6">
                <label htmlFor="gender">Gender</label>
                <div className="radio-inline" onChange={props.handleChange}>
                  <label className="radio radio-solid">
                    <input
                      type="radio"
                      name="gender"
                      checked={props.state.gender === 'MALE'}
                      value="MALE"
                    />
                    <span />
                    Male
                  </label>
                  <label className="radio radio-solid">
                    <input
                      type="radio"
                      name="gender"
                      checked={props.state.gender === 'FEMALE'}
                      value="FEMALE"
                    />
                    <span />
                    Female
                  </label>
                  <label className="radio radio-solid">
                    <input
                      type="radio"
                      name="gender"
                      checked={props.state.gender === 'NON-BINARY'}
                      value="NON-BINARY"
                    />
                    <span />
                    Non-binary
                  </label>
                  <label className="radio radio-solid">
                    <input
                      type="radio"
                      name="gender"
                      checked={props.state.gender === 'PREFER NOT TO ANSWER'}
                      value="PREFER NOT TO ANSWER"
                    />
                    <span />
                    Prefer Not to Answer
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-lg-6">
                <label htmlFor="username">Instagram Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="instaUserName"
                  value={props.state.instaUserName}
                  onChange={props.handleChange}
                  placeholder="Enter instagram username"
                />
              </div>
              {!props.state.editUserId && (
                <div className="col-lg-6">
                  <label htmlFor="Password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={props.state.password}
                    onChange={props.handleChange}
                    className="form-control"
                    placeholder="Enter password"
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
                  <label htmlFor="profile">Profile Image</label>
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
                    data-toggle="tooltip"
                    title="Remove avatar"
                    onClick={() => props.onImageRemove('image')}
                  >
                    <i className="ki ki-bold-close icon-xs text-muted" />
                  </span>
                </div>
                {props.validator.message(
                  'image',
                  props.state.image,
                  'required|image',
                  {
                    messages: {
                      required: 'Please Select Media File',
                      image: 'Please Upload valid Profile Picture',
                    },
                  },
                )}
              </div>
              <div className="col-lg-6">
                <div>
                  <label htmlFor="image">Full Image(Transparent Only)</label>
                </div>
                <div
                  className="image-input-field image-input image-input-outline"
                  id="full_image"
                >
                  <div
                    className="image-input-wrapper"
                    style={{
                      backgroundImage: `url(${props.state.fullImagePreview})`,
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
                      onChange={props.onImageChange}
                      name="fullImage"
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
                    data-toggle="tooltip"
                    title="Remove avatar"
                    onClick={() => props.onImageRemove('fullImage')}
                  >
                    <i className="ki ki-bold-close icon-xs text-muted" />
                  </span>
                </div>
                {props.validator.message(
                  'fullImage',
                  props.state.fullImage,
                  'required|fullImage',
                  {
                    messages: {
                      required: 'Please Select Media File',
                      fullImage: 'Please Upload valid Full Image',
                    },
                  },
                )}
              </div>
            </div>
            <div className="form-group row">
              <div className="col-lg-12">
                <label htmlFor="statement">
                  Background & Personal Statement
                </label>
                <textarea
                  name="statement"
                  value={props.state.statement}
                  onChange={props.handleChange}
                  className="form-control back_info"
                />
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
                  onClick={props.handleCancel}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
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
  </div>
);

AddInstructor.propTypes = {
  handleCancel: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  onImageChange: PropTypes.func,
  handleModal: PropTypes.func,
  onImageRemove: PropTypes.func,
  state: PropTypes.object,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  validator: PropTypes.func,
  isSuccess: PropTypes.bool,
  passError: PropTypes.string,
};

export default AddInstructor;
