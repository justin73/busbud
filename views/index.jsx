var React = require('react');
var DefaultLayout = require('./layouts/default');


class HelloMessage extends React.Component {
  handleOptionsButtonClick(e) {
  	fetch('https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-07-03/poll?adult=1&child=0&senior=0&lang=en&currency=CAD').then((response) => {
          return response.json();
      }).catch((err) => {
          throw new Error(err);
      });
  }
  render() {
    return (
      <DefaultLayout>
        <div className="banner_background">
			<img src="/logo.png"></img>
		</div>
		<div>
			<form>
				<div>
					<input className="depature" value="NEW YORK" readOnly></input>
					<input className="destination" value="MONTREAL" readOnly></input>
				</div>
				<div>
					<label>
						<input type="radio" name="age" value="adult" checked>

						</input>

						Adult
					</label>
					<label>
						<input type="radio" name="age" value="senior">

						</input>

						Senior
					</label>
					<label>
						<input type="radio" name="age" value="child">

						</input>

						Child
					</label>
				</div>
				<button className="search"  onClick={this.props.handleOptionsButtonClick}> Search</button>
			</form>
		</div>
      </DefaultLayout>
    );
  }
}

module.exports = HelloMessage;