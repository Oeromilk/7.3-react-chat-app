var React = require('react');
var Backbone = require('backbone');


var LayoutComponent = require('./app.jsx').LayoutComponent;

var LoginForm = React.createClass({
  getInitialState: function(){
    return {
      username: ''
    };
  },
  handleUsername: function(e){
    var username = e.target.value;
    this.setState({username: username});
  },
  handleSubmit: function(e){
    e.preventDeafult();
    var router = this.props.router;

    router.username = this.state.username;
    router.navigate('chat/', {trigger: true});
    this.setState({username: ''});
  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit} className="col-md-6 col-md-offset-3">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input onChange={this.handleUsername} value={this.state.username} name={this.props} className="form-control" id="username" placeholder="Username" />
        </div>
        <button type="submit" className="btn btn-success">Login</button>
      </form>
    )
  }
});

var Login = React.createClass({
  render: function(){
    return (
      <LayoutComponent>
        <LoginForm router={this.props.router}/>
      </LayoutComponent>
    );
  }
});

module.exports = {
  Login: Login
};
