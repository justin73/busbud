var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
        <title>Osheaga festival</title>
    		<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" />
    		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    		<script type="text/javascript" src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    		<link rel="stylesheet" type="text/css" href="/stylesheets/style.css" />
        <script type="javascript" href="/js/test.js" /></head>
        <body>{this.props.children}</body>
      </html>
    );
  }
}

module.exports = DefaultLayout;