var React = require('react');
var PropTypes = require('prop-types');

var styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
}

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.originalText = props.text
    this.state = {
      text: this.originalText
    }
  }

  componentDidMount() {
      var stopper = this.state.text + '...'
      this.interval = setInterval( function() {
        // check until text has 3 dots(ie. '...')
          if(this.state.text === stopper) {
            this.setState( function() {
              return {
                text: this.originalText
              }
            })
          }else {
            // prevstate gives the previous state of the component
            this.setState( function(prevState) {
              // add 1 more dot to the text
              return {
                text: prevState.text + '.'
              }
            })
          }
      }.bind(this), this.props.speed);
      // can give custom speed
  }

// lifecycle of Component
// clear the interval
// otherwise this keeps on running for the specified time interval
  componentWillUnmount() {
    console.log('clear');
    window.clearInterval(this.interval);
  }

  render() {
    console.log(this.state.text);
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}


// if the user doesnt give custom props
// component will use the default props
Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}

module.exports = Loading;
