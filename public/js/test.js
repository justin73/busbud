/**
 * @jsx React.DOM
 */
// var React = require('react');
// var ReactDOM = require('react-dom');

var App = React.createClass({

  render: function () {
    return(
        <section>
            <div className="banner_background">
                <img src="/logo.png"></img>
            </div>
            <div>
                <div>
                    <input className="depature" value="NEW YORK" readOnly></input>
                    <input className="destination" value="MONTREAL" readOnly></input>
                </div>
                <button className="search"> Search</button>
            </div>
        </section>
    )
  }
});
React.render(
    <App />,
    document.getElementById('index')
);