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
    console.log(this);
    e.preventDefault();
    this.props.collection.create({content: this.state.content, username: this.props.username, time: new Date().getTime()});
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
  render: function(){

    var collection = this.props.collection;
    var messagesList = collection.map(function(content){
      return (
        <div className="well" key={content.get('_id') || content.cid}>
          <h4 className="card-title">{content.get('username')}</h4>
          <p className="card-text">{content.get('content')}</p>
          <p className="card-text">sent at: {content.get('time')}</p>
        </div>
      );
    });
    return (
      <div className="card card-block">
        {messagesList}
      </div>
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
    var self = this;
    var collection = this.state.collection;

    setInterval(function(){
      collection.fetch().then(function(){
        self.setState({collection: collection});
    });
    collection.each(function(model){
        model.on('change', function(){self.update()});
      });

    collection.on('add', function(){self.update()});

    }, 2000);


  },
  update: function(){
    this.forceUpdate();
  },
  componentWillunmount: function(){
    clearInterval();
  },
  render: function(){

    return (
      <LayoutComponent>
        <ChatListing collection={this.state.collection} username={this.props.username}/>
        <ChatForm collection={this.state.collection} username={this.props.username}/>
      </LayoutComponent>
    )
  }
})

module.exports = {
  ChatComponent: ChatComponent
};
