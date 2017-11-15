import React from 'react';

class PreLoader extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className={'app-preloader'}>Please, stand by.</div>
		)
	}
}

export default PreLoader;