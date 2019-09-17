import React from "react";

const Pagination = ({ meta, fetchGames }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination pagination-lg  justify-content-center">
        <li className={"page-item" + (meta.page === 0 ? " disabled" : "")}>
          <a
            className={"page-link"}
            href="#"
            aria-label="Previous"
            onClick={e => fetchGames(meta.page - 1, meta.page_size)}
          >
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>

        {[meta.page, meta.page + 1, meta.page + 2].map(function(name, index) {
          return (
            <li
              class="page-item"
              onClick={e => fetchGames(name, meta.page_size)}
              key={index}
            >
              <a class="page-link" href="#">
                {name + 1}
              </a>
            </li>
          );
        })}

        <li class="page-item disabled">
          <a class="page-link" href="#">
            ...
          </a>
        </li>

        {[meta.pages - 2, meta.pages - 1, meta.pages].map(function(
          name,
          index
        ) {
          return (
            <li
              class="page-item"
              onClick={e => fetchGames(name, meta.page_size)}
              key={index}
            >
              <a class="page-link" href="#">
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
            class="page-link"
            href="#"
            aria-label="Next"
            onClick={e => fetchGames(meta.page + 1, meta.page_size)}
          >
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
