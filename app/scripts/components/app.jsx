var React = require('react');

var ChatBubbleComponent = require('./chat_bubble.jsx').ChatBubble;
var LoginComponent = require('./login.jsx').Login;

var LayoutComponent = React.createClass({
  render: function(){
    return (
      <div>
        <nav id="fixed-top" className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <div className="row">
                <h1>The Iron Yard Chat App</h1>
              </div>
            </div>
          </div>
        </nav>
          <ChatBubbleComponent />
          <LoginComponent />
        <div id="fixed-bottom" classNam="row">
          <form className="form-inline well col-md-12">
            <div className="form-group col-md-offset-4">
              <label htmlFor="message">Message</label>
              <input type="email" className="form-control" id="message" placeholder="Your message here ..." />
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    )
  }
});

module.exports = {
  LayoutComponent: LayoutComponent
};
