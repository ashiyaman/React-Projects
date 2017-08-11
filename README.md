# React-Projects

# Why we need both react and react-dom
# react is solution for more than just the DOM like react-native
# So it was decoupled( so react can be rendered to different environment ie.RN and DOM)

# npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react css-loader style-loader html-webpack-plugin    webpack webpack-dev-server
# --save-dev -> coz instead of saving as normal dependency, its going to save all modules as dev-dependencies
# we have separated dependencies (ie. we know what dependencies are needed to run the app and whats needed to develop the app)

# webpack
# Its going to take the code(specifically code located in entry property)
# then run the code through loaders(which will transform and then combine it)
# put the code in the path specified in output property

# react-router
# need react-router-dom
#   -> like react, even react router can be rendered to different environment like RN and DOM
