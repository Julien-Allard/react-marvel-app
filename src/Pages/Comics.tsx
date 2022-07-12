import axios from 'axios';
import { useState, useEffect, Dispatch, SetStateAction, FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandBackFist } from '@fortawesome/free-solid-svg-icons';
import '../components/comics.css';
import PaginationTwo from '../components/PaginationTwo';
import Searchbar from '../components/Searchbar';

interface ComicsProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

type Thumbnail = {
  path: string;
  extension: string;
};

type ComicsDatasResults = {
  thumbnail: Thumbnail;
  _id: string;
  title: string;
  description: string;
};

type ReceivedComicsDatas = {
  count: number;
  limit: number;
  results: ComicsDatasResults[];
};

const Comics: FC<ComicsProps> = ({ search, setSearch }) => {
  const [comicsData, setComicsData] = useState<ReceivedComicsDatas | null>(
    null,
  );
  const [comicsPage, setComicsPage] = useState<number>(1);
  const [comicsMaxPage, setComicsMaxPage] = useState<number | null>(null);
  const [comicsLoading, setComicsLoading] = useState<boolean>(true);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  const handleFavourites = (value: ComicsDatasResults) => {
    let favContainer: typeof favObject[];
    const favObject = {
      thumbnail: {
        path: value.thumbnail.path,
        extension: value.thumbnail.extension,
      },
      _id: value._id,
      title: value.title,
      description: value.description,
    };

    if (localStorage.getItem('favcomics')) {
      const importFavs = localStorage.getItem('favcomics') || ''; // need to put || "" because localStorage return type can be string or null
      favContainer = JSON.parse(importFavs);
      const filter = favContainer.filter((elem) => elem._id === value._id);

      if (filter.length > 0) {
        for (let i = 0; i < favContainer.length; i++) {
          if (favContainer[i]._id === value._id) {
            favContainer.splice(favContainer.indexOf(favContainer[i]), 1);
            const exportFavs = JSON.stringify(favContainer);
            localStorage.setItem('favcomics', exportFavs);
          }
        }
      } else {
        favContainer.push(favObject);
        const exportFavs = JSON.stringify(favContainer);
        localStorage.setItem('favcomics', exportFavs);
      }
    } else {
      favContainer = [];
      favContainer.push(favObject);
      const exportFavs = JSON.stringify(favContainer);
      localStorage.setItem('favcomics', exportFavs);
    }
    setIsFavourite(!isFavourite);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marveact-api.herokuapp.com/comics?page=${comicsPage}&title=${search}`,
        );
        setComicsData(response.data);
        setComicsMaxPage(Math.ceil(response.data.count / response.data.limit));
        setComicsLoading(false);
      } catch (error: any) {
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
        a look at the {comicsData?.count} references and see what's going on !
        Feel free to click on any of them to add it as favourite.
      </p>
      <Searchbar search={search} setSearch={setSearch} />
      <PaginationTwo
        comicsPage={comicsPage}
        setComicsPage={setComicsPage}
        comicsMaxPage={comicsMaxPage}
      />
      <div className="comics-card-container">
        {comicsData?.results.map((comics: ComicsDatasResults) => {
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
              {localStorage.getItem('favcomics') &&
                localStorage?.getItem('favcomics')?.includes(comics._id) && (
                  <FontAwesomeIcon
                    icon={faHandBackFist}
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
