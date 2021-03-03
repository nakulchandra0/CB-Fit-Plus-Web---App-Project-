/* eslint-disable jsx-a11y/media-has-caption */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import './styles.scss';

class UploadImage extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  thumbs = () =>
    this.props.files &&
    this.props.files.map((file, index) => (
      // eslint-disable-next-line no-underscore-dangle
      <div className="thumb" key={file.preview || file._id}>
        <div className="thumbInner">
          <video width="320" height="240" controls>
            <source src={file.preview && file.preview} type="video/mp4" />
          </video>
          <Button
            size="mini"
            icon
            onClick={() => this.props.removePhoto(index)}
            className="btn"
          >
            X
          </Button>
        </div>
      </div>
    ));

  render() {
    return (
      <div>
        <Dropzone
          onDrop={this.props.onDrop}
          multiple={this.props.multiple}
          accept="video/mp4"
        >
          {({ getRootProps, getInputProps, rejectedFiles }) => {
            const isFileTooLarge =
              (rejectedFiles &&
                rejectedFiles.length > 0 &&
                rejectedFiles[0].size > 10485760) ||
              (rejectedFiles &&
                rejectedFiles.length > 1 &&
                rejectedFiles.map(file => file.size > 10485760));
            return (
              <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drop files here or click to upload</p>
                <em> Only mp4 file is allowed for upload</em>
                {isFileTooLarge && (
                  <div className="text-danger">File Too Large</div>
                )}
              </div>
            );
          }}
        </Dropzone>
        <aside className="thumbsContainer">{this.thumbs()}</aside>
      </div>
    );
  }
}

UploadImage.propTypes = {
  files: PropTypes.array,
  removePhoto: PropTypes.func,
  onDrop: PropTypes.func,
  multiple: PropTypes.bool,
};

export default UploadImage;
