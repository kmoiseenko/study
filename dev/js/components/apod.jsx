import React from 'react';

import Preloader from './pre_loader.jsx';
import {getData} from './../utils.js';

class Apod extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			apod: ''
		}
	}

	componentWillMount() {
		this.getApod();
	}

	getApod = () => {
		getData('https://api.nasa.gov/planetary/apod?api_key=' + API_KEY).then(
			response => {
				this.setState({
					apod: JSON.parse(response)
				});
			},
			error => console.log(error)
		);
	};

	render() {
		if(!this.state.apod) { return <Preloader /> }

		return(
			<div className='flex-column'>
				<h1 className='text-center'>Astronomy Picture of the Day</h1>
				<div id='apod' className='app-apod'>
					<div className='app-apod__item'>
						<a href={this.state.apod.hdurl} target='_blank'>
							<img src={this.state.apod.url} alt={this.state.apod.title} />
						</a>
					</div>
					<div className='app-apod__item'>
						<h2 className='text-center'>{this.state.apod.title}</h2>
						<h3>Copyright</h3>
						<p>{this.state.apod.copyright}</p>
						<h3>Date</h3>
						<p>{this.state.apod.date}</p>
						<h3>Explanation</h3>
						<p>{this.state.apod.explanation}</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Apod;