var React = require('react');
// axios returns promise based calls
var axios = require('axios');

module.exports = {
  fetchPopularRepos: function(language) {

    // window.encodeURI will turn
    // https://api.github.com/search/repositories?q=stars:>1+language:'+ 'Java' + '&sort=stars&order=desc&type=Repositories'
    // which is human readable to something like
    // "https://api.github.com/search/repositories?q=stars:%3E1+language:Java&sort=stars&order=desc&type=Repositories"
    // which is machine readable
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories')

    return axios.get(encodedURI)
    // promise based calls -> hence then function
      .then( function(repos) {
        return repos.data.items
      })
  }
}
