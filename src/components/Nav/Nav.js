import React from 'react';
import PropTypes from 'prop-types';

import './Nav.css';

function Nav(props) {
	const logged_out_nav = (
		<div>
			<h1>TRAVELOGUE</h1>
			<div id="registration-options">
				<p
					className="log-in-buttons"
					onClick={() => props.display_form('login')}>
					LOGIN
				</p>
				<p
					className="log-in-buttons"
					onClick={() => props.display_form('signup')}>
					SIGNUP
				</p>
			</div>
		</div>
	);

	return <div>{props.logged_in ? null : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
	logged_in: PropTypes.bool.isRequired,
	display_form: PropTypes.func.isRequired,
	handle_logout: PropTypes.func.isRequired
};
