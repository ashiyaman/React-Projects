var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
// we are directly requiring webpack coz it allows us tp do these 2 things
// 1. need to add NODE_ENV variable to production
//    ->let react know that we need to build our app in production module
// 2. also add uglify/ minify all of our code

// if we are building our application for production,
// we want to add certain plugins to our config object
config = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    // public path lets to set base url for our assets
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
    ]
  },
  devServer: {
    // if we refresh our /battle or /popular pages, it will throw error
    // coz it finds in the assets of our server but we dont have it
    // historyApiFallback
    //    -> whenever it sees /battle or /popular, instead of requesting assets from server it will redirect to localhost:8080
    //    -> our react router will see that and route to our respective component
    historyApiFallback: true
  },
  plugins: [
     new HtmlWebpackPlugin({
      template: 'app/index.html'
     })
   ]
};

// we are setting NODE_ENV variable both in package.json(scripts->build) and here coz
//    -> when we set NODE_ENV variable to production in package.JSON
//    -> that is going to set the NODE_ENV variable in webpack.config file but
//    -> not in compiled code that webpack is going to compile
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    // create new webpack plugin  and set process.env property to production
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        // the way we say react that we want to use the production version of react
        //  -> setting the NODE_ENV variable of process.env object of react to production
        //  -> react will then strip off any warnings or console.log and build specifically for production
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  )
}

module.exports = config;
