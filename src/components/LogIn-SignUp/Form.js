import React from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './Form.css';
import PropTypes from 'prop-types';

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayed_form: ''
		};
	}

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
				form = <LoginForm handle_login={this.props.handle_login} />;
				break;
			case 'signup':
				form = <SignupForm handle_signup={this.props.handleSignup} />;
				break;
			default:
				form = null;
		}
		const logged_out_nav = (
			<>
				<h1>TRAVELOGUE</h1>
				<div id='registration-options'>
					<p
						className='log-in-buttons'
						onClick={() => this.display_form('login')}>
						LOGIN
					</p>
					<p
						className='log-in-buttons'
						onClick={() => {
							this.props.resetErrors();
							this.display_form('signup');
						}}>
						SIGNUP
					</p>
				</div>
			</>
		);
		return (
			<>
				{this.props.logged_in ? null : logged_out_nav}
				{form}
				<div
					className='errorMessage'
					style={{
						display: this.props.logInErrorMessage ? 'block' : 'none'
					}}>
					{this.props.logInErrorMessage}
				</div>
			</>
		);
	}
}

export default Form;
