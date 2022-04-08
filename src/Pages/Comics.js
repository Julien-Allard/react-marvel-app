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
  const [isFavourite, setIsFavourite] = useState(false);

  const handleFavourites = (value) => {
    let favContainer;
    const favObject = {
      thumbnail: {
        path: value.thumbnail.path,
        extension: value.thumbnail.extension,
      },
      _id: value._id,
      title: value.title,
      description: value.description,
    };

    if (localStorage.getItem("favcomics")) {
      const importFavs = localStorage.getItem("favcomics");
      favContainer = JSON.parse(importFavs);
      const filter = favContainer.filter((elem) => elem._id === value._id);
      // console.log(filter);

      if (filter.length > 0) {
        for (let i = 0; i < favContainer.length; i++) {
          if (favContainer[i]._id === value._id) {
            favContainer.splice(favContainer.indexOf(favContainer[i]), 1);
            const exportFavs = JSON.stringify(favContainer);
            localStorage.setItem("favcomics", exportFavs);
          }
        }
      } else {
        favContainer.push(favObject);
        const exportFavs = JSON.stringify(favContainer);
        localStorage.setItem("favcomics", exportFavs);
      }
    } else {
      favContainer = [];
      favContainer.push(favObject);
      const exportFavs = JSON.stringify(favContainer);
      localStorage.setItem("favcomics", exportFavs);
    }
    setIsFavourite(!isFavourite);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marveact-api.herokuapp.com/comics?page=${comicsPage}&title=${search}`
        );
        setComicsData(response.data);
        setComicsMaxPage(Math.ceil(response.data.count / response.data.limit));
        setComicsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [comicsPage, search]);

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
              {localStorage.getItem("favcomics") &&
                localStorage.getItem("favcomics").includes(comics._id) && (
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
