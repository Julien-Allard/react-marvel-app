import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const Favourites = () => {
  const [isLoading, setIsLoading] = useState(true);

  //gestion des favoris
  const [favCharas, setFavCharas] = useState();
  const tempData = [];

  useEffect(() => {
    const fetchData = async () => {
      //récupération de tous les ID mis en localStorage
      const favKeys = [];
      Object.keys(localStorage).forEach((key) => {
        favKeys.push(localStorage.getItem(key));
      });
      // console.log(favKeys);
      //itération pour récupérer uniquement les personnages dont l'ID est stocké en localStorage
      for (let i = 0; i < favKeys.length; i++) {
        const response = await axios.get(
          `https://marveact-api.herokuapp.com/character/${favKeys[i]}`
        );
        if (response.data !== null) {
          tempData.push(response.data);
        }
      }
      setFavCharas(tempData);
      setIsLoading(false);
    };
    fetchData();
  }, [tempData]);

  return isLoading ? (
    <div className="characters-body">
      <div className="character-card-container">
        <p>Chargement en cours</p>
      </div>
    </div>
  ) : (
    <div className="characters-body">
      <div className="character-card-container">
        <h1>Favourite characters (your new best friends)</h1>
        {favCharas.map((character) => {
          return (
            localStorage.getItem(`fav${character._id}`) && (
              <Link key={character._id} to={`/details/${character._id}`}>
                <div className="character-card">
                  {localStorage.getItem(`fav${character._id}`) && (
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
