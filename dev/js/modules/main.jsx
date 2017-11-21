import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Apod from '../components/apod.jsx';
import Mars from '../components/mars.jsx';

class Main extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<main className='app-main-container'>
				<Switch>
					<Route path='/apod'  component={Apod} />
					<Route path='/mars' component={Mars} />
					<Redirect to='/apod' />
				</Switch>
			</main>
		);
	}
}

export default Main;