import { useEffect, useState } from "react";
import "./Home.css";
import { useDebounce } from "use-debounce";
import Card from "../../components/Card";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedInputValue] = useDebounce(inputValue, 500);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchResults = async (searchResult) => {
    const url = `https://www.omdbapi.com/?s=${searchResult}&apikey=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    const results = await response.json();

    if (results.Search) {
      setSearchResults(results.Search);
    }
  };

  useEffect(() => {
    if (!debouncedInputValue) setSearchResults([]);
  }, [debouncedInputValue]);

  useEffect(() => {
    if (debouncedInputValue) {
      handleSearchResults(debouncedInputValue);
    }
  }, [debouncedInputValue]);

  return (
    <main className="app">
      <h1 className="title">Best Movies Discovery Platform</h1>
      <input
        id="movieInput"
        placeholder="Search movies..."
        type="text"
        className="input"
        value={inputValue}
        onChange={handleInputChange}
      />

      <div className="cards-grid">
        {!!searchResults.length &&
          searchResults.map((item) => (
            <Card
              key={JSON.stringify(item)}
              title={item.Title}
              poster={item.Poster}
              id={item.imdbID}
            />
          ))}
      </div>
    </main>
  );
};

export default Home;
