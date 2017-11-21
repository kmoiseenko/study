import React from 'react';
import {NavLink} from 'react-router-dom';

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<nav className='app-tabs'>
				<NavLink to='/apod' className='app-tabs__item' activeClassName='active'>APOD</NavLink>
				<NavLink to='/mars' className='app-tabs__item' activeClassName='active'>MARS</NavLink>
			</nav>
		);
	}
}

export default Header;