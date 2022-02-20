import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const FavouriteComics = () => {
  const [comicsData, setComicsData] = useState();
  const [comicsLoading, setComicsLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState();

  const handleFavourites = (value) => {
    if (!localStorage.getItem(`fav${value._id}`)) {
      localStorage.setItem(`fav${value._id}`, value._id);
      setIsFavourite(value._id);
    } else {
      localStorage.removeItem(`fav${value._id}`);
      setIsFavourite();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marveact-api.herokuapp.com/comics`
      );
      setComicsData(response.data);
      setComicsLoading(false);
    };
    fetchData();
  }, [isFavourite]);

  return comicsLoading ? (
    <div>Chargement en cours...</div>
  ) : (
    <div className="comics-body">
      <h1>Favourite comics</h1>
      <div className="comics-card-container">
        {comicsData.results.map((comics) => {
          return (
            localStorage.getItem(`fav${comics._id}`) && (
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
                {localStorage.getItem(`fav${comics._id}`) && (
                  <FontAwesomeIcon
                    icon="fa-solid fa-hand-back-fist"
                    className="comics-bookmark-icon"
                  />
                )}
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default FavouriteComics;
