import React, { Component } from 'react';
// App components
import Nav from './components/Nav';
import About from './components/About.js';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import UserHome from './components/UserHome';
import Create from './components/Create';
// Styling
import './App.css';
// Dependencies
import { Route, Switch, Redirect } from 'react-router-dom';
import Axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayed_form: '',
			logged_in: localStorage.getItem('token') ? true : false,
			username: '',
			entries: []
		};
	}

	componentDidMount() {
		if (this.state.logged_in) {
			fetch('http://localhost:8000/core/current_user/', {
				headers: {
					Authorization: `JWT ${localStorage.getItem('token')}`
				}
			})
				.then(res => res.json())
				.then(json => {
					this.setState({ username: json.username });
				});

			Axios.get('http://localhost:8000/api/entries')
				.then(response => {
					this.setState({ entries: response.data });
				})
				.catch(err => console.error(err));
		}
	}

	handle_login = (e, data) => {
		e.preventDefault();

		fetch('http://localhost:8000/token-auth/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(json => {
				localStorage.setItem('token', json.token);
				this.setState({
					logged_in: true,
					displayed_form: '',
					username: json.user.username
				});
			})
			.catch(err => {
				console.error(err);
			});
	};

	handle_signup = (e, data) => {
		e.preventDefault();
		fetch('http://localhost:8000/core/users/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(json => {
				localStorage.setItem('token', json.token);
				this.setState({
					logged_in: true,
					displayed_form: '',
					username: json.username
				});
			});
	};

	handle_logout = () => {
		localStorage.removeItem('token');
		this.setState({ logged_in: false, username: '' });
	};
	display_form = form => {
		this.setState({
			displayed_form: form
		});
	};

	render() {
		let form;
		switch (this.state.displayed_form) {
			case 'login':
				form = <LoginForm handle_login={this.handle_login} />;
				break;
			case 'signup':
				form = <SignupForm handle_signup={this.handle_signup} />;
				break;
			default:
				form = null;
		}

		return (
			<div className="App">
				<div className="logged-in-nav" style={{ display: 'none' }}>
					Secret div
				</div>
				<Switch>
					<Route exact={true} path="/about" component={About} />
					<Route
						exact={true}
						path="/:username"
						render={routerProps => (
							<UserHome
								{...routerProps}
								username={this.state.username}
								entries={this.state.entries}
							/>
						)}
					/>
					<Route
						exact={true}
						path="/:username/create"
						component={Create}
					/>
					<Redirect to="/" />
				</Switch>

				<Nav
					logged_in={this.state.logged_in}
					display_form={this.display_form}
					handle_logout={this.handle_logout}
				/>
				{form}

				<h3>
					{this.state.logged_in && (
						<Redirect to={`/${this.state.username}`} />
					)}
					{!this.state.logged_in && <Redirect to="/" />}
				</h3>
			</div>
		);
	}
}

export default App;
