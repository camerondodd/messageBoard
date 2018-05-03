import React, { Component } from 'react';
import * as firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import _ from 'lodash';
import '../Styles/App.css';
import PostCard from '../Components/PostCard';
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
    firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));
  };
  renderDocs(){
    return _.map(this.props.docs, (doc, key) => {
      return (
        <PostCard key={key}>
          <img href={doc} />
          <p className="card-text">
            placeholder
          </p>
          <button className="btn btn-danger float-right" onClick={() => this.props.deleteDoc(key)}>Delete</button>
        </PostCard>
      );
    });
  };
  renderField(field) {
    return (
      <input type="file" className={field.class}/>
    );
  }
  onSubmit(values) {
    this.props.saveDoc(values).then(this.props.dispatch(reset('NewDoc')));
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <div className="navbar">
          <button className="btn btn-danger" onClick={() => {this.props.logout();}}>Sign out</button>
        </div>
        <div>
          {this.renderDocs()}
        </div>
        <div>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="footerForm">
              <Field
                name="title"
                component={this.renderField}
                class="footer-title"
              />
              <button type="submit" className="btn footer-button">Post</button>
            </form>
        </div>
        <div className="docUploader">
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref('images')}
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