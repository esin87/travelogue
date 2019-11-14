import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import './LandingPage.css';
import About from './About.js';
import Nav from './Nav.js';

class LandingPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<Link to="/about">
					<h1>TRAVELOGUE</h1>
				</Link>
			</div>
		);
	}
}

export default LandingPage;
