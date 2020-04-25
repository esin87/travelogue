import React, { Component } from 'react';
// App components
import About from './components/About/About.js';
import Form from './components/LogIn-SignUp/Form.js';
import UserHome from './components/UserHome/UserHome';
import Create from './components/Create/Create';
import Edit from './components/Edit/Edit';
import EntryDetail from './components/EntryDetail/EntryDetail';
// Styling
import './App.css';
// Dependencies
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import Axios from 'axios';

//Background image
import CinqueTerre from './assets/images/cinque-terre-828614_1920.jpg';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			logInErrorMessage: null,
			redirect: false,
			logged_in: localStorage.getItem('token') ? true : false,
			username: '',
			entries: [],
		};
	}

	setRedirect = () => {
		if (this.state.logged_in) {
			this.setState({ redirect: true });
		}
	};

	renderRedirect = () => {
		if (this.state.redirect) {
			return <Redirect to='/home' />;
		}
	};

	componentDidMount() {
		if (this.state.logged_in) {
			fetch('https://esin-travelogue-api.herokuapp.com/core/current_user/', {
				headers: {
					Authorization: `JWT ${localStorage.getItem('token')}`,
				},
			})
				.then((res) => res.json())
				.then((json) => {
					this.setState({ username: json.username });
				})
				.then((res) => this.refreshEntries())
				.catch((err) => {
					this.setState({ error: true });
					this.handleError();
				});
		}
	}

	refreshEntries = () => {
		Axios.get(`https://esin-travelogue-api.herokuapp.com`)
			.then((res) => {
				this.setState({ entries: res.data });
			})
			.then((res) => {
				this.setRedirect();
			})
			.catch((err) => {
				this.setState({ error: true });
				this.handleError();
			});
	};

	handleLogin = (e, data) => {
		e.preventDefault();

		fetch('https://esin-travelogue-api.herokuapp.com/token-auth/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((json) => {
				localStorage.setItem('token', json.token);
				this.setState({
					logged_in: true,
					username: json.user.username,
					error: false,
				});
			})
			.then((res) => {
				this.refreshEntries();
			})
			.catch((err) => {
				this.setState({ error: true });
				this.handleError();
			});
	};

	handleSignup = (e, data) => {
		e.preventDefault();
		fetch('https://esin-travelogue-api.herokuapp.com/core/users/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((json) => {
				localStorage.setItem('token', json.token);
				this.setState({
					logged_in: true,
					username: json.username,
				});
			})
			.catch((err) => {
				this.setState({ error: true });
				this.handleError();
			});
	};

	//Log out handler
	handleLogout = () => {
		localStorage.removeItem('token');
		this.setState({
			logged_in: false,
			error: false,
			logInErrorMessage: null,
			username: '',
			redirect: false,
		});
		return <Redirect to='/' />;
	};

	//Login/signup error handler
	handleError = () => {
		if (this.state.error) {
			this.setState({
				logInErrorMessage:
					'That username and password combination does not exist.\nPlease try again or sign up.',
			});
		}
	};

	resetErrors = () => {
		this.setState({ error: false, logInErrorMessage: null });
	};

	render() {
		return (
			<div
				className='App'
				style={{
					backgroundImage: this.state.logged_in
						? 'none'
						: `url(${CinqueTerre})`,
				}}>
				<div
					className='logged-in-nav-container'
					style={{
						display: this.state.logged_in ? 'block' : 'none',
					}}>
					<div className='logged-in-nav'>
						<div className='logo'>
							<Link to={`/about`}>
								<h4>TRAVELOGUE</h4>
							</Link>
						</div>
						<div className='other-links'>
							<Link to={`/home`}>
								<p className='greeting'>Hello, {this.state.username}!</p>
							</Link>
							<Link to={`/create`}>
								<p>New Entry</p>
							</Link>
							<p onClick={this.handleLogout} className='log-out'>
								Log Out
							</p>
						</div>
					</div>
				</div>
				<Switch>
					<Route
						exact={true}
						path='/'
						render={(props) => (
							<Form
								{...props}
								handle_login={this.handleLogin}
								handleSignup={this.handleSignup}
								logged_in={this.state.logged_in}
								error={this.state.error}
								logInErrorMessage={this.state.logInErrorMessage}
								resetErrors={this.resetErrors}
							/>
						)}
					/>
					<Route exact={true} path='/about' component={About} />
					<Route
						exact={true}
						path='/home'
						render={(routerProps) => (
							<UserHome
								{...routerProps}
								username={this.state.username}
								entries={this.state.entries}
								refreshEntries={this.refreshEntries}
							/>
						)}
					/>
					<Route
						exact={true}
						path='/create'
						username={this.state.username}
						refreshEntries={this.refreshEntries}
						component={Create}
					/>
					<Route
						exact={true}
						path='/entries/:entryid'
						render={(routerProps) => (
							<EntryDetail
								{...routerProps}
								refreshEntries={this.refreshEntries}
							/>
						)}
					/>
					<Route
						exact={true}
						path='/edit/:entryid'
						render={(routerProps) => (
							<Edit
								{...routerProps}
								username={this.state.username}
								refreshEntries={this.refreshEntries}
							/>
						)}
					/>
				</Switch>

				{this.state.logged_in && <Redirect to='/home' />}
				{!this.state.logged_in && <Redirect to='/' />}
			</div>
		);
	}
}

export default App;
