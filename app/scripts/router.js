var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');

var loginComponent = require('./components/login.jsx').Login;
var ChatComponent = require('./components/chat_bubble.jsx').ChatComponent;
var ChatCollection = require('./models/messages.js').MessageCollection;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'chat/': 'chat',
  },
  initialize: function(){
    this.username = '';
  },
  index: function(){
    ReactDom.render(
      React.createElement(loginComponent, {router: this}),
      document.getElementById('app')
    );
  },
  chat: function(){
    var collection = new ChatCollection();
    collection.fetch();

    ReactDom.render(
      React.createElement(ChatComponent, {collection: collection, username: this.username}),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = router;
