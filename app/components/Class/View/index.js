import React from 'react';
import PropTypes from 'prop-types';
import Vimeo from 'react-vimeo';
import DialPad from '../../../images/svg/side-class.svg';

const ViewClass = ({ viewClass }) => (
  <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
    <div className="d-flex flex-column-fluid">
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <span className="card-icon">
                <img src={DialPad} alt="" />
              </span>
              <h3 className="card-label">Class Information</h3>
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex">
              <div className="flex-grow-1">
                <div className="d-flex align-items-center flex-wrap mt-3">
                  <div className="d-flex align-items-center flex-lg-fill mr-5 mb-5">
                    <span className="mr-4">
                      <i className="flaticon-calendar-1 display-4 text-muted font-weight-bold" />
                    </span>
                    <div className="d-flex flex-column text-dark-75">
                      <span className="font-weight-bolder font-size-sm">
                        Air Date
                      </span>
                      <span className="font-weight-bolder font-size-h5">
                        <span className="text-dark-50 font-weight-bold">
                          {viewClass && viewClass.date}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-lg-fill mr-5 mb-5">
                    <span className="mr-4">
                      <i className="flaticon-clock-1 display-4 text-muted font-weight-bold" />
                    </span>
                    <div className="d-flex flex-column text-dark-75">
                      <span className="font-weight-bolder font-size-sm">
                        Air Time
                      </span>
                      <span className="font-weight-bolder font-size-h5">
                        <span className="text-dark-50 font-weight-bold">
                          {viewClass && viewClass.airTime}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-lg-fill mr-5 mb-5">
                    <span className="mr-4">
                      <i className="flaticon-calendar-1 display-4 text-muted font-weight-bold" />
                    </span>
                    <div className="d-flex flex-column text-dark-75">
                      <span className="font-weight-bolder font-size-sm">
                        Recording Date
                      </span>
                      <span className="font-weight-bolder font-size-h5">
                        <span className="text-dark-50 font-weight-bold">
                          {viewClass && viewClass.recordingDate}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-lg-fill mr-5 mb-5">
                    <span className="mr-4">
                      <i className="flaticon-clock-1 display-4 text-muted font-weight-bold" />
                    </span>
                    <div className="d-flex flex-column text-dark-75">
                      <span className="font-weight-bolder font-size-sm">
                        Recording Time
                      </span>
                      <span className="font-weight-bolder font-size-h5">
                        <span className="text-dark-50 font-weight-bold">
                          {viewClass && viewClass.recordingTime}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div className="flex-grow-1">
                <div className="d-flex align-items-center flex-wrap mt-3">
                  <div className="d-flex align-items-center flex-lg-fill mr-5 mb-5">
                    <span className="mr-4">
                      <i className="flaticon-grid-menu-v2 display-4 text-muted font-weight-bold" />
                    </span>
                    <div className="d-flex flex-column text-dark-75">
                      <span className="font-weight-bolder font-size-sm">
                        Class Type
                      </span>
                      <span className="font-weight-bolder font-size-h5">
                        <span className="text-dark-50 font-weight-bold">
                          {viewClass && viewClass.classType}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-lg-fill mr-5 mb-5">
                    <span className="mr-4">
                      <i className="flaticon-grid-menu-v2 display-4 text-muted font-weight-bold" />
                    </span>
                    <div className="d-flex flex-column text-dark-75">
                      <span className="font-weight-bolder font-size-sm">
                        Class Length
                      </span>
                      <span className="font-weight-bolder font-size-h5">
                        <span className="text-dark-50 font-weight-bold">
                          {viewClass && viewClass.duration}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-lg-fill mr-5 mb-5">
                    <span className="mr-4">
                      <i className="flaticon-grid-menu-v2 display-4 text-muted font-weight-bold" />
                    </span>
                    <div className="d-flex flex-column text-dark-75">
                      <span className="font-weight-bolder font-size-sm">
                        Difficulty Level
                      </span>
                      <span className="font-weight-bolder font-size-h5">
                        <span className="text-dark-50 font-weight-bold">
                          {viewClass && viewClass.difficulty}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-lg-fill mr-5 mb-5">
                    <span className="mr-4">
                      <i className="flaticon-grid-menu-v2 display-4 text-muted font-weight-bold" />
                    </span>
                    <div className="d-flex flex-column text-dark-75">
                      <span className="font-weight-bolder font-size-sm">
                        Class Style
                      </span>
                      <span className="font-weight-bolder font-size-h5">
                        <span className="text-dark-50 font-weight-bold">
                          {viewClass && viewClass.danceClassType}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div className="flex-grow-1">
                <div className="d-flex align-items-center flex-wrap mt-3">
                  <div className="d-flex align-items-center flex-lg-fill mr-5 mb-5">
                    <span className="mr-4">
                      <i className="flaticon-user display-4 text-muted font-weight-bold" />
                    </span>
                    <div className="d-flex flex-column text-dark-75">
                      <span className="font-weight-bolder font-size-sm">
                        Instructor
                      </span>
                      <span className="font-weight-bolder font-size-h5">
                        <span className="text-dark-50 font-weight-bold">
                          Lisa
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-lg-fill mr-5 mb-5">
                    <span className="mr-4">
                      <i className="flaticon-music display-4 text-muted font-weight-bold" />
                    </span>
                    <div className="d-flex flex-column text-dark-75">
                      <span className="font-weight-bolder font-size-sm">
                        Song & Artist
                      </span>
                      <span className="font-weight-bolder font-size-h5">
                        <span className="text-dark-50 font-weight-bold">
                          {viewClass && viewClass.songAndArtist}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="flex-grow-1">
                <div className="d-flex align-items-center flex-wrap mt-3">
                  <div className="d-flex align-items-center flex-lg-fill mr-5 mb-5">
                    <div className="d-flex flex-column text-dark-75">
                      <span className="font-weight-bolder font-size-sm">
                        Sneak Peek
                      </span>
                      <span className="font-weight-bolder font-size-h5">
                        {/* <iframe
                          width="500px"
                          height="270px"
                          src="https://www.youtube.com/embed/jssO8-5qmag"
                          style="border: none;"
                        /> */}
                        <Vimeo
                          videoId={viewClass && viewClass.videoForSneakPeek}
                        />
                      </span>
                    </div>
                  </div>
                  {viewClass && viewClass.videoForAiring && (
                    <div className="d-flex align-items-center flex-lg-fill mr-5 mb-5">
                      <div className="d-flex flex-column text-dark-75">
                        <span className="font-weight-bolder font-size-sm">
                          For Airing
                        </span>

                        <span className="font-weight-bolder font-size-h5">
                          {/* <iframe
                          width="500px"
                          height="270px"
                          src="https://www.youtube.com/embed/jssO8-5qmag"
                          style="border: none;"
                        /> */}
                          <Vimeo
                            videoId={viewClass && viewClass.videoForAiring}
                          />
                        </span>
                      </div>
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
);
ViewClass.propTypes = {
  viewClass: PropTypes.object,
};
export default ViewClass;
