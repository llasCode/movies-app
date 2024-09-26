import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CardInfo.css";

const CardInfo = () => {
  const { id } = useParams();
  const [cardData, setCardData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true);
        const url = `https://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_API_KEY}&plot=full`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();
        if (data) {
          setLoading(false);
          setCardData(data);
        }
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchCardData();
  }, [id]);

  return (
    <>
      <main className="card-wrapper">
        <div className="header-container">
          <button className="back-button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>

        {loading && (
          <div className="skeleton">
            <div className="image-placeholder"></div>
            <div className="text-placeholder-wrapper">
              <div className="text-placeholder line"></div>
              <div className="text-placeholder line"></div>
              <div className="text-placeholder line"></div>
              <div className="text-placeholder line"></div>
              <div className="text-placeholder line"></div>
              <div className="text-placeholder line"></div>
            </div>
          </div>
        )}
        {cardData && !loading && (
          <>
            <h1 className="movie-title">{cardData.Title}</h1>

            <div className="content-container">
              <div className="image-container">
                <img src={cardData.Poster} alt={cardData.Title} />
              </div>

              <div className="details-container">
                {Object.keys(cardData).map((item, index) => {
                  if (movieAtributtes.includes(item)) {
                    return (
                      <p key={index}>
                        <strong>{`${item}: `}</strong>
                        {cardData[item]}
                      </p>
                    );
                  } else {
                    return <></>;
                  }
                })}
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default CardInfo;
