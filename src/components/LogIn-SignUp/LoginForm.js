import React from 'react';
import './Forms.css';

class LoginForm extends React.Component {
	state = {
		username: '',
		password: ''
	};

	handle_change = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState(prevstate => {
			const newState = { ...prevstate };
			newState[name] = value;
			return newState;
		});
	};

	render() {
		return (
			<div className='auth-forms'>
				<form onSubmit={e => this.props.handle_login(e, this.state)}>
					<label htmlFor='username'>Username</label>
					<input
						type='text'
						name='username'
						value={this.state.username}
						onChange={this.handle_change}
					/>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						value={this.state.password}
						onChange={this.handle_change}
					/>
					<input
						className='submit-button'
						type='submit'
						value='LOG IN'
					/>
				</form>
			</div>
		);
	}
}

export default LoginForm;
