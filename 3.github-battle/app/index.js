import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class User extends React.Component {
  render() {
    var friends = this.props.list.filter(function(user) {
      return user.friend === true
    });

    var nonFriends = this.props.list.filter(function(user) {
      return user.friend === false
    });
    
    return (
      <div>
        <h1>Friends</h1>
          <ul>
            {friends.map(function(user) {
              return <li>{user.name}</li>
            })}
          </ul>
        <h1>Non-Friends</h1>
          <ul>
            {nonFriends.map(function(user) {
              return <li>{user.name}</li>
            })}
          </ul>
      </div>
    )
  }
}


ReactDOM.render(
  <User list={[
    { name: 'Tyler', friend: true },
    { name: 'Ryan', friend: true },
    { name: 'Michael', friend: false },
    { name: 'Mikenzi', friend: false },
    { name: 'Jessica', friend: true },
    { name: 'Dan', friend: false } ]}
  />,
  document.getElementById('app')
);
