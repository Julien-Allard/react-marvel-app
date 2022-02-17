import axios from "axios";
import { useState, useEffect } from "react";
import "../components/comics.css";

const Comics = () => {
  const [comicsData, setComicsData] = useState();
  const [comicsPage, setComicsPage] = useState(1);
  const [comicsLoading, setComicsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3100/comics?${comicsPage}`
        );
        setComicsData(response.data);
        setComicsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [comicsPage]);

  return comicsLoading ? (
    <div>Chargement en cours...</div>
  ) : (
    <div className="comics-body">
      <h1>Comics collection</h1>
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
              <p>{comics.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comics;
