import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../components/pagination.css";

const PaginationTwo = ({ comicsPage, setComicsPage, comicsMaxPage }) => {
  const pageDown = () => {
    if (comicsPage > 1) {
      setComicsPage(comicsPage - 1);
    }
  };

  const pageDownFast = () => {
    if (comicsPage > 5) {
      setComicsPage(comicsPage - 5);
    } else {
      setComicsPage(1);
    }
  };

  const pageUp = () => {
    if (comicsPage < comicsMaxPage) {
      setComicsPage(comicsPage + 1);
    }
  };

  const pageUpFast = () => {
    if (comicsPage < comicsMaxPage - 5) {
      setComicsPage(comicsPage + 5);
    } else {
      setComicsPage(comicsMaxPage);
    }
  };

  const changePage = (value) => {
    if (value <= comicsMaxPage) {
      setComicsPage(value);
    } else {
      setComicsPage(comicsMaxPage);
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
        <input
          type="number"
          placeholder={comicsPage}
          onChange={(event) => {
            changePage(event.target.value);
          }}
        />
        / <p>{comicsMaxPage}</p>
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

export default PaginationTwo;
