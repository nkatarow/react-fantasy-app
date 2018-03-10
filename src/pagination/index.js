import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends Component {
  static defaultProps = {
    initialPage: 1,
  };

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentWillMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps) {
    // reset page if items array has changed
    // "prevState" was originally passed into this method
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage(page) {
    const { items } = this.props;
    let { pager } = this.state;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    pager = this.getPager(items.length, page, 10);

    // get new page of items from items array
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    this.setState({ pager });

    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    this.currentPage = currentPage || 1;

    // default page size is 10
    this.pageSize = pageSize || 10;

    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage;
    let endPage;

    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else if (totalPages > 10) {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min((startIndex + pageSize) - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    // const pages = _.range(startPage, endPage + 1);
    const range = (start, end) => (
      Array.from(Array((end - start) + 1).keys()).map(i => i + start)
    );
    const pages = range(startPage, endPage);

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  }

  render() {
    const { pager } = this.state;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <ul className="pagination">
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(1)} onKeyDown={() => this.setPage(1)} tabIndex={0} role="link">First</a>
        </li>
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage - 1)} onKeyDown={() => this.setPage(pager.currentPage - 1)} tabIndex={0} role="link">Previous</a>
        </li>
        {pager.pages.map(page =>
          // Removed "index" from map props
          // TODO: Update key once more than Aaron Rodgers is showing
          (
            <li key={page} className={pager.currentPage === page ? 'active' : ''}>
              <a onClick={() => this.setPage(page)} onKeyDown={() => this.setPage(page)} tabIndex={0} role="link">{page}</a>
            </li>))
      }
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage + 1)} onKeyDown={() => this.setPage(pager.currentPage + 1)} tabIndex={0} role="link">Next</a>
        </li>
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.totalPages)} onKeyDown={() => this.setPage(pager.totalPages)} tabIndex={0} role="link">Last</a>
        </li>
      </ul>
    );
  }
}
