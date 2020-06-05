import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

class About extends React.Component {
	render() {
		return (
			<div className='about'>
				<Link to='/'>
					<h1>TRAVELOGUE</h1>
				</Link>
				<p>
					You might be new to travel or a cosmopolitan. Regardless,
					Travelogue is a place for you to tell your travel story.
				</p>
				<p>
					No matter where the journey takes you, Travelogue is a place
					to record your travels. Your favorite museum, restaurant,
					park, or sightseeing destination. If it made an impact on
					your travels, you'll want to remember it, whether to share
					with your friends or revisit on a later journey.
				</p>
				<p>Tell your travel story here.</p>
				<br />
				<br />
				<p>
					Made with &hearts; by{' '}
					<a
						href='https://esinsaribudak.com'
						target='_blank'
						rel='noopener noreferrer'>
						Esin Saribudak
					</a>{' '}
					&copy; 2019
				</p>
			</div>
		);
	}
}

export default About;
