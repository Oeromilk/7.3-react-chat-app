var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');

var LayoutComponent = require('./components/app.jsx').LayoutComponent;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  index: function(){
    ReactDom.render(
      React.createElement(LayoutComponent),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = router;
