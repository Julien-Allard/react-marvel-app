import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../components/comics.css";
import PaginationTwo from "../components/PaginationTwo";
import Searchbar from "../components/Searchbar";

const Comics = ({ search, setSearch }) => {
  const [comicsData, setComicsData] = useState();
  const [comicsPage, setComicsPage] = useState(1);
  const [comicsMaxPage, setComicsMaxPage] = useState();
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
      try {
        const response = await axios.get(
          `http://localhost:3100/comics?page=${comicsPage}&title=${search}`
        );
        setComicsData(response.data);
        setComicsMaxPage(Math.ceil(response.data.count / response.data.limit));
        setComicsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [comicsPage, search, isFavourite]);

  return comicsLoading ? (
    <div className="comics-body">
      <div className="comics-card-container">
        <p>Chargement en cours...</p>
      </div>
    </div>
  ) : (
    <div className="comics-body">
      <h1>Comics collection</h1>
      <p className="comics-intro">
        Here's the fun part. You like heroes ? And you like to read ? Just take
        a look at the {comicsData.count} references and see what's going on !
        Feel free to click on any of them to add it as favourite.
      </p>
      <Searchbar search={search} setSearch={setSearch} />
      <PaginationTwo
        comicsPage={comicsPage}
        setComicsPage={setComicsPage}
        comicsMaxPage={comicsMaxPage}
      />
      <div className="comics-card-container">
        {comicsData.results.map((comics) => {
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
              {localStorage.getItem(`fav${comics._id}`) && (
                <FontAwesomeIcon
                  icon="fa-solid fa-hand-back-fist"
                  className="comics-bookmark-icon"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comics;
