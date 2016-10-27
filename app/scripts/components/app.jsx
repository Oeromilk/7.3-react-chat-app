var React = require('react');

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

          {this.props.children}

      </div>
    );
  }
});

module.exports = {
  LayoutComponent: LayoutComponent
};
