import React, { Component } from 'react';
// import entries from './entries.json';
import Entry from '../Entry/Entry';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './UserHome.css';

class UserHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			entries: 'this.props.entries'
		};
	}

	componentDidMount() {
		Axios.get('http://localhost:8000/api/entries')
			.then(response => {
				this.setState({ entries: response.data });
			})
			.catch(err => console.error(err));
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
						owner={entry.owner}
						id={entry.id}
						date={entry.date}
					/>
				</div>
			);
		});
		return (
			<div className="user-home-container">
				<div className="entries-container">{listOfEntries}</div>
			</div>
		);
	}
}

export default UserHome;
