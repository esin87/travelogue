import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Axios from 'axios';

const devKey = 'AIzaSyB6ON524-NE8rxEhT8w2_keiyKHmRHNyB0';
class GoogleMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			placeName: this.props.placeName,
			coordinates: ''
		};
	}

	componentDidMount() {
		if (this.state.placeName) {
			const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.placeName}&key=AIzaSyB6ON524 - NE8rxEhT8w2_keiyKHmRHNyB0`;
			Axios.get(url)
				.then(response => {
					console.log(response.data);
					this.setState({
						coordinates: response.data.results[0].geometry.location
					});
				})
				.catch(err => console.error(err));
		}
	}

	render() {
		return (
			<div id="google-map" style={{ height: '200px', width: '100%' }}>
				{this.state.coordinates && (
					<GoogleMapReact
						bootstrapURLKeys={{
							key: 'AIzaSyB6ON524 - NE8rxEhT8w2_keiyKHmRHNyB0'
						}}
						center={this.state.coordinates}
						zoom={14}
						yesIWantToUseGoogleMapApiInternals
						size={{
							width: '100%',
							height: '100'
						}}></GoogleMapReact>
				)}
			</div>
		);
	}
}
export default GoogleMap;
