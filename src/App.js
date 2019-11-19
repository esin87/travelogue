import React, { Component } from 'react';
// App components
import Nav from './components/Nav/Nav';
import About from './components/About/About.js';
import LoginForm from './components/LogIn-SignUp/LoginForm';
import SignupForm from './components/LogIn-SignUp/SignupForm';
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
// Other background image options
// import Neuschwannstein from './assets/images/architecture-3095716_1920.jpg';
// import BritishColumbia from './assets/images/british-columbia-3787200_1920.jpg';
// import BoraBora from './assets/images/bora-bora-685303_1920.jpg';
// import Hamburg from './assets/images/hamburg-3846525_1920.jpg';

//API url
// const API_URL = process.env.REACT_APP_API_URL;
require('dotenv').config();

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shouldRefresh: false,
			redirect: false,
			displayed_form: '',
			logged_in: localStorage.getItem('token') ? true : false,
			username: '',
			entries: []
		};
	}

	setRedirect = () => {
		this.setState({ redirect: true });
	};

	renderRedirect = () => {
		if (this.state.redirect) {
			return <Redirect to="/home" />;
		}
	};

	componentDidMount() {
		if (this.state.logged_in) {
			fetch(
				'https://esin-travelogue-api.herokuapp.com/core/current_user/',
				{
					headers: {
						Authorization: `JWT ${localStorage.getItem('token')}`
					}
				}
			)
				.then(res => res.json())
				.then(json => {
					this.setState({ username: json.username });
				})
				.then(res => this.refreshEntries());
		}
	}

	refreshEntries = () => {
		Axios.get(`https://esin-travelogue-api.herokuapp.com`)
			.then(res => {
				this.setState({ entries: res.data });
			})
			.then(res => {
				this.setRedirect();
			})
			.catch(err => console.error(err));
	};

	handle_login = (e, data) => {
		e.preventDefault();

		fetch('https://esin-travelogue-api.herokuapp.com/token-auth/', {
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
			.then(res => {
				this.refreshEntries();
			})
			.catch(err => {
				console.error(err);
			});
	};

	handle_signup = (e, data) => {
		e.preventDefault();
		fetch('https://esin-travelogue-api.herokuapp.com/core/users/', {
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
		return <Redirect to="/" />;
	};

	display_form = form => {
		this.setState({
			displayed_form: form
		});
	};

	render() {
		//decide what form to render whether log in or sign up is clicked on
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
		//use this state to determine what divs to show (mostly for logged in nav bar display)
		const isShown = this.state.logged_in;

		return (
			<div
				className="App"
				style={{
					backgroundImage: isShown ? 'none' : `url(${CinqueTerre})`
				}}>
				{this.renderRedirect()}

				<div
					className="logged-in-nav-container"
					style={{ display: isShown ? 'block' : 'none' }}>
					<div className="logged-in-nav">
						<div className="logo">
							<Link to={`/about`}>
								<h4>TRAVELOGUE</h4>
							</Link>
						</div>
						<div className="other-links">
							<Link to={`/home`}>
								<p className="greeting">
									Hello, {this.state.username}!
								</p>
							</Link>
							<Link to={`/create`}>
								<p>New Entry</p>
							</Link>
							<p onClick={this.handle_logout} className="log-out">
								Log Out
							</p>
						</div>
					</div>
				</div>
				<Switch>
					<Route exact={true} path="/about" component={About} />
					<Route
						exact={true}
						path="/home"
						render={routerProps => (
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
						path="/create"
						username={this.state.username}
						refreshEntries={this.refreshEntries}
						component={Create}
					/>
					<Route
						exact={true}
						path="/entries/:entryid"
						render={routerProps => (
							<EntryDetail
								{...routerProps}
								refreshEntries={this.refreshEntries}
							/>
						)}
					/>
					<Route
						exact={true}
						path="/edit/:entryid"
						render={routerProps => (
							<Edit
								{...routerProps}
								username={this.state.username}
								refreshEntries={this.refreshEntries}
							/>
						)}
					/>
				</Switch>
				<Nav
					logged_in={this.state.logged_in}
					display_form={this.display_form}
					handle_logout={this.handle_logout}
				/>
				{form}

				{this.state.logged_in && <Redirect to={`/home`} />}
				{!this.state.logged_in && <Redirect to="/" />}
			</div>
		);
	}
}

export default App;
