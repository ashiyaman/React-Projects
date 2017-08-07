var React = require('react');
// need react-dom coz we will be rendering the react component that we make to the DOM
var ReactDOM = require('react-dom');
// whatever css is in index.css will be applied to the componenet when everything bundles.
// hence we need webpack
require('./index.css');


// Properties associated with componenet
// 1. state
// 2. lifecycle event (eg. when should it be shown to the screen)
// 3. UI( compulsory )

class App extends React.Component {
// how to tell the UI associated with it -> using render method
// every component should have a render method
// whatever the render returns is the UI of the component
render() {

  return (
    
    // the div is not HTML(though it may look like), its JSX
    // this isnt valid jS syntax
    // hence we need babel which transpiled this code to like
    // return React.createElement (
    //  "div",
    //  null,
    //  "Hello world!"
    // )
    // the above is JS
    // we can also write like this but its not easy to code like that
    <div>
      Hello World
    </div>
  )
}
}

// to use a component -> <APp />
ReactDOM.render(<App />, document.getElementById('app'));
