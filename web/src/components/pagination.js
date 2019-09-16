import React from "react";

const Pagination = ({ meta, fetchGames }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination pagination-lg  justify-content-center">
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            onClick={e => fetchGames(meta.page - 1, meta.page_size)}
          >
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        {Array.from({ length: meta.pages }, (_, k) => {
          return (
            (k < 3 || k + 3 > meta.pages) && (
              <li
                class="page-item"
                onClick={e => fetchGames(k, meta.page_size)}
              >
                <a class="page-link" href="#">
                  {k + 1}
                </a>
              </li>
            )
          );
        })}

        <li class="page-item">
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
