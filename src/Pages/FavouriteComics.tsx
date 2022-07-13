import { useState, useEffect, FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandBackFist } from '@fortawesome/free-solid-svg-icons';
import LoganReading from '../assets/img/logan-reading.jpg';

type Thumbnail = {
  path: string;
  extension: string;
};

type ReceivedComicsData = {
  _id: number;
  title: string;
  description: string;
  thumbnail: Thumbnail;
};

const FavouriteComics: FC = () => {
  const [comicsData, setComicsData] = useState<ReceivedComicsData[] | []>([]);
  const [comicsLoading, setComicsLoading] = useState(true);

  const handleFavourites = (value: ReceivedComicsData) => {
    const importFavs = localStorage.getItem('favcomics') || '';
    const importedFavs = JSON.parse(importFavs);

    const newTab: ReceivedComicsData[] = [...comicsData];
    for (let i = 0; i < newTab.length; i++) {
      if (value._id === newTab[i]._id) {
        newTab.splice(newTab.indexOf(newTab[i]), 1);
      }
    }
    setComicsData(newTab);

    for (let i = 0; i < importedFavs.length; i++) {
      if (value._id === importedFavs[i]._id) {
        importedFavs.splice(importedFavs.indexOf(importedFavs[i]), 1);
      }
    }
    const exportedFavs = JSON.stringify(importedFavs);
    localStorage.setItem('favcomics', exportedFavs);
  };

  useEffect(() => {
    const importFavs = localStorage.getItem('favcomics') || '';
    const importedFavs = JSON.parse(importFavs);
    setComicsData(importedFavs);
    setComicsLoading(false);
  }, []);

  return comicsLoading ? (
    <div>Chargement en cours...</div>
  ) : !comicsData || comicsData.length === 0 ? (
    <div className="comics-body">
      <h1>Favourite comics</h1>
      <div className="no-favs">
        <img src={LoganReading} alt="" />
        <p>No favourites here bub...</p>
      </div>
    </div>
  ) : (
    <div className="comics-body">
      <h1>Favourite comics</h1>
      <div className="comics-card-container">
        {comicsData.map((comics) => {
          return (
            <div
              className="comics-card"
              key={comics._id}
              onClick={() => {
                handleFavourites(comics);
              }}
            >
              <h3>{comics.title}</h3>
              <div className="comics-card-img">
                <img
                  src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
                  alt=""
                />
              </div>
              {comics.description ? (
                <p>{comics.description}</p>
              ) : (
                <p>Description not available</p>
              )}
              <FontAwesomeIcon
                icon={faHandBackFist}
                className="comics-bookmark-icon"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavouriteComics;
