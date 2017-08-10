var React = require('react');
var PropTypes = require('prop-types');

// when a component has only render method, we can remove the React.Component from it
// it can act as normal function
// this is called STATELESS FUNCTIONAL COMPONENT (doesnt has state, only functional)
// this is useful in distinguishing the presentational component from the rest

function SelectLanguage(props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='languages'>
      {languages.map(function (lang) {
        return (
          <li
          // here we dont have access to this keyword
          // react passes props as first argument
            style = {lang === props.selectedLanguage ? {color: '#d0021b'} : null}
            onClick={props.onSelect.bind(null, lang)}
            key={lang}>{lang}
          </li>
        )
      }, this)}
    </ul>
  )
}


// popular.js does not only hav the top nav
// but also the associated grid
// hence we can separate the top nav
/*class SelectLanguage extends React.Component {

  render() {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
      <ul className='languages'>
        {languages.map(function (lang) {
          return (
            <li
            // here we wont get state here
            // hence we can get it from props
              style = {lang === this.props.selectedLanguage ? {color: '#d0021b'} : null}
              onClick={this.props.onSelect.bind(null, lang)}
              key={lang}>{lang}
            </li>
          )
        }, this)}
      </ul>
    )
  }
}*/

SelectLanguage.propTypes = {
  selectedLanguage : PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}


class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
      }
    });
  }
  render() {

    return (
      <div>
        <SelectLanguage
          selectedLanguage = {this.state.selectedLanguage}
          onSelect = {this.updateLanguage}/>
      </div>
    )
  }
}
