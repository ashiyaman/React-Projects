var React = require('react');
// Link and Navlink are both required to render an actual anchor tag
// var Link = require('react-router-dom').Link;
// Navlink is coz sometimes we may need to change the style based on if the link is active
// eg. highlighting the current tag
// also navlink comprises of link with some extra properties added to it
// hence can remove link
var NavLink = require('react-router-dom').NavLink;

function Nav() {
  // exact
  // -> when we go to /battle or /popular, / is also going to be active coz its to is /
  // -> hence active class will also be applied to Home
  // -> hence we add exact property to home
  return (
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/'>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/battle'>
          Battle
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/popular'>
          Popular
        </NavLink>
      </li>
    </ul>
  )
}

module.exports = Nav;
