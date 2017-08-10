var React = require('react');

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
    };

    this.updateLanguage = this.updateLanguage.bind(this);
    // bind returns a new function specifying the context(this) inside that function
    // here we say this.updateLanguage, we want it to be a function whose this is bound always to this keyword
    // right here(bind(this))
  }
  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
      }
    });
  }
  // we know whats in the value of this only when its invoked
  // this in updateLanguage may have some other context if not invoked properly
  // hence we should bind this
  render() {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    console.log("up ", this);     // Popular

    return (
      <div>
        <ul className='languages'>
          {languages.map(function (lang) {
            console.log(this);    // this is undefined without map second argument
            return (
              <li
                style = {lang === this.state.selectedLanguage ? {color: '#d0021b'} : null}
                onClick={this.updateLanguage.bind(null, lang)}
                // bind also accepts arguments
                // first args is this
                // rest is normal arguments
                // here this is already in context, hence first args can be null
                key={lang}>{lang}
              </li>
              // here this is undefined
              // hence onclick will throw error
              // this is typical problem of map
              // hence map accepts a secong argument that is the specific context we want the function(map function)
              // to be invoked
            )
          }, this)}
        </ul>
      </div>
    )
  }
}
