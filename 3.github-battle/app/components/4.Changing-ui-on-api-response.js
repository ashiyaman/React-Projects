var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function SelectLanguage(props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='languages'>
      {languages.map(function (lang) {
        return (
          <li
            style = {lang === props.selectedLanguage ? {color: '#d0021b'} : null}
            onClick={props.onSelect.bind(null, lang)}
            key={lang}>{lang}
          </li>
        )
      }, this)}
    </ul>
  )
}

function RepoGrid(props) {
  return(
      <ul className='popular-grid'>
        {props.repos.map(function (repo, index) {
          return (
            <li key={repo.name} className='popular-item'>
              <div className='popular-rank'>#{ index+1 }</div>
              <ul className='list-items'>
                <li>
                  <img
                    src={repo.owner.avatar_url}
                    className='avatar' />
                </li>
                <li><a href={repo.html_url}>{repo.name}</a></li>
                <li>@{repo.owner.login}</li>
                <li>{repo.stargazers_count} stars</li>
              </ul>
            </li>
          )
        })}
      </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage : PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    // we need to fetch from api each time the language is changed
    // hence its best to put that in updatelang function
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
      }
    })

    api.fetchPopularRepos(lang)
        .then( function(repos) {
          this.setState( function() {
            return {
              repos: repos
            }
          })
        }.bind(this));
        console.log("down...",this.state.repos)
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage = {this.state.selectedLanguage}
          onSelect = {this.updateLanguage}/>

          {!this.state.repos
            ? <p>LOADING!</p>
            : <RepoGrid repos={this.state.repos} />}
      </div>
    )
    // this will give error coz we are calling map function even before api return anything
    /*<RepoGrid
      repos={this.state.repos}/>*/
  }
}
