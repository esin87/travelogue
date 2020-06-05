import React from 'react';
import { shallow } from 'enzyme';

import EntryDetail from './EntryDetail';

describe('Entry Detail component', () => {
	let component;
	let entryProp = [
		{
			title: 'The Heart and Seoul',
			photo:
				'https://cdn.pixabay.com/photo/2017/03/21/17/10/nightlife-2162772_960_720.jpg',
			place: 'Seoul, South Korea',
			notes:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			id: 1,
			date: '01-01-2020',
			owner: 'Jimmy',
		},
	];
	let match = { params: { entryid: 1 } };
	beforeEach(() => {
		component = shallow(<EntryDetail match={match} />);
	});

	it('should initialize with state entry variable empty', () => {
		expect(component.state('entry')).toBe('');
	});

	it('should initialize with state entryId equivalent to entryid passed as prop', () => {
		expect(component.state('entryId')).toBe(1);
	});
});
