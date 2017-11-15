import React from 'react';

import Preloader from './pre_loader.jsx';
import Pagination from './pagination.jsx';
import {getData} from './../utils.js';

class Mars extends React.Component {
	constructor(props) {
		super(props);

		this.apiKey = 'rom93FHJOFb6TF4jSC7USdH03jogPMtfg7qDHrMd';
		this.state = {
			mars: '',
			page: 2,
		}
	}

	componentWillMount = () => {
		this.getMarsPictures(this.state.page);
	};

	getMarsPictures = (page) => {
		getData('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=' + page + '&api_key=' + this.apiKey).then(
			response => {
				this.setState({
					mars: JSON.parse(response),
					page: page
				});
			},
			error => console.log(error)
		);
	};

	paginationUpdate = (value) => {
		this.getMarsPictures(value);
	};

	render() {
		if(!this.state.mars) { return <Preloader /> }

		return(
			<div className='app-main-container'>
				<div className='flex-column'>
					<h1 className='text-center'>Mars Rover Photos</h1>
					<div id='mars'>
						<ul className='app-grid'>
							{this.state.mars.photos.map((item) =>
								<li key={item.id}
									className='app-grid__item'>
									<img src={item.img_src} />
								</li>
							)}
						</ul>
					</div>
				</div>
				<Pagination defaultPage={this.state.page} pagesCount='10' onChange={this.paginationUpdate}/>
			</div>
		);
	}
}

export default Mars;