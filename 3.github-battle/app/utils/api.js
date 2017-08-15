var React = require('react');
var axios = require('axios');

const CLIENT_ID = '74c9e76dcaefdbb80850';
const CLIENT_SECRET = '56723a1beb27038ea74e31b8b6cc14f466e7bbe6';
const params = '?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET;

//get profile of individual player
function getProfile(username) {
  return axios.get('https://api.github.com/users/' + username + params)
    .then( function(user) {
      return user.data;
    });
}

// get repos of individual player
function getRepos(username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
}

// get the stars count of user repositories
function getStarCount(repos) {
  return repos.data.reduce( function (count,repo) {
    return count + repo.stargazers_count
  }, 0);
}

function calculateScore(profile, repos) {
  var followers = profile.followers;
  var totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

// promise call to get profile and repos
// returns an object of user profile and his score
function getUserData(player) {
  return axios.all ([
    getProfile(player),
    getRepos(player)
  ]).then(function (data) {
    var profile = data[0];
    var repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  });
}

function handleError(error) {
  console.warn(error);
  return null;
}

// function to decide the winner/loser based on each users score
function sortPlayers (players) {
  return players.sort( function(a, b) {
    return b.score - a.score;
  });
}

module.exports = {
  // this is promise
  // axios.all -> if we get response from all the promises then do
  //              something with the data
  battle: function(players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },

  fetchPopularRepos: function(language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories')

    return axios.get(encodedURI)
    // promise based calls -> hence then function
      .then( function(repos) {
        return repos.data.items
      })
  }
}
