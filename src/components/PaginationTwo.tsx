import { FC, Dispatch, SetStateAction, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackwardFast,
  faForwardFast,
} from '@fortawesome/free-solid-svg-icons';
import '../components/pagination.css';

interface PaginationTwoProps {
  comicsPage: number;
  setComicsPage: Dispatch<SetStateAction<number>>;
  comicsMaxPage: number;
}

const PaginationTwo: FC<PaginationTwoProps> = ({
  comicsPage,
  setComicsPage,
  comicsMaxPage,
}) => {
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

  const changePage = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number(event) <= comicsMaxPage) {
      setComicsPage(Number(event.target.value));
    } else {
      setComicsPage(comicsMaxPage);
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
          placeholder={comicsPage.toString()}
          onChange={changePage}
        />
        / <p>{comicsMaxPage}</p>
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

export default PaginationTwo;
