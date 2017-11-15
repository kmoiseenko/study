import React from 'react';

import Header from './header.jsx';
import Main from './main.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className='app-main-container'>
				<Header />
				<Main />
            </div>
        );
    }
}

export default App;