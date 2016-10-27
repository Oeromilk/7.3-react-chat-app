var React = require('react');
var Backbone = require('backbone');
require('backbone-react-component');

var ChatCollection = require('../models/messages.js').MessageCollection;
var LayoutComponent = require('./app.jsx').LayoutComponent;

var ChatForm = React.createClass({

  getInitialState: function(){
    return {
      content: ''
    };
  },
  handleMessage: function(e){
    var message = e.target.value;
    this.setState({content: message});
  },
  handleSubmit: function(e){

    e.preventDeafult();
    this.collection.create({content: this.state.content});
    this.setState({content: ''});
  },
  render: function(){

    return (
      <div id="fixed-bottom" classNam="row">
        <form onSubmit={this.handleSubmit} className="form-inline well col-md-12">
          <div className="form-group col-md-offset-4">
            <label htmlFor="message">Message</label>
            <input onChange={this.handleMessage} name="message" value={this.state.content} type="text" className="form-control" id="message" placeholder="Your message here ..." />
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
    );
  }
});

var ChatListing = React.createClass({

  getInitialState: function(){

    return {
      collection: this.state.collection
    };
  },
  render: function(){

    var collection = this.state.collection;
    var messagesList = collection.map(function(content){
      return <li key={content.get('_id') || content.cid}>{content.get('content')}</li>;
    });
    return (
      <ul>
        {messagesList}
      </ul>
    );
  }
});

var ChatComponent = React.createClass({
  getInitialState: function(){
    var collection = new ChatCollection();

    return {
      collection: collection
    };
  },
  componentWillMount: function(){
    console.log(this.state.collection);
    var self = this;
    var collection = this.state.collection;

    collection.fetch().then(function(){
      self.setState({collection: collection});

      collection.each(function(model){
        model.on('change', function(){self.update()});
      });
    });

    collection.on('add', function(){self.update()});
  },
  update: function(){
    this.forceUpdate();
  },
  render: function(){

    return (
      <LayoutComponent>
        <ChatListing />
        <ChatForm />
      </LayoutComponent>
    )
  }
})

module.exports = {
  ChatComponent: ChatComponent
};
