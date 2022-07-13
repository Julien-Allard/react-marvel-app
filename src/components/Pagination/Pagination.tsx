import { FC, Dispatch, SetStateAction, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackwardFast,
  faForwardFast,
} from '@fortawesome/free-solid-svg-icons';
import './pagination.css';

interface PaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  maxPage: number;
}

const Pagination: FC<PaginationProps> = ({ page, setPage, maxPage }) => {
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

  const changePage = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number(event) <= maxPage) {
      setPage(Number(event.target.value));
    } else {
      setPage(maxPage);
    }
  };

  return (
    <div className="page-btn-container">
      <div className="page-btn-all">
        <FontAwesomeIcon
          icon={faBackwardFast}
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
          placeholder={page.toString()}
          onChange={changePage}
        />
        / <p>{maxPage}</p>
        <FontAwesomeIcon
          icon="arrow-right-long"
          className="page-btn"
          onClick={pageUp}
        />
        <FontAwesomeIcon
          icon={faForwardFast}
          className="page-btn"
          onClick={pageUpFast}
        />
      </div>
    </div>
  );
};

export default Pagination;
