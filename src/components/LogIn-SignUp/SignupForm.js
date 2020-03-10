import React from 'react';
import './Forms.css';

class SignupForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			touched: {
				username: false,
				password: false,
			},
		};
	}

	handle_change = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState((prevState) => {
			const newState = { ...prevState };
			newState[name] = value;
			return newState;
		});
	};

	handleBlur = (field) => (evt) => {
		this.setState({
			touched: { ...this.state.touched, [field]: true },
		});
	};

	validatePassword = (password) => {
		const errors = [];
		if (password.length === 0) {
			errors.push('Must provide a password.');
		} else if (password.length < 8) {
			errors.push('Password should be at least 8 characters long ');
		}
		return errors;
	};

	validateUserName = (username) => {
		const errors = [];
		if (username.length === 0) {
			errors.push('Must provide a username.');
		}
		if (username.length < 4) {
			errors.push('Username must be at least 4 characters long.');
		}
		return errors;
	};

	render() {
		const userNameErrors = this.validateUserName(this.state.username);
		const passwordErrors = this.validatePassword(this.state.password);

		const shouldMarkUserNameError = () => {
			const hasError = userNameErrors;
			const shouldShow = this.state.touched.username;
			return hasError.length > 0 ? shouldShow : false;
		};
		const shouldMarkPasswordError = () => {
			const hasError = passwordErrors;
			const shouldShow = this.state.touched.password;
			return hasError.length > 0 ? shouldShow : false;
		};

		const isEnabled = () => {
			if (userNameErrors.length === 0 && passwordErrors.length === 0) {
				return true;
			} else {
				return false;
			}
		};

		return (
			<div>
				<div className='auth-forms'>
					<form onSubmit={(e) => this.props.handle_signup(e, this.state)}>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							name='username'
							value={this.state.username}
							onChange={this.handle_change}
							onBlur={this.handleBlur('username')}
							className={shouldMarkUserNameError() ? 'signupErrorBorder' : ''}
						/>

						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							value={this.state.password}
							onChange={this.handle_change}
							onBlur={this.handleBlur('password')}
							className={shouldMarkPasswordError() ? 'signupErrorBorder' : ''}
						/>

						<input
							className='submit-button'
							type='submit'
							value='SIGN UP'
							disabled={!isEnabled()}
						/>
					</form>
				</div>

				<div
					className='signupErrors'
					style={{
						display: shouldMarkUserNameError() ? 'block' : 'none',
					}}>
					{this.state.touched.username &&
						userNameErrors.map((error) => <p key={error}>{error}</p>)}
				</div>
				<div
					className='signupErrors'
					style={{
						display: shouldMarkPasswordError() ? 'block' : 'none',
					}}>
					{this.state.touched.password &&
						passwordErrors.map((error) => <p key={error}>{error}</p>)}
				</div>
			</div>
		);
	}
}

export default SignupForm;

SignupForm.propTypes = {
	handle_signup: PropTypes.func.isRequired,
};
