import React from 'react';
import { render } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import UserHome from './UserHome';
import Entry from '../Entry/Entry';

describe('User home component', () => {
	let component;

	let propsEntries = [
		{
			title: 'The Heart and Seoul',
			photo:
				'https://cdn.pixabay.com/photo/2017/03/21/17/10/nightlife-2162772_960_720.jpg',
			place: 'Seoul, South Korea',
			notes:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			id: 1,
			date: '01-01-2020',
			username: 'Jimmy'
		}
	];
	beforeEach(() => {
		component = render(
			<Router>
				<UserHome entries={propsEntries} username={'Jimmy'} />
			</Router>
		);
	});

	it('should have a header that says "My Entries"', () => {
		expect(component.find('h1').text()).toBe('My Entries');
	});
});
