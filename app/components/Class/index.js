/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import get from 'lodash/get';
import TableComponent from '../TableComponent';

import DialPad from '../../images/svg/side-class.svg';
import '../Instructor/styles.scss';

const Class = props => {
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        id: 'id',
        accessor: data => data.number,
        maxWidth: 50,
      },
      {
        Header: 'Instructor Name',
        id: 'name',
        accessor: 'instructorName',
      },
      {
        Header: 'Air Date',
        accessor: 'date',
      },
      {
        Header: 'Recording Date',
        accessor: 'recordingDate',
      },
      {
        Header: 'Class Type',
        className: 'center',
        accessor: 'classType',
      },
      {
        Header: 'Class Length',
        id: 'parentRefId',
        className: 'center',
        accessor: 'duration',
      },
      {
        Header: 'Difficulty Level',
        className: 'center',
        accessor: 'difficulty',
      },
      {
        Header: 'Class Style',
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
              href
              onClick={() => props.handleRedirect(`/class/view/${d._id}`)}
              className="btn btn-sm btn-clean btn-icon"
              title="View Instructor"
            >
              <i className="la la-eye" />
            </a>
            <a
              href
              onClick={() => props.handleRedirect(`/class/edit/${d._id}`)}
              // href={`/class/edit/${d._id}`}
              className="btn btn-sm btn-clean btn-icon"
              title="Edit Instructor"
            >
              <i className="la la-edit" />
            </a>
            <a
              href
              className="btn btn-sm btn-clean btn-icon delete_instructor"
              title="Delete Class"
              onClick={() => props.handleDelete(d._id)}
            >
              <i className="la la-trash" />
            </a>
            <a
              href
              className="btn btn-sm btn-clean btn-icon feature"
              title="Featured Vedio"
              // eslint-disable-next-line react/prop-types
              onClick={() => props.handleFeaturedClass(d._id)}
            >
              <i className={d.isFeatured ? 'la la-heart' : 'la la-heart-o'} />
            </a>
          </div>
        ),
      },
    ],
    [],
  );

  let classData = get(props, ['classList', 'classes']);

  classData =
    classData &&
    classData.map((row, idx) => ({
      number: idx + 1,
      instructorName: row.instructorName,
      date: row.date,
      recordingDate: row.recordingDate,
      classType: row.classType,
      duration: row.duration,
      difficulty: row.difficulty,
      danceClassType: row.danceClassType,
      isFeatured: row.isFeatured,
      songAndArtist: row.songAndArtist,
      _id: row._id,
      image: row.image,
    }));

  return (
    <div className="d-flex flex-column-fluid">
      <div className="container">
        <div className="card card-custom">
          <div className="card-header">
            <div className="card-title">
              <span className="card-icon">
                <img src={DialPad} alt="" />
              </span>
              <h3 className="card-label">All Classes</h3>
            </div>
            <div className="card-toolbar">
              <a
                href
                onClick={() => props.handleRedirect('/class/add')}
                className="btn btn-primary font-weight-bolder"
              >
                <span className="svg-icon svg-icon-md" />
                Add New Class
              </a>
            </div>
          </div>
          <form onSubmit={props.handleSearch}>
            <div className="card-body">
              <form className="mb-15">
                <div className="row mb-6">
                  <div className="col-lg-2 mb-lg-0 mb-6">
                    <label htmlFor="instructor">Instructor Name</label>
                    <input
                      type="text"
                      name="instructorName"
                      value={props.state.instructorName}
                      onChange={props.handleChange}
                      className="form-control datatable-input"
                      placeholder="E.g: Abc"
                      data-col-index="1"
                    />
                  </div>
                  <div className="col-lg-2 mb-lg-0 mb-6">
                    <label htmlFor="airDate">Air Date</label>
                    <input
                      type="date"
                      id="form_air_date"
                      name="date"
                      value={props.state.date}
                      onChange={props.handleChange}
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
                      value={props.state.recordingDate}
                      id="form_rec_date"
                      onChange={props.handleChange}
                      className="form-control datatable-input"
                      readOnly=""
                      data-col-index="3"
                    />
                  </div>
                  <div className="col-lg-2 mb-lg-0 mb-6">
                    <label htmlFor="className Type">Class Type</label>
                    <select
                      onChange={props.handleChange}
                      name="classType"
                      value={props.state.classType}
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
                    <label htmlFor="className Length">Class Length</label>
                    <select
                      onChange={props.handleChange}
                      name="duration"
                      value={props.state.duration}
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
                    <label htmlFor="difficultyLevel">Difficulty Level</label>
                    <select
                      onChange={props.handleChange}
                      name="difficulty"
                      value={props.state.difficulty}
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
                    <label htmlFor="classNameStt">Class Style</label>
                    <select
                      onChange={props.handleChange}
                      name="danceClassType"
                      value={props.state.danceClassType}
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
                      onClick={props.handleReset}
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
                className="table table-bordered table-hover table-checkable"
                data={classData}
                columns={columns}
                // loading={isLoading}
                manual
                // page={props.state.page}
                pages={Math.ceil(
                  props.classList && props.classList.count / props.state.limit,
                )}
                pageSize={props.state.limit}
                defaultPageSize={props.state.limit}
                onPageChange={props.handlePageChange}
                onPageSizeChange={props.handleLimitChange}
              />
            </div>
          </form>
        </div>
      </div>
      <SweetAlert
        show={props.state.show}
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="primary"
        cancelBtnBsStyle="light"
        title="Are you sure?"
        onConfirm={props.onDelete}
        onCancel={props.handleDelete}
        focusCancelBtn
      >
        {"You won't be able to revert this!"}
      </SweetAlert>
    </div>
  );
};
Class.propTypes = {
  handleRedirect: PropTypes.func,
  state: PropTypes.object,
  classList: PropTypes.array,
  handlePageChange: PropTypes.func,
  handleLimitChange: PropTypes.func,
  handleSearch: PropTypes.func,
  handleChange: PropTypes.func,
  handleReset: PropTypes.func,
  handleDelete: PropTypes.func,
  onDelete: PropTypes.func,
};

export default Class;
