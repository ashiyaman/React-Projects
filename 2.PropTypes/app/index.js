import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Avatar extends React.Component {
  render() {
    return (
      <img src={this.props.img}/>
    )
  }
}

class Label extends React.Component {
  render() {
    return (
      <h1>Name: {this.props.name}</h1>
    )
  }
}

class ScreenName extends React.Component {
  render() {
    return(
      <h3>Username: {this.props.username}</h3>
    )
  }
}

class Badge extends React.Component {
  render() {
    return (
      <div>
        <Avatar img={this.props.user.img}/>
        <Label name={this.props.user.name}/>
        <ScreenName username={this.props.user.username}/>
      </div>
    )
  }
}

Badge.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}

// when we use the component(ie. Badge), we are passing user attribute
// we can access this attribute in the component as this.props.user
ReactDOM.render(
  <Badge user={{
    name: 'Ashiya Banu',
    img: 'https://avatars0.githubusercontent.com/u/14231344?v=4&s=460',
    username: 'ashiyaman'
  }}/>,
  document.getElementById('app')
);

// what if instead of passing img src as string, we pass as img: {img: ''}
// hence, to validate the type of input, proptypes is used
