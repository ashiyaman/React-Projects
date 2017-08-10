var React = require('react');
var Popular = require('./Popular');


class App extends React.Component {
  render() {
    // return has () coz if we do return, JS will add ; at end (ie.return;) and the next line ie.div will not be executed
    return (
      <div className='container'>
        <Popular />
      </div>
    )
  }
}

module.exports = App;
