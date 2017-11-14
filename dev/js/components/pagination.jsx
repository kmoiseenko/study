import React from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    onItemClick = (test) => {
        this.props.onChange(test);
    };

    render() {
        let list = [];

        for(let i = 1; i <= this.props.pagesCount; i++) {
            list.push(
                <li key={i}
                    className={parseInt(this.props.defaultPage) === i ? 'app-pagination__item active' : 'app-pagination__item'}
                    onClick={this.onItemClick.bind(null, i)}>
                    <button type='button'>{i}</button>
                </li>
            );
        }

        return(
            <ul className={'app-pagination'}>
                {list}
            </ul>
        )
    }
}

export default Pagination;