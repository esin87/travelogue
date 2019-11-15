import React, { Component } from 'react';
// import entries from './entries.json';
import Entry from './Entry';
import { Link } from 'react-router-dom';

import './UserHome.css';

class UserHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			entries: this.props.entries
		};
	}
	render() {
		let filteredEntries = this.props.entries.filter(
			entry => entry.owner === this.props.username
		);

		let listOfEntries = filteredEntries.map(entry => {
			return (
				<div className="entry" key={entry.title}>
					<Entry
						title={entry.title}
						photo={entry.photo_url}
						place={entry.place_name}
						notes={entry.notes}
						author={entry.owner}
					/>
				</div>
			);
		});
		return (
			<div>
				<h1>Hello, {this.props.username}</h1>
				<Link to={`${this.props.username}/create`}>
					<p>Create a new entry</p>
				</Link>
				{listOfEntries}
			</div>
		);
	}
}

export default UserHome;
