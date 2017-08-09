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
      /* <div>
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
      </div> */
      // this will give error in console (Warning: Each child in an array or iterator should have a unique "key" prop)
      // unique key helps to update or delete the specific item

      <div>
        <h1>Friends</h1>
          <ul>
            {friends.map(function(user) {
              return <li key={user.name}>{user.name}</li>
            })}
          </ul>

        <h1>Non-Friends</h1>
          <ul>
            {nonFriends.map(function(user, index) {
              return <li key={index}>{user.name}</li>
            })}
          </ul>
      </div>
      // here, for key we give unique value ( we assume that name is unique)
      // if we dont have unique values, we can give index
    )
  }
}

/*User.propTypes = {
  list: PropTypes.array.isRequired
}*/

// prop-types is useful to validate
// also, instead of looking at render() method to figure out whats going on, we can look at propTypes to understand
// what is required by the component
// we can specifically say

/*User.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object)
}*/

// or more specifically specifically
User.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    friend: PropTypes.bool.isRequired
  }))
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
