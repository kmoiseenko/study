import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from './components/pagination.jsx';
import PreLoader from './components/pre_loader.jsx';
import {getData} from './utils.js';

class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.apiKey = 'rom93FHJOFb6TF4jSC7USdH03jogPMtfg7qDHrMd';
        this.state = {
            status: false,
            apod: '',
            mars: '',
            marsPage: '4',
            currentTab: 'apod'
        };
    }

    componentWillMount = () => {
        this.getApod();
    };

    getApod = () => {
		getData('https://api.nasa.gov/planetary/apod?api_key=' + this.apiKey).then(
			response => {
				this.setState({
                    apod: JSON.parse(response),
                    status: true
				});
			},
			error => console.log(error)
		);
    };

    getMarsPictures = (page) => {
        getData('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=' + page + '&api_key=' + this.apiKey).then(
            response => {
                this.setState({
                    mars: JSON.parse(response),
					status: true
                });
            },
            error => console.log(error)
        );
    };

    paginationUpdate = (value) => {
        this.state.marsPage = value;
        this.getMarsPictures(value);
    };

	openTab = (type) => {
		this.setState({status: false});

	    switch(type) {
            case 'apod':
                this.state.currentTab = 'apod';
                this.getApod();
                break;

            case 'mars':
                this.state.currentTab = 'mars';
				this.getMarsPictures(this.state.marsPage);
				break;
        }
    };

    render(){
		if(!this.state.status) {return <PreLoader />}

        let content = [];

        switch(this.state.currentTab) {
            case 'apod':
				content.push(
					<div className={'flex-column'}>
						<h1 className={'text-center'}>Astronomy Picture of the Day</h1>
						<div id={'apod'} className={'app-apod'}>
							<div className={'app-apod__item'}>
								<a href={this.state.apod.hdurl} target='_blank'>
									<img src={this.state.apod.url} alt={this.state.apod.title} />
								</a>
							</div>
							<div className={'app-apod__item'}>
								<h2 className={'text-center'}>{this.state.apod.title}</h2>
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
				break;

            case 'mars':
				content.push(
					<div className={'flex-column'}>
						<h1 className={'text-center'}>Mars Rover Photos</h1>
						<div id={'mars'}>
							<ul className={'app-grid'}>
								{this.state.mars.photos.map((item) =>
									<li key={item.id}
										className={'app-grid__item'}>
										<img src={item.img_src} />
									</li>
								)}
							</ul>
						</div>
					</div>
				);
				content.push(<Pagination defaultPage={this.state.marsPage} pagesCount="5" onChange={this.paginationUpdate}/>);
				break;
        }

        return (
            <div className={'app-main-container'}>
                <ul className={'app-tabs'}>
                    <li key={'apod'}
                        className={this.state.currentTab === 'apod' ? 'app-tabs__item active' : 'app-tabs__item'}
                        onClick={this.openTab.bind(null, 'apod')}>APOD</li>

                    <li key={'mars'}
                        className={this.state.currentTab === 'mars' ? 'app-tabs__item active' : 'app-tabs__item'}
                        onClick={this.openTab.bind(null, 'mars')}>MARS</li>
                </ul>

				{content}
            </div>
        );
    }
}

ReactDOM.render(
    <Todo />,
    document.getElementById('root')
);