import React, { Component } from 'react';

class UserHome extends Component {
	render() {
		return (
			<div>
				<h1>Hello, {this.props.username}</h1>
				<p>This is the user home component</p>
			</div>
		);
	}
}

export default UserHome;
