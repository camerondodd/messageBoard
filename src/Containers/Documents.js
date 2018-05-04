import React, { Component } from 'react';
import * as firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import '../Styles/App.css';
import { getUser, logout } from '../Actions/UserActions';
import {getDocs, saveDoc, deleteDoc} from '../Actions/DocActions';


class Documents extends Component {
  state = {
    doc:'',
    isUploading:false,
    progress:0,
    docURL:''
  }
  componentWillMount() {
    this.props.getUser();
    if (this.props.user.loading === false && this.props.user.email === undefined) {
      this.props.history.replace('/Login');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.loading === false && nextProps.user.email === undefined) {
      this.props.history.replace('/Login');
    }
  }
  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
    this.setState({avatar: filename, progress: 100, isUploading: false});
    firebase.storage().ref('files').child(filename).getDownloadURL().then(url => this.setState({docURL: url}));
  };

  render() {

    return (
      <div>
        <div className="navbar">
          <button className="btn btn-danger" onClick={() => {this.props.logout();}}>Sign out</button>
        </div>
        <div>
          {this.renderDocs()}
        </div>
        <div className="docUploader">
          {this.state.docURL &&
            <img alt="your image" className="docImg" src={this.state.docURL} />
          }
          <FileUploader
            accept="file/*"
            name="doc"
            randomizeFilename
            storageRef={firebase.storage().ref('files')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />  

        </div>
      </div>
    );
  }
}

let form = reduxForm({
  form: 'NewDoc'
})(Documents);

form = connect((state, ownProps) => ({
    user: state.user
  }), {saveDoc, getDocs, deleteDoc, getUser, logout }
)(form);

export default form;
