// webpack
// Its going to take the code(specifically code located in entry property)
// then run the code through loaders(which will transform and then combine it)
// put the code in the path specified in output property


//path -> bunch of utilities for working with file directories
//comes along with node
var path = require('path');

// this will create index.html file for us and put it in dist folder
// it will also include the output js file in the html file
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  module: {
    //its just regex
    //babel-loader is going to be used whenever files end with .js extension
    rules: [
      // babel -> transpiles ES6 code to old JS syntax
      // eg. class syntax in index.js ->most modern browsers support it
      // but if we some older browsers to supprt it, we use babel()
      // eg. convert JSX to React.createElement

      //when this line runs, webpack is going to look into babel property in package.json
      //env -> transpiles to latest version of JS( ES2015, ES2016)
      { test: /\.(js)$/, use: 'babel-loader' },
      //css-loader -> anytime it sees import, it changes to require statement
      //style-loader -> get css from the file and apply to component
      //eg. require('./index.css') will apply css in index.css in App react component
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
    ]
  },
  plugins: [
     new HtmlWebpackPlugin({
      template: 'app/index.html'
     })
   ]
};
