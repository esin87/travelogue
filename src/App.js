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
import { Route, Switch, Redirect, NavLink, Link } from 'react-router-dom';
import Axios from 'axios';

//Background image
import CinqueTerre from './assets/images/cinque-terre-828614_1920.jpg';
import Neuschwannstein from './assets/images/architecture-3095716_1920.jpg';
import BritishColumbia from './assets/images/british-columbia-3787200_1920.jpg';
import BoraBora from './assets/images/bora-bora-685303_1920.jpg';
import Hamburg from './assets/images/hamburg-3846525_1920.jpg';

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
				<div
					className="logged-in-nav-container"
					style={{ display: isShown ? 'block' : 'none' }}>
					<div className="logged-in-nav">
						<Link to={`/${this.state.username}`}>
							<h4>TRAVELOGUE</h4>
						</Link>
						<NavLink to={`${this.state.username}/create`} strict>
							<p>New Entry</p>
						</NavLink>
						<p onClick={this.handle_logout}>Log Out</p>
					</div>
				</div>
				{/* <Fade></Fade> */}
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
						username={this.state.username}
						component={Create}
					/>
					<Route
						exact={true}
						path="/:username/entries/:entryid"
						render={routerProps => <EntryDetail {...routerProps} />}
					/>
					<Route
						exact={true}
						path="/edit/:entryid"
						render={routerProps => (
							<Edit
								{...routerProps}
								username={this.state.username}
							/>
						)}
					/>
					{/* <Redirect to="/" /> */}
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
				{/* </div> */}
			</div>
		);
	}
}

export default App;
