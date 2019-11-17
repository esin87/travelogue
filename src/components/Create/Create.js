import React, { Component } from 'react';
import './Create.css';

function validate(title, place_name, photo_url, notes) {
	return {
		title: title.length === 0,
		place_name: place_name.length === 0,
		photo_url: photo_url.length === 0,
		notes: notes.length === 0
	};
}

class Create extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: this.props.match.params.username,
			title: '',
			place_name: '',
			photo_url: '',
			notes: '',
			touched: {
				title: false,
				place_name: false,
				photo_url: false,
				notes: false
			}
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}

	handleBlur = field => evt => {
		this.setState({
			touched: { ...this.state.touched, [field]: true }
		});
	};

	handleSubmit(evt) {
		evt.preventDefault();

		const entry = {
			title: this.state.title,
			place_name: this.state.place_name,
			photo_url: this.state.photo_url,
			notes: this.state.notes
		};

		fetch('http://localhost:8000/api/entries', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `JWT ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(entry)
		})
			.then(res => {
				setTimeout(() => {
					this.props.history.push({
						pathname: `/${this.state.username}`
					});
				}, 2000);
			})
			.catch(err => {
				console.error(err);
			});
	}

	render() {
		const shouldMarkError = field => {
			const hasError = errors[field];
			const shouldShow = this.state.touched[field];

			return hasError ? shouldShow : false;
		};

		const errors = validate(
			this.state.title,
			this.state.place_name,
			this.state.photo_url,
			this.state.notes
		);

		const isEnabled = !Object.keys(errors).some(x => errors[x]);
		return (
			<div className="new-form-container">
				<h2>Create New Entry</h2>
				<form onSubmit={this.handleSubmit} className="new-form">
					{/* form input for title */}
					<label>Title</label>
					<input
						className={shouldMarkError('title') ? 'error' : ''}
						onBlur={this.handleBlur('title')}
						name="title"
						type="text"
						value={this.state.title}
						onChange={this.handleChange}
						placeholder="Enter Title"
					/>
					{/* form input for place name */}
					<label>Place Name</label>
					<input
						className={shouldMarkError('place_name') ? 'error' : ''}
						onBlur={this.handleBlur('place_name')}
						name="place_name"
						type="text"
						value={this.state.place_name}
						onChange={this.handleChange}
						placeholder="Enter Place Name"
					/>
					{/* form input for photo url */}
					<label>Photo URL</label>
					<input
						className={shouldMarkError('photo_url') ? 'error' : ''}
						onBlur={this.handleBlur('photo_url')}
						name="photo_url"
						type="text"
						value={this.state.photo_url}
						onChange={this.handleChange}
						placeholder="Enter Photo URL"
					/>
					{/* form input for diary entry */}
					<label>Travelogue Entry</label>
					<textarea
						rows="14"
						className={shouldMarkError('notes') ? 'error' : ''}
						onBlur={this.handleBlur('notes')}
						name="notes"
						type="text"
						value={this.state.notes}
						onChange={this.handleChange}
						placeholder="It was a dark and stormy night in Budapest ... "
					/>
					*All fields required.
					<br />
					<div className="submit-button-container">
						<input
							className="submit-button"
							type="submit"
							value="Submit"
							disabled={!isEnabled}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default Create;
