import { useParams } from 'react-router-dom';
import { useState, useEffect, FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandBackFist } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../components/details.css';

type Thumbnail = {
  path: string;
  extension: string;
};

type Comics = {
  thumbnail: Thumbnail;
  _id: string;
  title: string;
  description: string;
};

type ReceivedDetailsData = {
  thumbnail: Thumbnail;
  comics: Comics[];
  _id: string;
  name: string;
  description: string;
};

const Details: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<ReceivedDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFavourite, setIsFavourite] = useState<string | null>(null);

  const handleFavourites = () => {
    let favContainer;
    const newFav = {
      thumbnail: {
        path: data?.thumbnail.path,
        extension: data?.thumbnail.extension,
      },
      _id: data?._id,
      name: data?.name,
      description: data?.description,
    };

    if (!isFavourite) {
      if (localStorage.getItem('favchars')) {
        const importFavs = localStorage.getItem('favchars') || '';
        favContainer = JSON.parse(importFavs);
        favContainer.push(newFav);
      } else {
        favContainer = [];
        favContainer.push(newFav);
      }
      const addNewFav = JSON.stringify(favContainer);
      localStorage.setItem('favchars', addNewFav);
      //////////////////////////////////////////////////
      const characterID = data?._id;
      localStorage.setItem(`fav${data?._id}`, characterID as string);
      setIsFavourite(characterID as string);
    } else {
      if (localStorage.getItem('favchars')) {
        const importFavs = localStorage.getItem('favchars') || '';
        favContainer = JSON.parse(importFavs);
        for (let i = 0; i < favContainer.length; i++) {
          if (favContainer[i]._id === id) {
            favContainer.splice(favContainer.indexOf(favContainer[i]), 1);
          }
        }
        const addNewFav = JSON.stringify(favContainer);
        localStorage.setItem('favchars', addNewFav);
      }
      //////////////////////////////////////////////////
      localStorage.removeItem(`fav${data?._id}`);
      setIsFavourite(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marveact-api.herokuapp.com/comics/${id}`,
        );
        setData(response.data);
        // console.log(response.data);
        setIsFavourite(localStorage.getItem(`fav${response.data._id}`));
        setIsLoading(false);
      } catch (error: any) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id, isFavourite]);

  return isLoading ? (
    <p>Chargement en cours</p>
  ) : (
    <div className="details-body">
      <h1>Character details</h1>
      <div className="character-details">
        <p>{data?.name}</p>
        <div className="character-portrait">
          <img
            src={`${data?.thumbnail.path}.${data?.thumbnail.extension}`}
            alt=""
          />
        </div>
        {data?.description === '' ? (
          <span>Sorry, no description available for this character !</span>
        ) : (
          <span>{data?.description}</span>
        )}
        <div className="favourite-container">
          {isFavourite ? (
            <>
              <p>Remove from favourites : </p>
              <FontAwesomeIcon
                icon={faHandBackFist}
                className="rmvfav-bookmark-icon"
                onClick={handleFavourites}
              />
            </>
          ) : (
            <>
              <p>Set as a favourite : </p>
              <FontAwesomeIcon
                icon={faHandBackFist}
                className="addfav-bookmark-icon"
                onClick={handleFavourites}
              />
            </>
          )}
        </div>
      </div>
      <hr />
      <h1>Featured comics</h1>
      <div className="character-comics">
        {data?.comics.map((element) => {
          return (
            <div className="comics-card" key={element._id}>
              <h3>{element.title}</h3>
              <div className="comics-card-img">
                <img
                  src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                  alt=""
                />
              </div>
              {element.description ? (
                <p>{element.description}</p>
              ) : (
                <p>Description not available</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Details;
