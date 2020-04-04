import React, { Component } from 'react';
import Axios from 'axios';
import './EntryDetail.css';
import { Link, Redirect } from 'react-router-dom';
import GoogleMap from '../Map';

class EntryDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			entryId: this.props.match.params.entryid,
			entry: '',
			redirect: false,
		};
	}

	componentDidMount() {
		Axios.get(`https://esin-travelogue-api.herokuapp.com/${this.state.entryId}`)
			.then((response) => {
				this.setState({ entry: response.data });
			})
			.catch((err) => console.error(err));
	}

	setRedirect = () => {
		this.setState({ redirect: true });
	};

	renderRedirect = () => {
		if (this.state.redirect) {
			return <Redirect to='/home' />;
		}
	};

	delete = () => {
		const url = `https://esin-travelogue-api.herokuapp.com/${this.props.match.params.entryid}`;
		fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `JWT ${localStorage.getItem('token')}`,
			},
		})
			.then((res) => {
				this.props.refreshEntries();
			})
			.then((res) => {
				this.setRedirect();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	render() {
		console.log(this.state.entry.place_name);
		return (
			<article className='entry-details'>
				{this.renderRedirect()}
				<div className='image-and-caption'>
					<p className='map-caption'>{this.state.entry.place_name}</p>
					<img
						className='detail-image'
						src={this.state.entry.photo_url}
						alt={this.state.entry.place_name}
					/>
					{this.state.entry.place_name && (
						<GoogleMap placeName={this.state.entry.place_name} />
					)}
				</div>
				<div className='other-text'>
					<h2 className='entry-heading'>
						{this.state.entry.title}
						<Link to={`/edit/${this.state.entry.id}`}> (edit)</Link>
					</h2>
					<p className='byline'>By: {this.state.entry.owner}</p>
					<p className='notes'>{this.state.entry.notes}</p>
					<p>Posted on: {this.state.entry.date}</p>
					<p
						className='delete-link'
						onClick={() => {
							if (window.confirm('Are you sure you wish to delete this entry?'))
								this.delete();
						}}>
						DELETE
					</p>
				</div>
			</article>
		);
	}
}

export default EntryDetail;
