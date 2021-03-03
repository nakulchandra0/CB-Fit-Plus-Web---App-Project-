/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import get from 'lodash/get';
import TableComponent from '../../TableComponent';

import '../styles.scss';

const ViewInstructor = ({
  viewInstructor,
  instructorClass,
  handleRedirect,
  state,
  handleChange,
  handleReset,
  handleSearch,
  handleLimitChange,
  handlePageChange,
  instructorCount,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        id: 'id',
        accessor: data => data.number,
      },
      {
        Header: 'Air Date',
        className: 'center',
        accessor: 'date',
      },
      {
        Header: 'Recording Date',
        className: 'center',
        accessor: 'recordingDate',
      },
      {
        Header: 'Class Type',
        className: 'center',
        accessor: 'classType',
      },
      {
        Header: '	Class Length',
        className: 'centeri',
        accessor: 'duration',
      },
      {
        Header: '	Difficulty Level',
        className: 'center',
        accessor: 'difficulty',
      },
      {
        Header: '	Class Style',
        className: 'center',
        accessor: 'danceClassType',
      },
      {
        Header: 'Song & Artist',
        className: 'center',
        accessor: 'songAndArtist',
      },

      {
        Header: 'Action',
        id: 'edit',
        filterable: false,
        // maxWidth: 70,
        className: 'center',
        accessor: d => (
          <div>
            <a
              onClick={() => handleRedirect(`/class/view/${d._id}`)}
              className="btn btn-sm btn-clean btn-icon"
              title="View Instructor"
            >
              <i className="la la-eye" />
            </a>
            <a
              onClick={() => handleRedirect(`/class/add`)}
              className="btn btn-sm btn-clean btn-icon"
              title="Edit Instructor"
            >
              <i className="la la-edit" />
            </a>
          </div>
        ),
      },
    ],
    [],
  );

  let instructorData = get(['instructorClass', 'getClasses']);

  instructorData =
    instructorClass &&
    instructorClass.map((row, i) => ({
      number: i + 1,
      date: row.date,
      recordingDate: row.recordingDate,
      classType: row.classType,
      duration: row.duration,
      difficulty: row.difficulty,
      danceClassType: row.danceClassType,
      songAndArtist: row.songAndArtist,
      _id: row._id,
    }));
  return (
    <div className="d-flex flex-column-fluid">
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-body">
            <div className="d-flex">
              <div className="flex-shrink-0 mr-7 mt-lg-0 mt-3">
                <div className="symbol symbol-50 symbol-lg-120">
                  <img
                    src={viewInstructor && viewInstructor.image}
                    alt={viewInstructor && viewInstructor.name}
                  />
                </div>
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between flex-wrap mt-1">
                  <div className="d-flex mr-3">
                    <h2 className="text-dark-75 text-hover-primary font-size-h2 font-weight-bold mr-3">
                      {viewInstructor && viewInstructor.name}
                    </h2>
                  </div>
                </div>
                <div className="d-flex align-items-center flex-wrap mt-3">
                  <div className="d-flex align-items-center flex-lg-fill mr-5 mb-5">
                    <span className="mr-4">
                      <i className="flaticon-email-black-circular-button display-4 text-muted font-weight-bold" />
                    </span>
                    <div className="d-flex flex-column text-dark-75">
                      <span className="font-weight-bolder font-size-sm">
                        Email
                      </span>
                      <span className="font-weight-bolder font-size-h5">
                        <span className="text-dark-50 font-weight-bold">
                          {viewInstructor && viewInstructor.email}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-lg-fill mr-5 mb-5">
                    <span className="mr-4">
                      <i className="flaticon2-phone display-4 text-muted font-weight-bold" />
                    </span>
                    <div className="d-flex flex-column text-dark-75">
                      <span className="font-weight-bolder font-size-sm">
                        Phone
                      </span>
                      <span className="font-weight-bolder font-size-h5">
                        <span className="text-dark-50 font-weight-bold">
                          {viewInstructor && viewInstructor.phone}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-lg-fill mr-5 mb-5">
                    <span className="mr-4">
                      <i className="flaticon2-calendar display-4 text-muted font-weight-bold" />
                    </span>
                    <div className="d-flex flex-column text-dark-75">
                      <span className="font-weight-bolder font-size-sm">
                        Date of Birth
                      </span>
                      <span className="font-weight-bolder font-size-h5">
                        <span className="text-dark-50 font-weight-bold">
                          {moment(viewInstructor && viewInstructor.dob).format(
                            'DD-MM-yyyy',
                          )}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-lg-fill mr-5 mb-5">
                    <span className="mr-4">
                      <i className="flaticon2-user display-4 text-muted font-weight-bold" />
                    </span>
                    <div className="d-flex flex-column flex-lg-fill">
                      <span className="text-dark-75 font-weight-bolder font-size-sm">
                        Gender
                      </span>
                      <span className="font-weight-bolder font-size-h5">
                        <span className="text-dark-50 font-weight-bold">
                          {viewInstructor && viewInstructor.gender}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card card-custom card-stretch gutter-b">
              <div className="card-header">
                <div className="card-title">
                  <span className="card-icon">
                    {/* <img src="assets/media/svg/icons/Communication/Dial-numbers.svg" /> */}
                  </span>
                  <h3 className="card-label">
                    {viewInstructor && viewInstructor.name} Classes
                  </h3>
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={handleSearch}>
                  <div className="row mb-6">
                    <div className="col-lg-2 mb-lg-0 mb-6">
                      <label htmlFor="airDate">Air Date</label>
                      <input
                        type="date"
                        id="form_air_date"
                        name="date"
                        value={state.date}
                        onChange={handleChange}
                        className="form-control datatable-input"
                        readOnly=""
                        data-col-index="2"
                      />
                    </div>
                    <div className="col-lg-2 mb-lg-0 mb-6">
                      <label htmlFor="recordingDate">Recording Date</label>
                      <input
                        type="date"
                        name="recordingDate"
                        value={state.recordingDate}
                        id="form_rec_date"
                        onChange={handleChange}
                        className="form-control datatable-input"
                        readOnly=""
                        data-col-index="3"
                      />
                    </div>
                    <div className="col-lg-2 mb-lg-0 mb-6">
                      <label htmlFor="classType">Class Type</label>
                      <select
                        onChange={handleChange}
                        name="classType"
                        value={state.classType}
                        className="form-control datatable-input"
                        data-col-index="4"
                      >
                        <option value="">Select</option>
                        <option value="preRecorded">Pre-Recorded</option>
                        <option value="liveStream">Live</option>
                        <option value="onDemand">onDemand</option>
                        <option value="forAiring">For Airing</option>
                      </select>
                    </div>
                    <div className="col-lg-2 mb-lg-0 mb-6">
                      <label htmlFor="classLength">Class Length</label>
                      <select
                        onChange={handleChange}
                        name="duration"
                        value={state.duration}
                        className="form-control datatable-input"
                        data-col-index="5"
                      >
                        <option value="">Select</option>
                        <option value="30 Min">30 Min</option>
                        <option value="60 Min">60 Min</option>
                        <option value="80 Min">80 Min</option>
                        <option value="120 Min">120 Min</option>
                      </select>
                    </div>
                    <div className="col-lg-2 mb-lg-0 mb-6">
                      <label htmlFor="Difficulty">Difficulty Level</label>
                      <select
                        onChange={handleChange}
                        name="difficulty"
                        value={state.difficulty}
                        className="form-control datatable-input"
                        data-col-index="6"
                      >
                        <option value="">Select</option>
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
                    </div>
                    <div className="col-lg-2 mb-lg-0 mb-6">
                      <label htmlFor="classStyle">Class Style</label>
                      <select
                        onChange={handleChange}
                        name="danceClassType"
                        value={state.danceClassType}
                        className="form-control datatable-input"
                        data-col-index="7"
                      >
                        <option value="">Select</option>
                        <option value="Hip-Hop">Hip-Hop</option>
                        <option value="Jazz">Jazz</option>
                        <option value="Pom">Pom</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mt-8">
                    <div className="col-lg-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-primary--icon"
                        id="kt_search"
                      >
                        <span>
                          <i className="la la-search" />
                          <span>Search</span>
                        </span>
                      </button>
                      &#160;&#160;
                      <button
                        type="button"
                        onClick={handleReset}
                        className="btn btn-secondary btn-secondary--icon"
                        id="kt_reset"
                      >
                        <span>
                          <i className="la la-close" />
                          <span>Reset</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </form>

                <TableComponent
                  data={instructorData}
                  columns={columns}
                  manual
                  pages={Math.ceil(instructorCount / state.limit)}
                  pageSize={state.limit}
                  defaultPageSize={state.limit}
                  onPageChange={handlePageChange}
                  onPageSizeChange={handleLimitChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ViewInstructor.propTypes = {
  viewInstructor: PropTypes.object,
  instructorClass: PropTypes.object,
  handleRedirect: PropTypes.func,
  state: PropTypes.object,
  handleSearch: PropTypes.func,
  handleChange: PropTypes.func,
  handleReset: PropTypes.func,
  instructorCount: PropTypes.object,
  handlePageChange: PropTypes.func,
  handleLimitChange: PropTypes.func,
};

export default ViewInstructor;
