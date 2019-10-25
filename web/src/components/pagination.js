import { connect } from "react-redux";
import { fetchGames } from "../actions/games";
import React from "react";

const Pagination = ({ games }) => {
  const meta = games.meta || [{ page: 0, page_size: 0, pages: 0 }];

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination pagination-lg  justify-content-center">
        <li className={"page-item" + (meta.page === 0 ? " disabled" : "")}>
          <a
            className={"page-link"}
            href="#"
            aria-label="Previous"
            onClick={e => fetchGames(meta.page - 1, meta.page_size)}
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>

        {[meta.page, meta.page + 1, meta.page + 2].map(function(name, index) {
          return (
            <li
              className="page-item"
              onClick={e => fetchGames(name, meta.page_size)}
              key={index}
            >
              <a className="page-link" href="#">
                {name + 1}
              </a>
            </li>
          );
        })}

        <li className="page-item disabled">
          <a className="page-link" href="#">
            ...
          </a>
        </li>

        {[meta.pages - 2, meta.pages - 1, meta.pages].map(function(
          name,
          index
        ) {
          return (
            <li
              className="page-item"
              onClick={e => fetchGames(name, meta.page_size)}
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
            "page-item" + (meta.page === meta.pages ? " disabled" : "")
          }
        >
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={e => fetchGames(meta.page + 1, meta.page_size)}
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = state => ({
  games: state.games
});

const mapDispatchToProps = dispatch => ({
  fetchGames: () => dispatch(fetchGames())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
