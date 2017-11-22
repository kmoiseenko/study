import React from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    onItemClick = (pageNumber) => {
        this.props.onChange(pageNumber);
    };

    buildPagination = () => {
        let result = [];
        let step = 5;
        let min = this.props.defaultPage - step <= 0 ? 1 : this.props.defaultPage - step;
        let max = this.props.defaultPage + step >= this.props.pagesCount ? this.props.pagesCount : this.props.defaultPage + step;

        if(this.props.defaultPage >= step + 2) {
            result.push(
                <li key='min'
                    className='app-pagination__item'
                    onClick={this.onItemClick.bind(null, 1)}>
                    <button type='button'>1</button>
                </li>,
                <li key='min-dots'
                    className='app-pagination__item'>
                    <button type='button'>...</button>
                </li>
            )
        }

        for(let i = min; i <= max; i++) {
            result.push(
                <li key={i}
                    className={this.props.defaultPage === i ? 'app-pagination__item active' : 'app-pagination__item'}
                    onClick={this.onItemClick.bind(null, i)}>
                    <button type='button'>{i}</button>
                </li>
            );
        }

        if(this.props.defaultPage + step < this.props.pagesCount) {
            result.push(
                <li key='max-dots'
                    className='app-pagination__item'
                    onClick={this.onItemClick.bind(null, this.props.pagesCount)}>
                    <button type='button'>...</button>
                </li>,
                <li key='max'
                    className='app-pagination__item'>
                    <button type='button'>{this.props.pagesCount}</button>
                </li>
            )
        }

        return result;
    };

    render() {
        let list = this.buildPagination();

        return(
            <ul className={'app-pagination'}>
                {list}
            </ul>
        )
    }
}

export default Pagination;