/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react';
import '../styles.scss';
import PropTypes from 'prop-types';
import moment from 'moment';
import get from 'lodash/get';
import TableComponent from '../../TableComponent';
import trophy1 from '../../../images/trophy_1.png';
import trophy3 from '../../../images/trophy_3.png';
import trophy5 from '../../../images/trophy_5.png';
import trophy7 from '../../../images/trophy_7.png';
import trophy9 from '../../../images/trophy_9.png';
import trophy10 from '../../../images/trophy_10.png';
import trophy11 from '../../../images/trophy_11.png';

const ViewUser = props => {
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        id: 'id',
        accessor: '_id',
      },

      {
        Header: 'Instructor Name',
        className: 'instructorName',
        accessor: 'instructorName',
      },
      {
        Header: 'BookDate',
        className: 'bookDate',
        accessor: 'bookDate',
      },
      {
        Header: 'AttendClassDate',
        className: 'attendClassDate',
        accessor: 'attendClassDate',
      },
      {
        Header: '	Date',
        className: 'date',
        accessor: 'date',
      },
      {
        Header: '	ClassType',
        className: 'classType',
        id: 'classType',
        accessor: 'classType',
      },
      {
        Header: '	Duration',
        className: 'duration',
        id: 'duration',
        accessor: 'duration',
      },
      {
        Header: '	Difficulty',
        className: 'difficulty',
        id: 'difficulty',
        accessor: 'difficulty',
      },
      {
        Header: '	DanceClassType',
        className: 'danceClassType',
        id: 'danceClassType',
        accessor: 'danceClassType',
      },
      {
        Header: '	SongAndArtist',
        className: 'songAndArtist',
        id: 'songAndArtist',
        accessor: 'songAndArtist',
      },

      {
        Header: '	classlength',
        className: 'classlength',
        id: 'classlength',
        accessor: 'classlength',
      },
    ],
    [],
  );

  let attend_class = get(props, ['completedClass']);

  attend_class =
    attend_class &&
    attend_class.map((attend, idx) => ({
      number: idx + 1,
      instructorName: attend.instructorName,
      bookDate: attend.bookDate,
      attendClassDate: attend.attendClassDate,
      date: attend.date,
      classType: attend.classType,
      duration: attend.duration,
      difficulty: attend.difficulty,
      danceClassType: attend.danceClassType,
      songAndArtist: attend.songAndArtist,
      _id: attend._id,
    }));

  const bookmarkColumns = useMemo(
    () => [
      {
        // eslint-disable-next-line no-underscore-dangle
        Header: 'ID',
        id: 'id',
        accessor: '_id',
      },

      {
        Header: 'Instructor Name',
        className: 'instructorName',
        accessor: 'instructorName',
      },
      {
        Header: 'Date',
        className: 'date',
        accessor: 'date',
      },
      {
        Header: 'ClassType',
        className: 'classType',
        accessor: 'classType',
      },
      {
        Header: '	Duration',
        className: 'duration',
        accessor: 'duration',
      },
      {
        Header: '	Difficulty',
        className: 'difficulty',
        id: 'difficulty',
        accessor: 'difficulty',
      },
      {
        Header: '	DanceClassType',
        className: 'danceClassType',
        id: 'danceClassType',
        accessor: 'danceClassType',
      },
      {
        Header: '	SongAndArtist',
        className: 'songAndArtist',
        id: 'songAndArtist',
        accessor: 'songAndArtist',
      },
    ],
    [],
  );

  let bookmark_class = get(props, ['bookClass']);

  bookmark_class =
    bookmark_class &&
    bookmark_class.map((bookmark, idx) => ({
      number: idx + 1,
      instructorName: bookmark.instructorName,
      date: bookmark.date,
      classType: bookmark.classType,
      duration: bookmark.duration,
      difficulty: bookmark.difficulty,
      danceClassType: bookmark.danceClassType,
      songAndArtist: bookmark.songAndArtist,
      _id: bookmark._id,
    }));

  const bookColumns = useMemo(
    () => [
      {
        Header: 'ID',
        id: 'id',
        accessor: '_id',
      },

      {
        Header: 'Instructor Name',
        className: 'instructorName',
        accessor: 'instructorName',
      },
      {
        Header: 'BookDate',
        className: 'bookDate',
        accessor: 'bookDate',
      },
      {
        Header: 'Date',
        className: 'date',
        accessor: 'date',
      },
      {
        Header: 'ClassType',
        className: 'classType',
        accessor: 'classType',
      },
      {
        Header: '	Duration',
        className: 'duration',
        accessor: 'duration',
      },
      {
        Header: '	Difficulty',
        className: 'difficulty',
        id: 'difficulty',
        accessor: 'difficulty',
      },
      {
        Header: '	DanceClassType',
        className: 'danceClassType',
        id: 'danceClassType',
        accessor: 'danceClassType',
      },
      {
        Header: '	SongAndArtist',
        className: 'songAndArtist',
        id: 'songAndArtist',
        accessor: 'songAndArtist',
      },
    ],
    [],
  );

  let book_class = get(props, ['singleClass']);

  book_class =
    book_class &&
    book_class.map((book, idx) => ({
      number: idx + 1,
      instructorName: book.instructorName,
      bookDate: book.bookDate,
      bookClassDate: book.bookClassDate,
      date: book.date,
      classType: book.classType,
      duration: book.duration,
      difficulty: book.difficulty,
      danceClassType: book.danceClassType,
      songAndArtist: book.songAndArtist,
      _id: book._id,
    }));

  return (
    <div className="card">
      <div
        className="content d-flex flex-column flex-column-fluid"
        id="kt_content"
      >
        <div className="d-flex flex-column-fluid">
          <div className="container">
            <div className="card card-custom gutter-b">
              <div className="card-body">
                <div className="d-flex">
                  <div className="flex-shrink-0 mr-7 mt-lg-0 mt-3">
                    <div className="symbol symbol-50 symbol-lg-120">
                      <img
                        src={
                          props.singleUser.user && props.singleUser.user.image
                        }
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between flex-wrap mt-1">
                      <div className="d-flex mr-3">
                        <h2 className="text-dark-75 text-hover-primary font-size-h2 font-weight-bold mr-3">
                          {props.singleUser.user && props.singleUser.user.name}
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
                              {props.singleUser.user &&
                                props.singleUser.user.email}
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
                              {props.singleUser.user &&
                                props.singleUser.user.phone}
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
                              {moment(
                                props.singleUser.user &&
                                  props.singleUser.user.dob,
                              ).format('DD-MM-yyyy')}
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
                              {props.singleUser.user &&
                                props.singleUser.user.gender}
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                        <span className="mr-4">
                          <i className="flaticon2-pin display-4 text-muted font-weight-bold" />
                        </span>
                        <div className="d-flex flex-column flex-lg-fill">
                          <span className="text-dark-75 font-weight-bolder font-size-sm">
                            Address
                          </span>
                          <span className="font-weight-bolder font-size-h5">
                            <span className="text-dark-50 font-weight-bold">
                              {props.singleUser.user &&
                                props.singleUser.user.address}{' '}
                              {props.singleUser.user &&
                                props.singleUser.user.city}{' '}
                              {props.singleUser.user &&
                                props.singleUser.user.country}{' '}
                              {props.singleUser.user &&
                                props.singleUser.user.postcode}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card card-custom gutter-b">
              <div className="card-body">
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between flex-wrap mt-1">
                      <div className="d-flex mr-3">
                        <h2 className="text-dark-75 text-hover-primary font-size-h2 font-weight-bold mr-3">
                          Subscription
                        </h2>
                      </div>
                    </div>

                    <div className="d-flex align-items-center flex-wrap mt-3">
                      <div className="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                        <span className="mr-4">
                          <i className="flaticon-shapes display-4 text-muted font-weight-bold" />
                        </span>
                        <div className="d-flex flex-column">
                          <span className="text-dark-75 font-weight-bolder font-size-sm">
                            Subscription Plan
                          </span>
                          <span className="font-weight-bolder font-size-h5">
                            <span className="text-dark-50 font-weight-bold">
                              {props.singleUser.user &&
                                props.singleUser.user.subscriptionType}
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                        <span className="mr-4">
                          <i className="flaticon2-calendar display-4 text-muted font-weight-bold" />
                        </span>
                        <div className="d-flex flex-column text-dark-75">
                          <span className="font-weight-bolder font-size-sm">
                            Subscription Start Date
                          </span>
                          <span className="font-weight-bolder font-size-h5">
                            <span className="text-dark-50 font-weight-bold">
                              {moment(
                                props.singleUser.user &&
                                  props.singleUser.user.subscriptionStartDate,
                              ).format('MM-DD-yyyy')}
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                        <span className="mr-4">
                          <i className="flaticon2-calendar display-4 text-muted font-weight-bold" />
                        </span>
                        <div className="d-flex flex-column text-dark-75">
                          <span className="font-weight-bolder font-size-sm">
                            Subscription End Date
                          </span>
                          <span className="font-weight-bolder font-size-h5">
                            <span className="text-dark-50 font-weight-bold">
                              {moment(
                                props.singleUser.user &&
                                  props.singleUser.user.subscriptionEndDate,
                              ).format('MM-DD-yyyy')}
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                        <span className="mr-4">
                          <i className="fas fa-dollar-sign icon-3x text-muted" />
                        </span>
                        <div className="d-flex flex-column text-dark-75">
                          <span className="font-weight-bolder font-size-sm">
                            Subscription Pay
                          </span>
                          <span className="font-weight-bolder font-size-h5">
                            <span className="text-dark-50 font-weight-bold">
                              Stripe
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card card-custom gutter-b">
              <div className="card-body">
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between flex-wrap mt-1">
                      <div className="d-flex mr-3">
                        <h2 className="text-dark-75 text-hover-primary font-size-h2 font-weight-bold mr-3">
                          Trophy Case
                        </h2>
                      </div>
                    </div>

                    <div className="d-flex align-items-center flex-wrap mt-3">
                      <div className="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                        <span className="mr-4">
                          <img src={trophy1} className="trophy_img" alt="" />
                        </span>
                      </div>

                      <div className="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                        <span className="mr-4">
                          <img src={trophy3} className="trophy_img" alt="" />
                        </span>
                      </div>

                      <div className="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                        <span className="mr-4">
                          <img src={trophy5} className="trophy_img" alt="" />
                        </span>
                      </div>

                      <div className="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                        <span className="mr-4">
                          <img src={trophy7} className="trophy_img" alt="" />
                        </span>
                      </div>

                      <div className="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                        <span className="mr-4">
                          <img src={trophy9} className="trophy_img" alt="" />
                        </span>
                      </div>

                      <div className="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                        <span className="mr-4">
                          <img src={trophy10} className="trophy_img" alt="" />
                        </span>
                      </div>

                      <div className="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                        <span className="mr-4">
                          <img src={trophy11} className="trophy_img" alt="" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card card-custom card-stretch gutter-b">
                  <div className="card-header border-0 pt-5">
                    <div className="d-flex justify-content-between flex-wrap mt-1">
                      <div className="d-flex mr-3">
                        <h2 className="text-dark-75 text-hover-primary font-size-h2 font-weight-bold mr-3">
                          Classes
                        </h2>
                      </div>
                    </div>
                    <div className="card-toolbar">
                      <ul className="nav nav-pills nav-pills-sm nav-dark-75">
                        <li className="nav-item">
                          <a
                            className={`nav-link py-2 px-4  ${props.type ===
                              'attend_classes' && 'active'}`}
                            data-toggle="tab"
                            href
                            onClick={() =>
                              props.handleRedirect('attend_classes')
                            }
                          >
                            Attend Classes
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link py-2 px-4 ${props.type ===
                              'book_classes' && 'active'}`}
                            data-toggle="tab"
                            href
                            onClick={() => props.handleRedirect('book_classes')}
                          >
                            Book Classes
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link py-2 px-4 ${props.type ===
                              'bookmark_classes' && 'active'}`}
                            data-toggle="tab"
                            href
                            onClick={() =>
                              props.handleRedirect('bookmark_classes')
                            }
                          >
                            Bookmark Classes
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="card-body pt-2 pb-0 mt-n3 mb-6">
                    <div className="tab-content mt-5">
                      {props.type === 'attend_classes' && (
                        <div
                          className="tab-pane fade show active"
                          id="attend_classes"
                          role="tabpanel"
                          aria-labelledby="attend_classes"
                        >
                          <h3>Attend Classes</h3>
                          <TableComponent
                            data={attend_class}
                            columns={columns}
                            manual
                            pages={Math.ceil(
                              props.user &&
                                props.user.completedClass &&
                                props.user.completedClass.count /
                                  props.state.limit,
                            )}
                            pageSize={props.state.limit}
                            defaultPageSize={props.state.limit}
                            onPageChange={props.handlePageChange}
                            onPageSizeChange={props.handleLimitChange}
                          />
                        </div>
                      )}
                      {props.type === 'book_classes' && (
                        <div
                          id="book_classes"
                          role="tabpanel"
                          aria-labelledby="book_classes"
                        >
                          <h3>Book Classes</h3>
                          <TableComponent
                            data={book_class}
                            columns={bookColumns}
                            manual
                            pages={Math.ceil(
                              props.user &&
                                props.user.class &&
                                props.user.class.count / props.state.limit,
                            )}
                            pageSize={props.state.limit}
                            defaultPageSize={props.state.limit}
                            onPageChange={props.handlePageChange}
                            onPageSizeChange={props.handleLimitChange}
                          />
                        </div>
                      )}
                      {props.type === 'bookmark_classes' && (
                        <div
                          id="bookmark_classes"
                          role="tabpanel"
                          aria-labelledby="bookmark_classes"
                        >
                          <h3>Bookmark Classes</h3>
                          <TableComponent
                            data={bookmark_class}
                            columns={bookmarkColumns}
                            manual
                            pages={Math.ceil(
                              props.user &&
                                props.user.bookClass &&
                                props.user.bookClass.count / props.state.limit,
                            )}
                            pageSize={props.state.limit}
                            defaultPageSize={props.state.limit}
                            onPageChange={props.handlePageChange}
                            onPageSizeChange={props.handleLimitChange}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ViewUser.propTypes = {
  singleUser: PropTypes.object,
  bookClass: PropTypes.object,
  type: PropTypes.string,
  handleRedirect: PropTypes.func,
  completedClass: PropTypes.object,
  // singleClass: PropTypes.object,
  handlePageChange: PropTypes.func,
  handleLimitChange: PropTypes.func,
  user: PropTypes.array,
  state: PropTypes.object,
};

export default ViewUser;
