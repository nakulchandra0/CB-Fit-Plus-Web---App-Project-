/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import moment from 'moment';
import SweetAlert from 'react-bootstrap-sweetalert';
// import Vimeo from 'react-vimeo';
import UploadImage from '../../UploadImage';

import DialPad from '../../../images/svg/side-class.svg';

const AddClass = props => (
  <div className="d-flex flex-column-fluid">
    <div className="container">
      <div className="card card-custom">
        <div className="card-header">
          <div className="card-title">
            <span className="card-icon">
              <img src={DialPad} alt="" />
            </span>
            <h3 className="card-label">
              {props.state.editclassId ? 'Edit Class' : 'Add Class'}
            </h3>
          </div>
        </div>
        <form onSubmit={props.handleSubmit}>
          <div className="card-body">
            <div className="form-group row">
              <div className="col-lg-6">
                <label htmlFor="AirDate">Air Date</label>
                <input
                  onChange={props.handleChange}
                  type="date"
                  name="airDate"
                  value={moment(props.state.airDate).format('yyyy-MM-DD')}
                  id="air_date"
                  className="form-control"
                  placeholder="Select air date"
                />
                {props.validator.message(
                  'airDate',
                  props.state.airDate,
                  'required|airDate',
                  {
                    messages: {
                      airDate: 'Invalid date',
                      required: 'Please provide an Air-Date...',
                    },
                  },
                )}
              </div>
              <div className="col-lg-6">
                <label htmlFor="recording">Recording Date</label>
                <input
                  onChange={props.handleChange}
                  type="date"
                  id="recording_date"
                  value={moment(props.state.recordingDate).format('yyyy-MM-DD')}
                  name="recordingDate"
                  className="form-control"
                  placeholder="Select recording date"
                />
                {props.validator.message(
                  'recordingDate',
                  props.state.recordingDate,
                  'required|recordingDate',
                  {
                    messages: {
                      recordingDate: 'Invalid Recording date',
                      required: 'Please provide an valid Recording date ...',
                    },
                  },
                )}
              </div>
            </div>
            <div className="form-group row">
              <div className="col-lg-6">
                <label htmlFor="airTime">Air Time</label>
                <input
                  onChange={props.handleChange}
                  type="time"
                  name="time"
                  id="air_time"
                  value={props.state.time && props.state.time.replace('-', ':')}
                  className="form-control"
                  placeholder="Select air time"
                />
                {props.validator.message(
                  'time',
                  props.state.time,
                  'required|time',
                  {
                    messages: {
                      time: 'Invalid Recording date',
                      required: 'Please select valid time...',
                    },
                  },
                )}
              </div>
              <div className="col-lg-6">
                <label htmlFor="recordingTime">Recording Time</label>
                <input
                  onChange={props.handleChange}
                  id="recording_time"
                  type="time"
                  value={
                    props.state.recordingTime &&
                    props.state.recordingTime.replace('-', ':')
                  }
                  name="recordingTime"
                  className="form-control"
                  placeholder="Select recording time"
                />
                {props.validator.message(
                  'recordingTime',
                  props.state.recordingTime,
                  'required|recordingTime',
                  {
                    messages: {
                      recordingTime: 'Invalid Recording time',
                      required: 'Provide an recording time...',
                    },
                  },
                )}
              </div>
            </div>
            <div className="form-group row">
              <div className="col-lg-6">
                <label htmlFor="classNameType">Class Type</label>
                <select
                  onChange={props.handleChange}
                  name="classType"
                  className="form-control"
                  id="classNametype"
                  value={props.state.classType}
                >
                  <option>Select Class Type</option>
                  <option value="preRecorded">Pre-Recorded</option>
                  <option value="liveStream">Live</option>
                  <option value="onDemand">onDemand</option>
                  <option value="forAiring">For Airing</option>
                </select>
                {props.validator.message(
                  'classType',
                  props.state.classType,
                  'required|classType',
                  {
                    messages: {
                      classType: 'Invalid classType',
                      required: 'Please select valid classType...',
                    },
                  },
                )}
              </div>
              <div className="col-lg-6">
                <label htmlFor="classNameLength">Class Length</label>
                <input
                  onChange={props.handleChange}
                  type="text"
                  name="duration"
                  value={props.state.duration}
                  id="air_date"
                  className="form-control"
                  placeholder="Enter class length"
                />

                {props.validator.message(
                  'duration',
                  props.state.duration,
                  'required|duration',
                  {
                    messages: {
                      duration: 'Invalid duration',
                      required: 'Please select valid duration...',
                    },
                  },
                )}
              </div>
            </div>
            <div className="form-group row">
              <div className="col-lg-6">
                <label htmlFor="DifficultyLevel">Difficulty Level</label>
                <select
                  onChange={props.handleChange}
                  name="difficulty"
                  className="form-control"
                  value={props.state.difficulty}
                >
                  <option>Select Difficulty Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Beginner/Intermediate">
                    Beginner/Intermediate
                  </option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Intermediate/Advanced">
                    Intermediate/Advanced
                  </option>
                  <option value="Advanced">Advanced</option>
                </select>
                {props.validator.message(
                  'difficulty',
                  props.state.difficulty,
                  'required|difficulty',
                  {
                    messages: {
                      difficulty: 'Invalid difficulty',
                      required: 'Please select valid difficulty...',
                    },
                  },
                )}
              </div>
              <div className="col-lg-6">
                <label htmlFor="classNameStyle">Class Style</label>
                <select
                  onChange={props.handleChange}
                  name="danceClassType"
                  className="form-control"
                  value={props.state.danceClassType}
                >
                  <option>Select Class Style</option>
                  <option value="Hip-Hop">Hip-Hop</option>
                  <option value="Jazz">Jazz</option>
                  <option value="Pom">Pom</option>
                  <option value="Other">Other</option>
                </select>
                {props.validator.message(
                  'danceClassType',
                  props.state.danceClassType,
                  'required|danceClassType',
                  {
                    messages: {
                      danceClassType: 'Invalid danceClassType',
                      required: 'Please select valid danceClassType...',
                    },
                  },
                )}
              </div>
            </div>
            <div className="form-group row">
              <div className="col-lg-6">
                <label htmlFor="instructor">Instructor </label>
                <select
                  onChange={props.handleChange}
                  value={props.state.instructorName}
                  className="form-control"
                  name="instructorName"
                >
                  <option>Select Instructor</option>
                  {props.instructor &&
                    props.instructor.map(row => (
                      // eslint-disable-next-line no-underscore-dangle
                      <option value={row._id}>{row.name}</option>
                    ))}
                </select>
                {props.validator.message(
                  'instructorName',
                  props.state.instructorName,
                  'required|instructorName',
                  {
                    messages: {
                      instructorName: 'Invalid instructorName',
                      required: 'Please select valid instructorName...',
                    },
                  },
                )}
              </div>
              <div className="col-lg-6">
                <label htmlFor="songArtist">Song & Artist</label>
                <input
                  onChange={props.handleChange}
                  name="songAndArtist"
                  type="text"
                  value={props.state.songAndArtist}
                  className="form-control"
                  placeholder="Enter song & artist"
                />
                {props.validator.message(
                  'songAndArtist',
                  props.state.songAndArtist,
                  'required|songAndArtist',
                  {
                    messages: {
                      songAndArtist: 'Invalid songAndArtist',
                      required: 'Please enter valid songAndArtist...',
                    },
                  },
                )}
              </div>
            </div>

            <div className="form-group row">
              <div className="col-lg-6">
                {props.state.sneakPeek.length === 0 && (
                  <div>
                    <label htmlFor="DifficultyLevel">Sneak Peek id</label>
                    <input
                      onChange={props.handleChange}
                      type="text"
                      name="sneckpickId"
                      value={props.state.sneckpickId}
                      className="form-control"
                      placeholder="Enter sneakpeek id"
                    />
                  </div>
                )}
              </div>
              {props.state.forAir.length === 0 && (
                <div className="col-lg-6">
                  <label htmlFor="classNameStyle">For Airing id</label>
                  <input
                    onChange={props.handleChange}
                    type="text"
                    name="airingId"
                    value={props.state.airingId}
                    className="form-control"
                    placeholder="Enter air video id"
                  />
                </div>
              )}
            </div>

            <div className="form-group row">
              <div className="col-lg-6">
                {props.state.sneckpickId.length <= 0 && (
                  <div>
                    <label htmlFor="sneakPeek">Sneak Peek</label>
                    <UploadImage
                      name="sneakPeek"
                      onDrop={props.onDrop}
                      multiple={false}
                      removePhoto={props.removePhoto}
                      value={props.state.sneakPeek}
                      files={props.state.sneakPeek}
                    />
                    {/* <Vimeo videoId={props.state.sneakPeek} /> */}
                  </div>
                )}
              </div>
              {props.state.airingId.length <= 0 &&
                props.state.classType !== 'liveStream' && (
                  <div className="col-lg-6" id="forair_video">
                    <label htmlFor="forAiring">For Airing</label>
                    <UploadImage
                      name="forAir"
                      onDrop={props.onDropAir}
                      multiple={false}
                      removePhoto={props.removePhotoAir}
                      files={props.state.forAir}
                      value={props.state.forAir}
                    />
                    {/* <Vimeo videoId={props.state.forAir} /> */}
                  </div>
                )}
            </div>

            <div className="form-group row">
              <div className="col-lg-12">
                <label htmlFor="staffComments">Staff Comments</label>
                <textarea
                  name="staffComments"
                  onChange={props.handleChange}
                  className="form-control back_info"
                  value={props.state.staffComments}
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
                  className="btn btn-secondary"
                  onClick={props.handleClick}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    {props.addClasses && (
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
AddClass.propTypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  onDrop: PropTypes.func,
  onDropAir: PropTypes.func,
  removePhoto: PropTypes.func,
  removePhotoAir: PropTypes.func,
  state: PropTypes.object,
  instructor: PropTypes.object,
  isLoading: PropTypes.bool,
  handleClick: PropTypes.func,
  message: PropTypes.string,
  handleModal: PropTypes.func,
  validator: PropTypes.func,
  addClasses: PropTypes.object,
  isSuccess: PropTypes.bool,
};
export default AddClass;
