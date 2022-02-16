import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/characters.css";
import Pagination from "../components/Pagination";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3100/characters?page=${page}`
        );
        setData(response.data);
        // console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div>Chargement en cours</div>
  ) : (
    <div className="characters-body">
      <Pagination />
      <div className="character-card-container">
        {data.results.map((element) => {
          return (
            <Link key={element._id} to={element._id}>
              <div className="character-card">
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
