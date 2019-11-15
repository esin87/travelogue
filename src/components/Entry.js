import React, { Component } from 'react';
import './Entry.css';

class Entry extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<h1>{this.props.title}</h1>
				<p>by: {this.props.author}</p>
				<img src={this.props.photo} alt={this.props.place} />
				<p>{this.props.notes}</p>
			</div>
		);
	}
}

export default Entry;
