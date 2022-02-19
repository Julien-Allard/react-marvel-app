import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import axios from "axios";
import "../components/details.css";

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState();

  const handleFavourites = () => {
    if (!isFavourite) {
      Cookies.set(`fav${data._id}`, data._id);
      setIsFavourite(data._id);
    } else {
      Cookies.remove(`fav${data._id}`);
      setIsFavourite();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/comics/${id}`);
        setData(response.data);
        // console.log(response.data);
        setIsFavourite(Cookies.get(`fav${response.data._id}`));
        setIsLoading(false);
      } catch (error) {
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
        <p>{data.name}</p>
        <div className="character-portrait">
          <img
            src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
            alt=""
          />
        </div>
        {data.description === "" ? (
          <span>Sorry, no description available for this character !</span>
        ) : (
          <span>{data.description}</span>
        )}
        <div className="favourite-container">
          {isFavourite ? (
            <>
              <p>Remove from favourites : </p>
              <FontAwesomeIcon
                icon="fa-solid fa-hand-back-fist"
                className="rmvfav-bookmark-icon"
                onClick={handleFavourites}
              />
            </>
          ) : (
            <>
              <p>Set as a favourite : </p>
              <FontAwesomeIcon
                icon="fa-solid fa-hand-back-fist"
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
        {data.comics.map((element) => {
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
