import React, { Component } from 'react';
import './Entry.css';
import { Link } from 'react-router-dom';

class Entry extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<Link to={`${this.props.owner}/entries/${this.props.id}`}>
					<h2>{this.props.title}</h2>
					<img src={this.props.photo} alt={this.props.place} />
					<p>Posted: {this.props.date}</p>
				</Link>
			</div>
		);
	}
}

export default Entry;
