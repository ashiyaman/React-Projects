var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
