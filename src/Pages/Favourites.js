import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeadpoolFace from "../assets/img/deadpool-portrait.jpeg";

const Favourites = () => {
  const [isLoading, setIsLoading] = useState(true);

  //gestion des favoris
  const [favCharas, setFavCharas] = useState();

  useEffect(() => {
    const recoverFavs = () => {
      const importFavs = localStorage.getItem("favchars");
      const favContainer = JSON.parse(importFavs);
      // console.log(favContainer);
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
  ) : favCharas.length > 0 ? (
    <div className="characters-body">
      <div className="character-card-container">
        <h1>Favourite characters (your new best friends)</h1>
        {favCharas.map((character) => {
          return (
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
          );
        })}
      </div>
    </div>
  ) : (
    <div className="characters-body">
      <div className="character-card-container">
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
