var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');
var PlayerPreview = require('./PlayerPreview');

function Profile(props) {
  var info = props.info;

  // we can give ui from children to parent
  // parent renders via {props.children}
  // useful in creating reusable components
  return (
    <PlayerPreview
      avatar={info.avatar_url}
      username={info.login}>
        <ul className='space-list-items'>
          {info.name && <li>{info.name}</li>}
          {info.location && <li>{info.location}</li>}
          {info.company && <li>{info.company}</li>}
          <li>Followers: {info.followers}</li>
          <li>Following: {info.following}</li>
          <li>Public Repos: {info.public_repos}</li>
          {info.blog && <li>{info.blog}</li>}
        </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

function Player(props) {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
      <Profile
        info={props.profile}></Profile>
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount() {
    var players = queryString.parse(location.search);

    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then( function(players) {

      // api will return null if there is an error
      if (players === null) {
        return this.setState( function() {
          return {
            error: 'Looks like there was an error. Check that both users exist on Github.' ,
            loading: false
          }
        })
      }

      this.setState( function() {
        return {
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        }
      })
    }.bind(this));
  }

  render() {

    var winner = this.state.winner;
    var loser = this.state.loser;
    var error = this.state.error;
    var loading = this.state.loading;

    if( loading === true) {
      return <p>Loading..</p>
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}/>
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}/>
      </div>
    )
  }

}

module.exports = Results;
