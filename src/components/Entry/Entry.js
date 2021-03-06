import React, { Component } from 'react';
import './Entry.css';
import { Link } from 'react-router-dom';

class Entry extends Component {
	render() {
		return (
			<div className='entry-card'>
				<Link to={`/entries/${this.props.id}`}>
					<h3>{this.props.title}</h3>
					<img src={this.props.photo} alt={this.props.place} />
					<p>Posted: {this.props.date}</p>
				</Link>
			</div>
		);
	}
}

export default Entry;
