import React, { Component } from 'react';
import Axios from 'axios';
import './EntryDetail.css';
import { Link } from 'react-router-dom';

class EntryDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			entryId: this.props.match.params.entryid,
			entry: ''
		};
	}

	componentDidMount() {
		Axios.get(`http://localhost:8000/api/entries/${this.state.entryId}`)
			.then(response => {
				this.setState({ entry: response.data });
			})
			.catch(err => console.error(err));
	}

	delete = () => {
		const url = `http://localhost:8000/api/entries/${this.props.match.params.entryid}`;
		let entry = this.state.entry;
		fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `JWT ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(entry)
		})
			.then(res => {
				console.log(res);
				setTimeout(() => {
					this.props.history.push({
						pathname: `/${this.props.username}`
					});
				}, 2000);
			})
			.catch(err => {
				console.error(err);
			});
	};
	render() {
		return (
			<article className="entry-details">
				<div className="image-and-caption">
					<img
						className="detail-image"
						src={this.state.entry.photo_url}
						alt={this.state.entry.place}
					/>
					<p className="place-name">{this.state.entry.place_name}</p>
				</div>
				<div className="other-text">
					<h2 className="entry-heading">
						{this.state.entry.title}
						<Link to={`/edit/${this.state.entry.id}`}> (edit)</Link>
					</h2>
					<p className="byline">By: {this.state.entry.owner}</p>
					<p className="notes">{this.state.entry.notes}</p>
					<p>Posted on: {this.state.entry.date}</p>
					<p onClick={this.delete} className="delete-link">
						DELETE
					</p>
				</div>
			</article>
		);
	}
}

export default EntryDetail;