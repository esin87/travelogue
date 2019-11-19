import React, { Component } from 'react';
import Entry from '../Entry/Entry';
import './UserHome.css';

class UserHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			entries: this.props.entries
		};
	}

	componentDidMount() {
		this.props.refreshEntries();
	}

	render() {
		let filteredEntries = this.state.entries.filter(
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
						owner={entry.owner}
						id={entry.id}
						date={entry.date}
					/>
				</div>
			);
		});
		return (
			<div className="user-home-container">
				<h1 className="dashboard">My Entries</h1>
				<p>Click on an entry to view, edit or delete.</p>
				<div className="entries-container">{listOfEntries}</div>
			</div>
		);
	}
}

export default UserHome;
