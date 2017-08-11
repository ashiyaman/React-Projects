var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
// even when we route to something like '/jfkdjfd', our application doesnt throws an error
// hence switch will enable only one of the route and disable other router( ie only 1 route will be active)
var Switch = ReactRouter.Switch;
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var Popular = require('./Popular');

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/battle' component={Battle} />
            <Route path='/popular' component={Popular} />
            // when none of above routes are active default to not found page
            // ie. if we give /hedfjeoijeio, it will show Not Found page
            <Route render={function() {
              return <p>Not Found</p>
            }}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

module.exports = App;
