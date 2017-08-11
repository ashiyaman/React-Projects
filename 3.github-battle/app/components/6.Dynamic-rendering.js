
var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

function PlayerPreview (props) {
  return (
    <div className='column'>
      <div>
        <img
          className='avatar'
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />
        <h2>@{props.username}</h2>
      </div>
      <button
        className='reset'
        onClick={props.onReset.bind(null, props.id)}>
          Reset
      </button>
    </div>
  )
}


PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

// child component
// since child component is onlt required bt battle componnet(ie.not reused anywhere else)
// we can create child component here itself instead of putting in separate file
class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var value = event.target.value;
    this.setState( function() {
      return {
        username: value
      }
    })
  }

// submit form to onSubmit method with arguments id and username
  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }

  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <h4>{this.props.label}</h4>
        <input
          type='text'
          placeholder='Github Name'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}/>
        <button className='button' type='submit'
          disabled={!this.state.username}>
          Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}


// Parent component
class Battle extends React.Component {
  constructor(props) {
    super(props);
    // updating child component will update parent component
    // parent component is only updated on submitting child component not changing it
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    this.setState( function() {
      var newState = {};
      newState[id+'Name'] = username
      newState[id+'Image'] = 'https://github.com/' + username + '.png?size=200'
      return newState
    })
  }

  handleReset(id) {
    this.setState( function() {
      var newState = {};
      newState[id+'Name'] = '';
      newState[id+'Image'] = null;
      return newState;
    })
  }

  render() {
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;
    var playerOneImage = this.state.playerOneImage;
    var playerTwoImage = this.state.playerTwoImage;


    return (
      <div>
        <div className='row'>

          { !playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
          />}

          { playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              id='playerOne'
              onReset={this.handleReset}
              username={playerOneName}
          />}

          { !playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
          />}

          { playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              id='playerTwo'
              onReset={this.handleReset}
              username={playerTwoName}
          />}
        </div>

        { playerOneImage && playerTwoImage &&
          <Link
            className='button'>
          </Link>
        }
      </div>
    )
  }
}

module.exports = Battle;
