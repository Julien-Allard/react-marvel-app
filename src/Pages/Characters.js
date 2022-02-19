import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import "../components/characters.css";
import Pagination from "../components/Pagination";
import Searchbar from "../components/Searchbar";

const Characters = ({ search, setSearch }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3100/characters?page=${page}&title=${search}`
        );
        setData(response.data);
        setMaxPage(Math.ceil(response.data.count / response.data.limit));
        // console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [page, search]);

  return isLoading ? (
    <div>Chargement en cours</div>
  ) : (
    <div className="characters-body">
      <div className="character-card-container">
        <h1>Characters roster - ({data.count})</h1>
        <Searchbar search={search} setSearch={setSearch} />
        <Pagination page={page} setPage={setPage} maxPage={maxPage} />
        {data.results.map((element) => {
          return (
            <Link key={element._id} to={`details/${element._id}`}>
              <div className="character-card">
                {Cookies.get(`fav${element._id}`) && (
                  <FontAwesomeIcon
                    icon="fa-solid fa-hand-back-fist"
                    className="bookmark-icon"
                  />
                )}

                <div className="character-card-img">
                  <img
                    src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                    alt=""
                  />
                </div>
                <h3>{element.name}</h3>
                <p>{element.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Characters;
