import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../components/pagination.css";

const Pagination = ({ page, setPage, maxPage }) => {
  const pageDown = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const pageDownFast = () => {
    if (page > 5) {
      setPage(page - 5);
    } else {
      setPage(1);
    }
  };

  const pageUp = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };

  const pageUpFast = () => {
    if (page < maxPage - 5) {
      setPage(page + 5);
    } else {
      setPage(maxPage);
    }
  };

  return (
    <div className="page-btn-container">
      <div className="page-btn-all">
        <FontAwesomeIcon
          icon="fa-solid fa-backward-fast"
          className="page-btn"
          onClick={pageDownFast}
        />
        <FontAwesomeIcon
          icon="arrow-left-long"
          className="page-btn"
          onClick={pageDown}
        />
        {page} / {maxPage}
        <FontAwesomeIcon
          icon="arrow-right-long"
          className="page-btn"
          onClick={pageUp}
        />
        <FontAwesomeIcon
          icon="fa-solid fa-forward-fast"
          className="page-btn"
          onClick={pageUpFast}
        />
      </div>
    </div>
  );
};

export default Pagination;
