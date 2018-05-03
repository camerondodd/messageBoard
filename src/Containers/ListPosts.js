import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, savePost, deletePost } from '../Actions/PostActions';
import { Field, reduxForm, reset } from 'redux-form';
import '../Styles/App.css';
import _ from 'lodash';
import PostCard from '../Components/PostCard';
import { getUser, logout } from '../Actions/UserActions';
import DiceRoller from '../Components/DiceRoller';

class App extends Component {
  componentWillMount() {
    this.props.getPosts();
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

  renderPosts() {
    return _.map(this.props.posts, (post, key) => {
      return (
        <PostCard key={key}>
          <h3 className="card-title">
            {post.title}
          </h3>
          <p className="card-text">
            {post.body}
          </p>
          <button className="btn btn-danger float-right postDel" onClick={() => this.props.deletePost(key)}>Delete</button>
        </PostCard>
      );
    });
  }

  renderField(field) {
    return (
      <input type="text" placeholder={`Enter a ${field.label}...`} {...field.input} className={field.class}/>
    );
  }
  onSubmit(values) {
    this.props.savePost(values).then(this.props.dispatch(reset('NewPost')));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <div className="btn-group">
          <button className="btn btn-danger" onClick={() => {this.props.logout();}}>Sign out</button>
          <a href="#LatestPost" className="btn btn-primary">Latest Post</a>
        </div>
        <div id="announcements">
          <PostCard>
          <h3 className="card-title">
            Developer
          </h3>
          <p className="card-text announcementText">
            Howdy!  This site is a fun and minimalist forum, and is still a work in progress.  Features will continue to be added as I am able or they are required. 
            Until then, you are on the honor system.  Please don't delete someone else's post, or sign a post as someone else.
            That said, enter your character's name and an action and post! Super easy, right?
          </p>
          </PostCard>
        </div>
        <div className="container">
          <div className="main">
            {this.renderPosts()}
          </div>
        </div>
        <div className="mascotContainer">
          <img id="LatestPost" src="../dragon.png" alt="adorable dragon" />
        </div>
          <div className="fixed-bottom postMaker">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="footerForm form-inline">
              <Field
                name="title"
                component={this.renderField}
                label="Character"
                class="footer-title"
              />
              <Field
                name="body"
                component={this.renderField}
                label="Action"
                class="footer-body"
              />
              <button type="submit" className="btn footer-button">Post</button>
            </form>
        </div>
      </div>
    );
  }
}

let form = reduxForm({
  form: 'NewPost'
})(App);

form = connect((state, ownProps) => ({
    posts: state.posts,
    user: state.user
  }), { savePost, getPosts, deletePost, getUser, logout }
)(form);

export default form;