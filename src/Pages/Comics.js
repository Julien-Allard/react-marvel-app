import axios from "axios";
import { useState, useEffect } from "react";
import "../components/comics.css";
import PaginationTwo from "../components/PaginationTwo";
import Searchbar from "../components/Searchbar";

const Comics = ({ search, setSearch }) => {
  const [comicsData, setComicsData] = useState();
  const [comicsPage, setComicsPage] = useState(1);
  const [comicsMaxPage, setComicsMaxPage] = useState();
  const [comicsLoading, setComicsLoading] = useState(true);

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
  }, [comicsPage, search]);

  return comicsLoading ? (
    <div>Chargement en cours...</div>
  ) : (
    <div className="comics-body">
      <h1>Comics collection - ({comicsData.count})</h1>
      <Searchbar search={search} setSearch={setSearch} />
      <PaginationTwo
        comicsPage={comicsPage}
        setComicsPage={setComicsPage}
        comicsMaxPage={comicsMaxPage}
      />
      <div className="comics-card-container">
        {comicsData.results.map((comics) => {
          return (
            <div className="comics-card" key={comics._id}>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comics;
