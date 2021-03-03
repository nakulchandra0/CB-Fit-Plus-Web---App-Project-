/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import get from 'lodash/get';

import Group from '../../images/svg/Group.svg';
import AddInstructor from '../../images/svg/Add-instructor.svg';
import TableComponent from '../TableComponent';

const Instructor = props => {
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        id: 'id',
        accessor: data => data.number,
      },
      {
        Header: 'Image',
        id: 'image',
        className: 'center',
        accessor: d => (
          <div>
            <img className="instructor_table_img" src={d && d.image} />
          </div>
        ),
      },
      {
        Header: 'Name',
        className: 'name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        className: 'email',
        accessor: 'email',
      },
      {
        Header: 'Phone',
        className: 'center',
        accessor: 'phone',
      },
      {
        Header: '	DOB',
        className: 'dob',
        accessor: 'dob',
      },
      {
        Header: '	Gender',
        className: 'center',
        accessor: 'gender',
      },
      {
        Header: '	Status',
        className: 'center',
        id: 'isDeleted',
        accessor: d => (
          <div>
            {d && d.isDeleted ? (
              <span className="label label-lg font-weight-bold label-light-danger label-inline">
                Deactive
              </span>
            ) : (
              <span className="label label-lg font-weight-bold label-light-success label-inline">
                Active
              </span>
            )}
          </div>
        ),
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
              onClick={() => props.handleRedirect(`/instructor/view/${d._id}`)}
              className="btn btn-sm btn-clean btn-icon"
              title="View Instructor"
            >
              <i className="la la-eye" />
            </a>
            <a
              onClick={() => props.handleRedirect(`/instructor/edit/${d._id}`)}
              className="btn btn-sm btn-clean btn-icon"
              title="Edit Instructor"
            >
              <i className="la la-edit" />
            </a>
            <a
              href
              className="btn btn-sm btn-clean btn-icon delete_instructor"
              title="Delete Instructor"
              onClick={() => props.handleDelete(d._id)}
            >
              <i className="la la-trash" />
            </a>
          </div>
        ),
      },
    ],
    [],
  );

  let instructorData = get(props, ['instructorList', 'users']);

  instructorData =
    instructorData &&
    instructorData.map((row, idx) => ({
      number: idx + 1,
      name: row.name,
      email: row.email,
      phone: row.phone,
      dob: row.dob,
      gender: row.gender && row.gender.replace('-', ' '),
      _id: row._id,
      image: row.image,
      isDeleted: row.isDeleted,
    }));

  return (
    <div className="d-flex flex-column-fluid">
      <div className="container">
        <div className="card card-custom">
          <div className="card-header">
            <div className="card-title">
              <span className="card-icon">
                <img src={Group} alt="" />
              </span>
              <h3 className="card-label">Instructors</h3>
            </div>
            <div className="card-toolbar">
              <a
                href
                onClick={() => props.handleRedirect('/instructor/add')}
                className="btn btn-primary font-weight-bolder"
              >
                <span className="svg-icon svg-icon-md">
                  <img src={AddInstructor} alt="" />
                </span>
                Add New Instructor
              </a>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={props.handleSearch} className="mb-15">
              <div className="row mb-6">
                <div className="col-lg-1 mb-lg-0 mb-6">
                  <label htmlFor="id">ID</label>
                  <input
                    type="text"
                    name="id"
                    value={props.state.id}
                    onChange={props.handleChange}
                    className="form-control datatable-input"
                    placeholder="E.g: 01"
                    data-col-index="0"
                  />
                </div>
                <div className="col-lg-2 mb-lg-0 mb-6">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={props.state.name}
                    onChange={props.handleChange}
                    className="form-control datatable-input"
                    placeholder="E.g: Abc"
                    data-col-index="2"
                  />
                </div>
                <div className="col-lg-3 mb-lg-0 mb-6">
                  <label htmlFor="Email">Email</label>
                  <input
                    type="text"
                    onChange={props.handleChange}
                    name="email"
                    value={props.state.email}
                    className="form-control datatable-input"
                    placeholder="E.g: Abc@gmail.com"
                    data-col-index="3"
                  />
                </div>
                <div className="col-lg-2 mb-lg-0 mb-6">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={props.state.phone}
                    onChange={props.handleChange}
                    className="form-control datatable-input"
                    placeholder="1234567890"
                    data-col-index="4"
                  />
                </div>
                <div className="col-lg-2 mb-lg-0 mb-6">
                  <label htmlFor="gender">Gender</label>
                  <select
                    onChange={props.handleChange}
                    name="gender"
                    value={props.state.gender}
                    className="form-control datatable-input"
                    data-col-index="6"
                  >
                    <option value="">Select</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="NON-BINARY">Non binary</option>
                    <option value="PREFER NOT TO ANSWER">
                      Prefer Not To Answer
                    </option>
                  </select>
                </div>
                <div className="col-lg-2 mb-lg-0 mb-6">
                  <label htmlFor="status">Status</label>
                  <select
                    name="status"
                    value={props.state.status}
                    onChange={props.handleChange}
                    className="form-control datatable-input"
                    data-col-index="7"
                  >
                    <option value="">Select</option>
                    <option value="true">Active</option>
                    <option value="false">Deactive</option>
                  </select>
                </div>
              </div>
              <div className="row mt-8">
                <div className="col-lg-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-primary--icon"
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
              data={instructorData}
              columns={columns}
              manual
              pages={Math.ceil(
                props.instructorList &&
                  props.instructorList.count / props.state.limit,
              )}
              pageSize={props.state.limit}
              defaultPageSize={props.state.limit}
              onPageChange={props.handlePageChange}
              onPageSizeChange={props.handleLimitChange}
            />
          </div>
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
        onConfirm={props.deleteFile}
        onCancel={props.handleDelete}
        focusCancelBtn
      >
        {"You won't be able to revert this!"}
      </SweetAlert>
    </div>
  );
};

Instructor.propTypes = {
  handleRedirect: PropTypes.func,
  handleDelete: PropTypes.func,
  handleChange: PropTypes.func,
  state: PropTypes.object,
  instructorList: PropTypes.array,
  handleSearch: PropTypes.func,
  deleteFile: PropTypes.func,
  handlePageChange: PropTypes.func,
  handleLimitChange: PropTypes.func,
  handleReset: PropTypes.func,
};

export default Instructor;
