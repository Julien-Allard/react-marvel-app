import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";

const Favourites = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3100/characters");
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
    console.log(data);
  }, []);

  return isLoading ? (
    <p>Chargement en cours</p>
  ) : (
    <div className="characters-body">
      <div className="character-card-container">
        <h1>Favourite characters</h1>
        {data.results.map((character) => {
          return (
            Cookies.get(`fav${character._id}`) && (
              <Link key={character._id} to={`/details/${character._id}`}>
                <div className="character-card">
                  {Cookies.get(`fav${character._id}`) && (
                    <FontAwesomeIcon
                      icon="fa-solid fa-hand-back-fist"
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
            )
          );
        })}
      </div>
    </div>
  );
};

export default Favourites;
