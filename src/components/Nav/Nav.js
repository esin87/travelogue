import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Nav.css';

function Nav(props) {
	const logged_out_nav = (
		<div>
			<Link to="/about">
				<h1>TRAVELOGUE</h1>
			</Link>
			<div id="registration-options">
				<p onClick={() => props.display_form('login')}>LOGIN</p>
				<p onClick={() => props.display_form('signup')}>SIGNUP</p>
			</div>
		</div>
	);

	// const logged_in_nav = (
	// 	<ul>
	// 		<li onClick={props.handle_logout}>logout</li>
	// 	</ul>
	// );
	return <div>{props.logged_in ? null : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
	logged_in: PropTypes.bool.isRequired,
	display_form: PropTypes.func.isRequired,
	handle_logout: PropTypes.func.isRequired
};
