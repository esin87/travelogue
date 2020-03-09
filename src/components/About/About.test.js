import React from 'react';
import { shallow } from 'enzyme';

import About from './About';

describe('About component', () => {
	let component;
	beforeEach(() => {
		component = shallow(<About />);
	});

	it('should have a header that says TRAVELOGUE', () => {
		expect(component.contains(<h1>TRAVELOGUE</h1>)).toBe(true);
	});

	it('should have a paragraph tag that says "tell your travel story here"', () => {
		expect(component.contains(<p>Tell your travel story here.</p>)).toBe(
			true
		);
	});
});
