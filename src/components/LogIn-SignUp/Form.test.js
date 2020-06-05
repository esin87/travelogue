import React from 'react';
import { shallow } from 'enzyme';

import Form from './Form';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

describe('Form component', () => {
	let component;

	//wrote a dummy function to pass in as a prop to Form so that the signup click can be simulated
	const resetErrors = function() {
		return;
	};

	//render a Form component before each test
	beforeEach(() => {
		component = shallow(<Form resetErrors={resetErrors} />);
	});

	//each Form component should have h1 with app name
	it('should have a header that says TRAVELOGUE', () => {
		expect(component.contains(<h1>TRAVELOGUE</h1>)).toBe(true);
	});

	it('should have a login link that changes the displayed_form in state to "login" then renders the LoginForm component', () => {
		component.find('#login').simulate('click');
		expect(component.state('displayed_form')).toEqual('login');
		expect(component.find(LoginForm).length).toBe(1);
	});

	it('should have a signup link that changes the displayed_form in state to "signup" then renders the SignupForm component', () => {
		component.find('#signup').simulate('click');
		expect(component.state('displayed_form')).toEqual('signup');
		expect(component.find(SignupForm).length).toBe(1);
	});
});
