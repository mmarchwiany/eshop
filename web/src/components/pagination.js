import { connect } from "react-redux";
import { doFetchGames } from "../actions/games";
import React, { Component } from "react";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, data) {
    this.props.doFetchGames({
      meta: { ...this.props.meta, ...data },
      query: this.props.query
    });
  }

  render() {
    if (this.props.meta.pages === undefined) {
      return (
        <nav aria-label="Page navigation">
          <ul className="pagination pagination-lg justify-content-center"></ul>
        </nav>
      );
    }

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination pagination-lg justify-content-center">
          <li
            className={
              "page-item" + (this.props.meta.page === 0 ? " disabled" : "")
            }
          >
            <a
              className={"page-link"}
              href="#"
              aria-label="Previous"
              onClick={e => this.handleClick(e, { page: 0 })}
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>

          {[
            this.props.meta.page,
            this.props.meta.page + 1,
            this.props.meta.page + 2
          ].map(function(name, index) {
            return (
              <li
                className="page-item"
                onClick={e => this.handleClick(e, { page: name })}
                key={index}
              >
                <a className="page-link" href="#">
                  {name + 1}
                </a>
              </li>
            );
          }, this)}

          <li className="page-item disabled">
            <a className="page-link" href="#">
              ...
            </a>
          </li>

          {[
            this.props.meta.pages - 2,
            this.props.meta.pages - 1,
            this.props.meta.pages
          ].map(function(name, index) {
            return (
              <li
                className="page-item"
                onClick={e => this.handleClick(e, { page: name })}
                key={index}
              >
                <a className="page-link" href="#">
                  {name + 1}
                </a>
              </li>
            );
          })}

          <li
            className={
              "page-item" +
              (this.props.meta.page === this.props.meta.pages
                ? " disabled"
                : "")
            }
          >
            <a
              className="page-link"
              href="#"
              aria-label="Next"
              onClick={e => this.handleClick(e, { page: 0 })}
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  games: state.games.games,
  meta: state.games.meta,
  query: state.games.query
});

const mapDispatchToProps = dispatch => ({
  doFetchGames: query => dispatch(doFetchGames(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
