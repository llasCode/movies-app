import { useEffect, useState } from "react";
import "./Home.css";
import { useDebounce } from "use-debounce";
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";
import CardsGrid from "../../components/CardsGrid";
import Title from "../../components/Title";
import ErrorMessage from "../../components/ErrorMessage";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedInputValue] = useDebounce(inputValue, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchResults = async (searchResult) => {
    setIsLoading(true);
    const url = `https://www.omdbapi.com/?s=${searchResult}&apikey=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      setIsError(true);
      throw new Error("Failed to fetch movies");
    }
    const results = await response.json();

    if (results.Search) {
      setIsLoading(false);
      setIsError(false);
      setSearchResults(results.Search);
    } else {
      setIsLoading(false);
      setSearchResults([]);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (debouncedInputValue) {
      handleSearchResults(debouncedInputValue);
    } else {
      setSearchResults([]);
    }
  }, [debouncedInputValue]);

  return (
    <main className="app">
      <Title title="Best Movies Discovery Platform" />

      <div className="input-container">
        <input
          id="movieInput"
          placeholder="Search movies..."
          type="text"
          className="input"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className="favourites-movies-button"
          onClick={() => navigate("movies/favourites")}
        >
          Favouties Movies
        </button>
      </div>

      {isLoading && (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      )}

      {isError && <ErrorMessage message="No movies found" />}

      {!!searchResults.length && !isLoading && (
        <CardsGrid>
          {searchResults.map((item) => (
            <Card
              key={JSON.stringify(item)}
              title={item.Title}
              poster={item.Poster}
              id={item.imdbID}
            />
          ))}
        </CardsGrid>
      )}
    </main>
  );
};

export default Home;
