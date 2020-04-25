import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Entry from '../Entry/Entry';
import './UserHome.css';

class UserHome extends Component {
	componentDidMount() {
		this.props.refreshEntries();
	}

	render() {
		let filteredEntries = this.props.entries.filter(
			(entry) => entry.owner === this.props.username
		);

		let listOfEntries = filteredEntries.map((entry) => {
			return (
				<div className='entry' key={entry.title}>
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
			<div className='user-home-container'>
				<h1 className='dashboard'>My Entries</h1>
				{listOfEntries.length > 0 && (
					<>
						<p>Click on an entry to view, edit or delete.</p>
						<div className='entries-container'>{listOfEntries}</div>
					</>
				)}
				{listOfEntries.length === 0 && (
					<p>
						You haven't created any entries yet. <br />
						Click{' '}
						<Link to={`/create`}>
							<span className='here'>here</span>
						</Link>{' '}
						to get started!
					</p>
				)}
			</div>
		);
	}
}

export default UserHome;
