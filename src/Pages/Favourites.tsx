import { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandBackFist } from '@fortawesome/free-solid-svg-icons';
import DeadpoolFace from '../assets/img/deadpool-portrait.jpeg';

type Thumbnail = {
  path: string;
  extension: string;
};

type ReceivedFavouritesData = {
  thumbnail: Thumbnail;
  _id: string;
  name: string;
  description: string;
};

const Favourites: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favCharas, setFavCharas] = useState<ReceivedFavouritesData[] | []>([]);

  useEffect(() => {
    const recoverFavs = () => {
      const importFavs = localStorage.getItem('favchars') || '';
      const favContainer = JSON.parse(importFavs);
      setFavCharas(favContainer);
      setIsLoading(false);
    };
    recoverFavs();
  }, []);

  return isLoading ? (
    <div className="characters-body">
      <div className="character-card-container">
        <p>Waiting for favourites...</p>
      </div>
    </div>
  ) : favCharas && favCharas.length > 0 ? (
    <div className="characters-body">
      <div className="character-card-container">
        <h1>Favourite characters (your new best friends)</h1>
        {favCharas.map((character) => {
          return (
            <Link key={character._id} to={`/details/${character._id}`}>
              <div className="character-card">
                {localStorage.getItem(`fav${character._id}`) && (
                  <FontAwesomeIcon
                    icon={faHandBackFist}
                    className="bookmark-icon"
                  />
                )}

                <div className="character-card-img">
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt=""
                  />
                </div>
                <h3>{character.name}</h3>
                <p>{character.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="characters-body">
      <div className="character-card-container">
        <h1>Favourite characters (your new best friends)</h1>
        <div className="no-favourites">
          <img src={DeadpoolFace} alt="" />
          <p>
            Ow... Got no friends ? Let's meet new ones ! The Hulk is always up
            for some MEAN GREEN tea.
          </p>
          <Link to="/" className="lets-go">
            <p>Let's go !</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
