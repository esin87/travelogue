import React from 'react';
import { shallow } from 'enzyme';

import Form from './Form';

describe('Form component', () => {
	let component;
	beforeEach(() => {
		component = shallow(<Form />);
	});

	it('should have a header that says TRAVELOGUE', () => {
		expect(component.contains(<h1>TRAVELOGUE</h1>)).toBe(true);
	});
});
