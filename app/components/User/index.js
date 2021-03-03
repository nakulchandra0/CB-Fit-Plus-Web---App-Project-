/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import get from 'lodash/get';
import Group from '../../images/svg/Group.svg';
import AddUser from '../../images/svg/Add-user.svg';
import TableComponent from '../TableComponent';
const Users = props => {
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
        accessor: d => (
          <div>
            <img src={d && d.image} className="instructor_table_img" alt="" />
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
        className: 'phone',
        accessor: 'phone',
      },
      {
        Header: '	DOB',
        className: 'dob',
        accessor: 'dob',
      },
      {
        Header: '	Gender',
        className: 'gender',
        id: 'gender',
        accessor: 'gender',
      },
      {
        Header: '	Status',
        className: 'center',
        id: 'isDeleted',
        accessor: d => (
          <div>
            {d && d.isActive && !d.isDeleted ? (
              <button
                type="button"
                // eslint-disable-next-line react/prop-types
                onClick={() => props.handleDeactivate(d._id, d.isActive)}
                className="label label-lg font-weight-bold label-light-success label-inline"
              >
                Active
              </button>
            ) : (
              d &&
              !d.isActive &&
              !d.isDeleted && (
                <button
                  type="button"
                  // eslint-disable-next-line react/prop-types
                  onClick={() => props.handleDeactivate(d._id, d.isActive)}
                  className="label label-lg font-weight-bold label-light-danger label-inline"
                >
                  Deactive
                </button>
              )
            )}
            {d && d.isDeleted && (
              <span className="label label-lg font-weight-bold label-light-danger label-inline">
                Deleted
              </span>
            )}
          </div>
        ),
      },
      {
        Header: '	Subscription Plan',
        className: 'subscriptionType',
        id: 'subscriptionType',
        accessor: d => (
          <div>
            {d && d.subscriptionType && (
              <span className="label label-lg font-weight-bold label-light-success label-inline">
                {d && d.subscriptionType}
              </span>
            )}
          </div>
        ),
      },

      {
        Header: 'Action',
        id: 'edit',
        filterable: false,
        className: 'center',
        accessor: d => (
          <div>
            <a
              href
              className="btn btn-sm btn-clean btn-icon"
              title="View User"
              onClick={() => props.handleRedirect(`/users/view/${d._id}`)}
            >
              <i className="la la-eye" />
            </a>
            <a
              href
              onClick={() => props.handleRedirect(`/users/edit/${d._id}`)}
              className="btn btn-sm btn-clean btn-icon"
              title="Edit User"
            >
              <i className="la la-edit" />
            </a>
            <a
              href
              className="btn btn-sm btn-clean btn-icon delete_user"
              title="Delete User"
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

  let users = get(props, ['user', 'users']);

  users =
    users &&
    users.map((user, idx) => ({
      number: idx + 1,
      name: user.name,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      gender: user.gender && user.gender.replace('-', ' '),
      subscriptionType: user.subscriptionType,
      _id: user._id,
      isDeleted: user.isDeleted,
      isActive: user.isActive,
      image: user.image,
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
              <h3 className="card-label">Users</h3>
            </div>
            <div className="card-toolbar">
              <a
                href
                onClick={() => props.handleRedirect('/users/add-user')}
                className="btn btn-primary font-weight-bolder"
              >
                <span className="svg-icon svg-icon-md">
                  <img src={AddUser} alt="" />
                </span>
                Add New User
              </a>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={props.onSearch} className="mb-15">
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
                  <label htmlFor="subscriptionType">Subscription Plan</label>
                  <select
                    name="subscriptionType"
                    onChange={props.handleChange}
                    className="form-control datatable-input"
                    data-col-index="7"
                  >
                    <option value="">Select</option>
                    <option value="Annual">Annual</option>
                    <option value="Monthly">Monthly</option>
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
              data={users}
              columns={columns}
              manual
              pages={Math.ceil(
                props.user && props.user.count / props.state.limit,
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
        onConfirm={props.onDelete}
        onCancel={props.handleDelete}
        focusCancelBtn
      >
        {"You won't be able to revert this!"}
      </SweetAlert>
    </div>
  );
};

Users.propTypes = {
  handleRedirect: PropTypes.func,
  handleDelete: PropTypes.func,
  handleChange: PropTypes.func,
  state: PropTypes.object,
  user: PropTypes.array,
  onSearch: PropTypes.func,
  onDelete: PropTypes.func,
  handlePageChange: PropTypes.func,
  handleLimitChange: PropTypes.func,
  handleReset: PropTypes.func,
};

export default Users;
