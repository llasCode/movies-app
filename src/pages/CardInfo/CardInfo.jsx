import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CardInfo.css";
import GoBackHeader from "../../components/GoBackHeader";
import CardSkeleton from "../../components/CardSkeleton";
import Title from "../../components/Title";

const CardInfo = () => {
  const { id } = useParams();
  const [cardData, setCardData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [favouriteText, setFavouriteText] = useState("Add to Favourite");
  const [isFavourite, setIsFavourite] = useState(!!localStorage.getItem(id));

  const movieAtributtes = [
    "Title",
    "Year",
    "RunTime",
    "Genre",
    "Director",
    "Actors",
    "Plot",
    "Awards",
    "Metascore",
    "imdbRating",
  ];

  const renderMovieAttributes = () => {
    return Object.keys(cardData)
      .filter((item) => movieAtributtes.includes(item))
      .map((item, index) => (
        <p key={index}>
          <strong>{`${item}: `}</strong>
          {cardData[item]}
        </p>
      ));
  };

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        setIsLoading(true);
        const url = `https://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_API_KEY}&plot=full`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();
        if (data) {
          setIsLoading(false);
          setCardData(data);
        }
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchCardData();
  }, [id]);

  useEffect(() => {
    const button = document.querySelector(".favourite-button");
    if (!button) return;

    if (isFavourite) {
      setFavouriteText("Remove from favourites");
      button.classList.add("negative");
    } else {
      setFavouriteText("Add to favourites");
    }
  }, [cardData, isFavourite]);

  const handleFavourite = () => {
    if (isFavourite) {
      localStorage.removeItem(id);
      document.querySelector(".favourite-button").classList.remove("negative");
      setIsFavourite(!isFavourite);
    } else {
      localStorage.setItem(
        id,
        JSON.stringify({ title: cardData.Title, poster: cardData.Poster, id })
      );
      setIsFavourite(!isFavourite);
    }
  };

  return (
    <main className="wrapper">
      <GoBackHeader />

      {isLoading && <CardSkeleton />}
      {cardData && !isLoading && (
        <>
          <Title title={cardData.Title} />

          <div className="content-container">
            <div className="image-container">
              <img src={cardData.Poster} alt={cardData.Title} />
            </div>

            <div className="details-container">{renderMovieAttributes()}</div>
          </div>
          <div className="favourite-container">
            <button className="favourite-button" onClick={handleFavourite}>
              {favouriteText}
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default CardInfo;
